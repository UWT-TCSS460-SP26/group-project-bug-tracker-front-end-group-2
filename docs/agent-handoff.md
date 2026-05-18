# Agent Handoff Context (Sprint 5)

Use this when prompting a coding agent in this repo:

- Read `sprint-5.md` and `openapi.yaml` first.
- Build only a public bug-report form (no auth, no admin dashboard).
- Submit to `POST /v1/issues`.
- Use `NEXT_PUBLIC_API_URL` environment variable.
- Implement clear success, validation-error, and network-failure UI states.
- Keep prompts short; fix through context files and iterative corrections.
