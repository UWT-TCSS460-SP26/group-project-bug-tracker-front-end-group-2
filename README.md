# Group 2 — Bug Tracker FE (Sprint 5)

Public bug-report form built with Next.js. Visitors submit bug reports against the Group 2 backend — no login required.

**Live app:** https://bug-tracker-g2.vercel.app
**Backend API:** https://group-2-9289.onrender.com
**API docs:** https://group-2-9289.onrender.com/api-docs

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2.6 (App Router) |
| UI | React 19.2.4 |
| Language | TypeScript (strict mode) |
| Styling | Plain CSS (custom design tokens) + IBM Plex Sans/Mono |
| Lint | ESLint with `eslint-config-next` |

---

## Local Setup

### 1. Clone the repo

```bash
git clone <team-ghc-repo-url>
cd sprint5-group-fe
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create your environment file

```bash
cp .env.example .env.local
```

Open `.env.local` and set:

```
NEXT_PUBLIC_API_URL=https://group-2-9289.onrender.com
```

For local backend development, change this to `http://localhost:3000`.

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm start` | Run the production build |
| `npm run lint` | Run ESLint |

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Yes | Base URL of the backend REST API |

The component reads `process.env.NEXT_PUBLIC_API_URL` — no URLs are hardcoded in component code. Never commit `.env.local` or files containing real secrets; use `.env.example` as the template.

---

## Project Structure

```
src/
  app/
    layout.tsx          Fonts + metadata
    page.tsx            Page chrome (server component) — renders the form
    globals.css         All styles
  components/
    BugReportForm.tsx   Form state, submit flow, confirmation card
    Field.tsx           Reusable label + input/textarea + hint + counter + error
    StatusBanner.tsx    Animated success/error banner
  lib/
    types.ts            Form types and the initial-values constant
    validation.ts       Client-side validation + field length limits
    api.ts              Endpoint builder, fetch + response handling
```

---

## How the Form Works

The form calls `POST /v1/issues` on the backend. No authentication is required.

**Request body:**

```json
{
  "title": "string (required)",
  "description": "string (required)",
  "reproductionSteps": "string (optional)",
  "reporterContact": "string (optional)"
}
```

**UI states handled:**

- **Success (201)** — confirmation card with the new issue id + status, and a "file another" action.
- **Validation error (400)** — inline field errors mapped from the API's `error` field, banner above the form, focus moves to the first invalid field.
- **Network/server failure** — friendly retry-safe message, typed content preserved so the user can retry.

See the [API docs](https://group-2-9289.onrender.com/api-docs) for the full backend contract.

---

## Deployment

This app is designed to deploy on **Vercel** or **Render**.

1. Connect this repo to your platform of choice.
2. Set `NEXT_PUBLIC_API_URL` as an environment variable on the platform (point at the deployed backend URL).
3. Deploy. Note the public URL the platform issues.

**CORS reminder:** after the FE is live, add its origin to `CORS_ALLOWED_ORIGINS` in the **backend's** Render environment, then redeploy the backend so cross-origin POSTs succeed. Verify the preflight in browser DevTools.

---

## Sprint 5 Deliverable Docs

- [`workflows/`](workflows/) — each team member's individual AI workflow writeup.
- [`MEETING-MINUTES.md`](MEETING-MINUTES.md) — meeting record including build comparison, pick/merge decision, and feature merge matrix.

### Adding your workflow writeup (team members)

If you're a Group 2 member adding your writeup:

1. Save your writeup as `workflows/<your-name>.md` (lowercase, no spaces).
2. Commit and push — this counts as your contribution to the team repo.

---

## Partner Handoff

After deploy, update the backend partner-facing README with this FE URL, and send the URL to your downstream partner directly so they can file bug reports without asking.
