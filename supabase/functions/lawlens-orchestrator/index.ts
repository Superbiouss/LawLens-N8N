import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// n8n Webhook Configuration
// NOTE: http://localhost:5678 only works if the function and n8n are in the same environment.
// For Cloud Supabase to reach a local n8n, use a tunnel URL (ngrok).
const N8N_URLS = {
  ask: "https://retiform-nonsensuously-crew.ngrok-free.dev/webhook/89b41797-0382-40a0-a3a4-eb11fcae3782",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { action, payload, metadata } = await req.json();
    const authHeader = req.headers.get('Authorization')!;

    console.log(`Orchestrator Action: ${action} by ${metadata?.userId}`);

    switch (action) {
      case 'ask': {
        const webhookUrl = N8N_URLS.ask;
        console.log(`Forwarding to n8n: ${webhookUrl}`);

        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader,
            'ngrok-skip-browser-warning': 'true' // Bypass ngrok free warning page
          },
          body: JSON.stringify({
            // Redundant field names for n8n node compatibility
            chatInput: payload.question,
            text: payload.question,
            query: payload.question,
            history: payload.history || [],
            metadata: {
              ...metadata,
              documentId: payload.documentId || null
            }
          })
        });

        const rawText = await response.text();
        if (!response.ok) {
          console.error(`n8n error (${response.status}):`, rawText);
          return new Response(JSON.stringify({
            success: true,
            answer: `[Technical Error] n8n responded with ${response.status}: ${rawText.substring(0, 100)}...`
          }), { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          });
        }

        let data;
        try {
          data = JSON.parse(rawText);
        } catch (e) {
          console.error('Invalid JSON from n8n:', rawText);
          return new Response(JSON.stringify({
            success: true,
            answer: `[Technical Error] Orchestrator can't parse n8n JSON. Raw Output: ${rawText.substring(0, 150)}...`
          }), { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          });
        }

        const result = Array.isArray(data) ? data[0] : data;
        
        if (!result) {
          return new Response(JSON.stringify({
            success: true,
            answer: `[Technical Error] n8n returned success but an empty response body.`
          }), { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          });
        }

        const answer = result.output || result.response || result.text || result.msg || "I'm sorry, I couldn't generate a response.";

        return new Response(JSON.stringify({
          success: true,
          answer: answer
        }), { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        });
      }

      default:
        return new Response(JSON.stringify({ error: 'Unknown action' }), { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        });
    }
  } catch (err) {
    console.error('Orchestrator Error:', err);
    return new Response(JSON.stringify({ 
      error: err.message,
      success: false 
    }), { 
      status: 200, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
});
