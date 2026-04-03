# LawLens Full Functionalization: Implementation Roadmap

This document outlines the phased implementation plan to transform LawLens from a frontend prototype into a production-ready legal AI application.

## 🛠 Execution Protocol

Every task in this roadmap must adhere to the following standards:

1.  **TDD First**: Use the `test-driven-development` skill. No production code without a failing test first.
2.  **Systematic Debugging**: Use the `systematic-debugging` skill for investigating regressions.
3.  **Verification**: Use `verification-before-completion` before marking a phase as done.
4.  **Security**: No browser-exposed `n8n` webhooks. All AI orchestration must go through Supabase Edge Functions.

---

## 📅 Phase 1: Foundation And Security (Current)

**Goal**: Establish a secure, authenticated platform state.

| Task | Description | Status |
| :--- | :--- | :--- |
| **Supabase Client** | Initialize `supabase-js` client in `frontend/src/lib/supabase.js`. | 🔄 In Progress |
| **Auth Migration** | Replace prototype login/signup logic with real `supabase.auth`. | ⏳ Upcoming |
| **Database Schema** | Implement initial migrations for `profiles`, `workspaces`, and `documents`. | ⏳ Upcoming |
| **RLS Policies** | Define row-level security for multi-tenant isolation. | ⏳ Upcoming |

## 📅 Phase 2: Core Document Ingestion & Analysis

**Goal**: Move from mock analysis to real n8n orchestration.

- [ ] **Storage Buckets**: Set up `legal-documents` bucket in Supabase.
- [ ] **Edge Proxy**: Build `lexai-orchestrator` to safely call n8n webhooks.
- [ ] **Job Lifecycle**: Implement `queued` -> `processing` -> `completed` analysis states.

## 📅 Phase 3: Retrieval & Conversations

**Goal**: Document-grounded Q&A and vector search.

- [ ] **Vector Store**: Implement `pgvector` for document chunking.
- [ ] **Ask the Doc**: answer only from stored document chunks with real citations.

## 📅 Phase 4: Review, Drafting & Export

- [ ] **Annotation Studio**: Rebuild on persisted anchors tied to document versions.
- [ ] **Server-Side Export**: Move PDF/DOCX generation to the backend.

## 📅 Phase 5: Domain Intelligence (India-First)

- [ ] **Compliance Checklist**: Real India-first legal compliance pack.
- [ ] **Template Library**: Database-backed legal glossary and templates.

## 📅 Phase 6: Teams & Commercial Features

- [ ] **Workspaces**: Multi-user collaboration with `owner`, `admin`, `reviewer` roles.
- [ ] **Analytics**: Live aggregates representing real document activity.

## 📅 Phase 7: Hardening & Launch

- [ ] **Idempotency**: Add retry logic and idempotency keys to critical AI path.
- [ ] **Cleanup**: Remove all remaining demo-only placeholders.

---

## ❓ Open Questions for User

1.  **Supabase Credentials**: Do you have a project ready? (URL/Anon Key).
     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnendva2Jpc3JtdmxtYml0YWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MDk0NDgsImV4cCI6MjA5MDA4NTQ0OH0.s8YrdiyvfX7PJ0-lMF_g5iQ3CNrv159IhpOjJFWILvY
2.  **Compliance Ranking**: Should we prioritize Phase 5 (India Compliance) earlier in the build?
    Yes
3.  **Edge Function Logic**: Does the existing `lexai-orchestrator` need deep logic changes or is it just a shell?

---

## 📈 Status Check

- **Project Root**: `/home/aakashyadav/Documents/Superbious/LawLens-N8N`
- **Frontend**: Vite + Vanilla JS
- **Backend**: Supabase + n8n
