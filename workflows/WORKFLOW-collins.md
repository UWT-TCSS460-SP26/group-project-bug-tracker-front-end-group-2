# Sprint 5 Individual Workflow Writeup — Collins

## Prompts I gave to Claude Code

1. *(no-op opener)*
2. `/init` — triggered the CLAUDE.md initialization skill
3. **Read `sprint-5.md` and `openapi.yaml` in this folder and additional context in `claude.md` and backend files. Build fully the Bug Tracker FE described in the sprint doc against the API in the spec.**
4. Don't replace this `claude.md` — use it as context instead. Can you just change the file name and then create a `claude.md` for this specific folder?
5. So what next steps do I need to do?
6. How can I open this project in VS Code?
7. `code .`

## What Claude produced

- Renamed `CLAUDE.md` → `BACKEND_CLAUDE.md` (preserved backend docs as reference).
- Created a new frontend-specific `CLAUDE.md`.
- Scaffolded a full Next.js 15.5.18 + TypeScript + Tailwind CSS app:
  - `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `tailwind.config.ts`, `eslint.config.mjs`, `.gitignore`, `.env.local`, `.env.example`
  - `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
  - `lib/api.ts` — typed client for `POST /v1/issues`
  - `components/BugReportForm.tsx` — form with all three required states (success, 400 validation error with inline field errors, server/network failure with preserved input)
- Ran `npm install` and upgraded Next.js to 15.5.18 (patched security vulnerability).
- Ran `npm run build` — compiled clean with zero errors.
- Verified live API: `POST /v1/issues` returned `201 {"id":15,...}` and `400 {"error":"title is required"}`.
- Started dev server at `http://localhost:3000`.
- Opened the project in VS Code.
