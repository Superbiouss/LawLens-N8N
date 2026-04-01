# LAWLENS Full Functionalization Plan

Last updated: 2026-03-24

## Summary

- Goal: turn the current Vite frontend prototype into a production-ready legal AI application with `n8n` as the private workflow engine and Supabase as the app platform.
- Chosen direction: staged full product, built on the current codebase, with India-first legal depth, and no end-user exposure of `n8n` webhooks or secrets.
- Definition of done: every current navigation item is either backed by real persisted data and permissions or intentionally shown as a real empty state; no screen relies on hardcoded legal analysis, fake portfolio metrics, or browser-only mock storage.

## Core Decisions

- Keep the existing Vite + vanilla JavaScript SPA and evolve it instead of rewriting it.
- Replace static document pages with document-aware routes such as:
  - `#/documents/:documentId/summary`
  - `#/documents/:documentId/risk`
  - `#/documents/:documentId/clauses`
  - `#/documents/:documentId/ask`
  - `#/documents/:documentId/annotations`
  - `#/documents/:documentId/key-dates`
  - `#/documents/:documentId/export`
  - plus shared routes like `#/vault`, `#/templates`, `#/team`, `#/analytics`, `#/settings`, and `#/share/:token`
- Use Supabase Auth for identity, Postgres for relational data, Storage for files, Realtime for job and annotation updates, Edge Functions as the secure app API layer, and `pgvector` for retrieval.
- Keep `n8n` behind the app backend. The browser must never call raw `n8n` webhooks and must never store workflow credentials.
- Replace the current user-facing webhook/token settings with normal product settings. `n8n` configuration becomes environment/admin only.
- Treat India as the launch jurisdiction baseline. Add Delaware and England/Wales as follow-on packs.

## Public Interfaces And Data Contracts

- Standardize the app API surface around secure backend endpoints or edge functions for:
  - `createDocumentUpload`
  - `startAnalysis`
  - `getDocumentBundle`
  - `askDocument`
  - `compareVersions`
  - `saveAnnotation`
  - `createExport`
  - `resolveShareLink`
  - `createReminder`
  - `inviteMember`
  - `acceptInvite`
- Introduce stable domain types used across frontend and backend:
  - `WorkspaceRole`
  - `DocumentStatus`
  - `AnalysisJobStatus`
  - `RiskLevel`
  - `ClauseFindingType`
  - `ComplianceStatus`
  - `ConversationMessage` with citations
  - `ShareLinkPermission`
- Persist these entities as first-class records:
  - users and profiles
  - workspaces
  - workspace members
  - documents
  - document versions
  - analysis jobs
  - analysis bundles
  - clauses
  - findings
  - obligations
  - key dates
  - compliance checks
  - document chunks
  - conversations
  - messages
  - annotations
  - tasks
  - exports
  - share links
  - templates
  - glossary terms
  - integrations
  - audit events
- Define one normalized `DocumentAnalysisBundle` JSON contract produced by `n8n` and stored server-side. It must include:
  - document metadata
  - detected jurisdiction
  - parties
  - summary
  - overall risk
  - dimension scores
  - clause list
  - red flags
  - missing clauses
  - obligations
  - key dates
  - compliance results
  - drafting suggestions
  - citation map
  - confidence markers
- Define the `n8n` workflow set explicitly:
  - `document_ingest`
  - `document_analysis`
  - `document_ask`
  - `document_compare`
  - `drafting_suggest`
  - `export_generate`
  - `reminder_dispatch`
  - `integration_sync`

## Implementation Plan

### Phase 1: Foundation And Security

- Add Supabase project structure, environment handling, row-level security policies, audit logging, storage buckets, and authenticated app bootstrap.
- Introduce a frontend API client and async route loaders so pages fetch live data instead of embedding arrays or using `localStorage` for product state.
- Replace the current browser-exposed `n8n` settings flow with server-managed integration health and product defaults.
- Add route parameter support and shared loading, empty, and error states across all document-specific pages.

### Phase 2: Core Document Ingestion And Analysis

- Implement file upload, paste-text, and URL-ingest flows using signed uploads and document source records.
- Create the async analysis job lifecycle with `queued`, `processing`, `completed`, and `failed` states, with user-visible progress and retry support.
- Build the `document_ingest` and `document_analysis` workflows to parse PDF, DOCX, and TXT files, segment clauses, extract entities, score risk, generate plain-English outputs, and persist the normalized analysis bundle.
- Replace mock content on Upload, Summary, Risk Report, Clause Breakdown, and Vault with real document data and real empty states.
- Store every analyzed file as a document version so later compare, audit, and drafting flows work on top of the same source model.

### Phase 3: Retrieval, Conversations, And Compare

- Chunk analyzed documents, generate embeddings, and store retrieval metadata for document-grounded chat.
- Make Ask the Doc answer only from stored document chunks for the selected version, always return clause citations, persist the conversation, and refuse low-confidence or unsupported answers with explicit uncertainty.
- Make Normal Chat a workspace-scoped legal assistant conversation with its own conversation type and retention rules.
- Implement document version comparison as a real diff flow that detects clause-level additions, deletions, changed obligations, and risk regressions, then stores results for repeat viewing.

### Phase 4: Review, Drafting, Export, And Reminders

- Rebuild Annotation Studio on persisted anchors tied to document version plus clause or span reference, with assignee, resolved state, and activity history.
- Make Drafting Assistant use stored templates, suggested fix language, and `drafting_suggest` workflow output rather than browser HTML snapshots.
- Move exports to server-side generation so PDF, DOCX, and TXT outputs are reproducible, logged, and shareable.
- Add revocable share links with expiry and permissions for view-only versus comment-enabled access.
- Build Key Dates around extracted and manually editable dates, with reminder schedules and `n8n` notifications to email, Slack, and Google Calendar.

### Phase 5: Domain Intelligence And Seeded Legal Content

- Make Compliance Checklist real and India-first. The first launch pack covers Indian Contract Act and DPDP-relevant checks using the normalized compliance schema.
- Add follow-on jurisdiction packs for Delaware and England/Wales using the same checklist structure and pipeline.
- Seed Template Library and Legal Glossary from database-backed content rather than hardcoded arrays, while keeping search, category filters, and insert or backlink actions fully functional.
- Ensure all AI-generated findings and glossary references remain traceable to source clauses or curated content.

### Phase 6: Team, Analytics, And Commercial Product Behavior

- Add workspaces, invites, roles, and permissions with the roles `owner`, `admin`, `reviewer`, and `viewer`.
- Make Team Workspace real with members, activity, review tasks, and annotation ownership.
- Rebuild Analytics on live aggregates only. If a workspace lacks enough data, show onboarding or empty states instead of fabricated metrics.
- Add billing hooks, usage metering, export/share audit trails, and portfolio-level dashboards once real document activity exists.

### Phase 7: Hardening And Launch Readiness

- Add workflow retries, idempotency keys, prompt/version tracking, structured logs, correlation IDs, and cost monitoring across Edge Functions and `n8n`.
- Add retention rules, privacy/legal copy, onboarding, and admin operations for failed jobs and manual reprocessing.
- Remove all remaining demo-only legal outputs, fake timeline entries, fake share links, and fake security claims before launch.
- Keep demo data only as explicit development fixtures, never as default production state.

## Test Plan And Acceptance Criteria

- Unit tests must cover route parsing, API client mapping, state reducers, citation rendering, permission checks, and serialization of risk and compliance payloads.
- Integration tests must cover upload-to-analysis completion, document-grounded Q&A with citations, version compare, annotation persistence, export generation, reminder dispatch, and share-link resolution against staging workflows.
- End-to-end tests must cover signup, workspace creation, upload an NDA, wait for analysis completion, navigate all document tabs, ask a cited question, compare a second version, post and resolve an annotation, export a report, create a share link, and invite a teammate.
- Failure-path end-to-end tests must cover unsupported files, oversized uploads, OCR/parsing failure, `n8n` timeout, low-confidence answer refusal, expired share link, revoked access, and unauthorized document lookup.
- Security tests must prove there are no browser-visible `n8n` secrets, all workspace data is protected by row-level security, upload and download URLs are signed and expiring, share permissions are enforced, and document/export access is audit logged.
- Non-functional checks must cover large PDFs, long-running job recovery, concurrent uploads, retrieval latency, and model-cost dashboards.
- Release acceptance is: a signed-in user can complete the full upload-to-analysis-to-collaboration loop with persisted data, and every visible page in the nav is either live or a truthful empty state backed by real permissions.

## Assumptions And Defaults

- This plan intentionally keeps the current frontend stack and evolves it rather than replacing it.
- `n8n` is treated as a private orchestration backend, not a public user integration.
- Supabase is the default app platform for auth, storage, database, realtime, and secure API functions.
- India is the first jurisdiction with deep legal and compliance support; Delaware and England/Wales are the next jurisdiction packs.
- “Fully functional” means the entire current product surface becomes real in phases, not that every feature is forced into the first shippable milestone.
- Where a feature is not yet implemented in a given phase, the product must show real empty, loading, and error states, never fabricated legal analysis or fake operational data.
