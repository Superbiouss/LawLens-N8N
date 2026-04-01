# n8n Workflows for LAWLENS

This directory contains (or will contain) the workflow definitions required to make LAWLENS fully functional.

## Required Workflows

### 1. `document_ingest`
**Trigger**: HTTP Webhook (POST) / Supabase Edge Function
**Input**: Signed URL of a file in Supabase Storage.
**Actions**:
- Download file.
- Use OCR/Parser (e.g., AWS Textract or simple PDF parser).
- Chunk text into clauses.
- Store results in Supabase `document_chunks` table.
**Output**: Success status to the orchestrator.

### 2. `document_analysis`
**Trigger**: Called after `document_ingest` completion.
**Actions**:
- Retrieve chunks from Supabase.
- LLM Call (Anthropic/OpenAI): Analyze risk, identify parties, score key dimensions.
- Map to `DocumentAnalysisBundle` JSON.
- Update `documents` record in Supabase.
**Output**: Full analysis bundle.

### 3. `document_ask` (Chat Agent)
**Trigger**: HTTP Webhook (POST).
**Input**: User query, conversation history, and document ID.
**Actions**:
- Vector Search (via Supabase `pgvector` or internal n8n memory).
- LLM Call: Answer query using ONLY the document context.
- Format with citations.
**Output**: Replay JSON.

## Setup Instructions

1. **Import Workflows**: Open n8n and import the `.json` files from this directory.
2. **Setup Credentials**: Configure Anthropic/OpenAI, Supabase, and your chosen OCR service.
3. **Environment Variables**: Set the `N8N_WEBHOOK_URL` in your Supabase Edge Functions or local `.env`.
