# Specification

## Summary
**Goal:** Build the SAHAAY MVP: a trust-first, multilingual, chat-first citizen guidance web app that provides informational explanations and process clarity (not professional advice or decisions), backed by curated in-app knowledge.

**Planned changes:**
- Create a primary chat-style UI with message history, input area, and actions to start a new session/clear conversation.
- Add persistent, highly visible disclaimers (informational only; not legal/professional advice; not a substitute for official sources; emergency guidance such as contacting police/112).
- Implement multilingual support (minimum English + Hindi) with a language selector and persisted language preference across refresh.
- Add quick-start tiles for common situations (Job loss, Salary issue, Fraud) and common intents (Understand a law/right, Understand a government process), plus a “Start over” action to return to quick starts.
- Build a simple session model to save and restore multiple conversations with message history, selected language, and flow/topic context.
- Implement backend curated knowledge modules (laws/rights, government processes/schemes, life-situation guided flows) and response generation without external AI/LLM services.
- Add trust & safety UX: “What SAHAAY can/can’t do” panel, safety notes for sensitive situations, and optional per-response source citations (title + URL + optional note).
- Apply a coherent India-first, accessible visual theme (avoid blue/purple as primary) with mobile-first readability across chat, header, buttons, and panels.
- Ship admin-free content bootstrap: include a small built-in dataset (topics, flows, citations) so the app works end-to-end on first deploy.
- Include basic static SAHAAY brand assets (logo mark, wordmark, subtle background pattern) stored under `frontend/public/assets/generated` and referenced in the UI.

**User-visible outcome:** Users can open SAHAAY, choose English or Hindi, start a guided flow or ask questions in a chat interface, see clear safety/disclaimer guidance and “can/can’t do” info, view citations when provided, and return later to saved sessions with their language and conversation history preserved.
