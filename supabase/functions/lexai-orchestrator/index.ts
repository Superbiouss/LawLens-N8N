import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const N8N_WEBHOOK_URL = Deno.env.get('N8N_WEBHOOK_URL');
const N8N_AUTH_TOKEN = Deno.env.get('N8N_AUTH_TOKEN');

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { action, payload, metadata } = await req.json();

        // 1. Basic Routing (can be expanded)
        let targetUrl = N8N_WEBHOOK_URL;

        if (action === 'ask') {
            // Example: Use a specific chat workflow
            // targetUrl = Deno.env.get('N8N_CHAT_WEBHOOK_URL');
        }

        if (!targetUrl) {
            throw new Error('N8N_WEBHOOK_URL not configured in Edge Function');
        }

        // 2. Forward to n8n
        const n8nResponse = await fetch(targetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(N8N_AUTH_TOKEN ? { 'Authorization': `Bearer ${N8N_AUTH_TOKEN}` } : {}),
            },
            body: JSON.stringify({
                ...payload,
                metadata: {
                    ...metadata,
                    source: 'lexai-edge-proxy'
                }
            }),
        });

        const data = await n8nResponse.json();

        return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        });
    }
});
