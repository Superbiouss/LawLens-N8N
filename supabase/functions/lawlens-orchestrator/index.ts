import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabaseServer = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

Deno.serve(async (req) => {
  const { action, payload, metadata } = await req.json();
  const authHeader = req.headers.get('Authorization')!;
  const userClient = createClient(SUPABASE_URL, Deno.env.get('SUPABASE_ANON_KEY')!, {
    global: { headers: { Authorization: authHeader } }
  });

  console.log(`Orchestrator Action: ${action} by ${metadata.userId}`);

  try {
    switch (action) {
      case 'upload':
        // Mock processing for Turn 18 demonstration
        return new Response(JSON.stringify({ 
          success: true, 
          documentId: payload.documentId,
          status: 'indexing' 
        }), { headers: { 'Content-Type': 'application/json' } });

      case 'ask':
        // Vector search + n8n webhook routing would happen here
        return new Response(JSON.stringify({
          success: true,
          answer: `I've analyzed your question: "${payload.question}". This is a secure response from the orchestrator.`
        }), { headers: { 'Content-Type': 'application/json' } });

      case 'export':
        return new Response(JSON.stringify({
          success: true,
          downloadUrl: `https://lawlens.app/mock-export/${payload.documentId}.${payload.format}`
        }), { headers: { 'Content-Type': 'application/json' } });

      default:
        return new Response(JSON.stringify({ error: 'Unknown action' }), { status: 400 });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
});
