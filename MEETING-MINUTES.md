# Sprint 5 Meeting Minutes

## Meeting Info

- Date: 2026-05-17
- Attendees: Rudik, Collins, Jonathan, Mani

## Agenda

- Review each member's individual scaffold.
- Compare strengths/weaknesses.
- Decide pick vs merge.
- Assign integration tasks.

## Individual Build Review

### Member: Rudik — `sprint5-individual-rudik`

- Stack: Next.js 16.2.6 + React 19.2.4 + plain CSS + IBM Plex
- Strengths: Cleanest architecture (separate `lib/`, `components/`, `types`), reusable `<Field>` and `<StatusBanner>`, validation layer with `FIELD_LIMITS` and live character counter, best accessibility (banner focus + first-invalid-field focus + `prefers-reduced-motion`), polished visual identity, footer showing live `POSTING TO {endpoint}`.
- Weaknesses: README is dev-facing rather than partner-facing; Next 16.2.6 deployment not yet verified; `.gitignore` overly broad (`.env*`).
- Notable UX behavior: Confirmation card replaces the form on success with issue ID + status + "File another report" CTA.

### Member: Collins — `BugTrackerECollins`

- Stack: Next.js 15.5.18 + React 19 + Tailwind v3
- Strengths: Best partner-facing README (live URLs at top, tech-stack table, CORS reminder); verified real `201` against the live backend (`{"id":15,"status":"open",...}`); clean `.gitignore` (excludes `.claude/`, `.vercel`); discriminated-union API result.
- Weaknesses: One 310-line monolithic `BugReportForm.tsx`, no shared types module, no banner focus, no character counters.
- Notable UX behavior: SVG checkmark success card, indigo/slate Tailwind theme.

### Member: Jonathan — `bug-tracker-front-end`

- Stack: Next.js 15.3.2 + React 19.1.0 + Tailwind v4
- Strengths: Best workflow writeup (specific bugs named, specific lessons), cleanest field-error matcher (`normalizeFieldReference` strips non-alphanumerics), types in dedicated file, most git activity (5 commits), `toLocaleString()` on success timestamp.
- Weaknesses: Hardcoded fallback URL in `lib/issues.ts` (`DEFAULT_API_BASE_URL`), README is one line, no focus management, no `.env.example`.
- Notable UX behavior: SuccessBanner formats `createdAt` to local time.

### Member: Mani — `bug-tracker-front-end-mani`

- Stack: Next.js 15.3.2 + React 19.0.0 + plain CSS + Georgia serif
- Strengths: Distinctive cream/beige + green aesthetic, uses `useId()` for stable label/input pairing, `aria-live="polite" aria-atomic="true"` on feedback region.
- Weaknesses: Everything (types, validation, fetch, UI) inline in `app/page.tsx` (~270 lines); no per-field API error mapping (banner only); client-side email regex blocks valid non-email contacts; no README; no ESLint; `.env.example` points to localhost.
- Notable UX behavior: Bottom-of-form banner for success/error, no per-field validation surfacing.

## Decision

- **Final approach:** Pick + merge.
- **Selected base build:** Rudik (`sprint5-individual-rudik`) — 55/60 on the scorecard, wins on architecture, accessibility, code organization, and visual polish (the angles hardest to retrofit later in Sprint 6+).
- **Features merged in:**
  - Collins → README format (partner-facing top, tech-stack table, CORS reminder) and `.gitignore` (cleaner than Rudik's overly-broad `.env*` rule).
  - Jonathan → `normalizeFieldReference` approach for matching API 400 errors to fields (more robust against casing/spacing variants than substring matching).
- **Cut from the merge:** Mani's distinctive serif aesthetic (off-brand for an engineering bug-report form). Jonathan's hardcoded fallback URL (violates spec).
- **Why this decision:** Rudik's build had the largest lead on the criteria that are expensive to fix after the fact — component architecture (extending into Sprint 6's auth + triage UI), accessibility (focus management is rarely added back later), and validation depth (`FIELD_LIMITS`/character counters). The smaller polish wins from Collins (README) and Jonathan (matcher) port in cleanly without disturbing the base.

### Feature Merge Matrix

| Feature | Source Member | Included? | Notes |
|---|---|---|---|
| Form layout (single page, 4 fields) | Rudik | Yes | Reusable `<Field>` component for input + textarea |
| Validation handling | Rudik | Yes | Dedicated `validation.ts` with `FIELD_LIMITS` + live character counter |
| Network error handling | Rudik | Yes | API throws `NETWORK_FAILURE`; form preserves input and shows retry-safe banner |
| Success confirmation UX | Rudik | Yes | Full-replace card with issue id + status + "File another report" CTA |
| Accessibility touches | Rudik | Yes | `aria-invalid`/`aria-required`/`aria-describedby`, `role="alert"`, banner-focus + first-invalid-field focus, `prefers-reduced-motion` |
| API field-error matcher | Jonathan | Yes (ported) | `normalizeFieldReference` approach in `lib/api.ts` — more robust than substring matching |
| Partner-facing README | Collins | Yes (adapted) | Live URLs at top, tech-stack table, CORS reminder in deployment section |
| `.gitignore` | Collins | Yes | Excludes `.claude/`, `.vercel`, tracks `.env.example` explicitly |
| Distinctive serif aesthetic | Mani | No | Off-brand for an engineering bug-report form |
| Hardcoded `DEFAULT_API_BASE_URL` fallback | Jonathan | No | Violates "no hardcoded URLs in component code" |

## Task Assignments

| Person | Task | Status |
|---|---|---|
| Rudik | Stage merged build into `sprint5-group-fe/`, write README, patch `api.ts` | Done |
| Rudik | Deploy to Vercel — live at https://bug-tracker-g2.vercel.app | Done |
| Collins | Commit `workflows/collins.md` to team repo | Pending |
| Jonathan | Commit `workflows/jonathan.md` to team repo | Pending |
| Mani | Commit `workflows/mani.md` to team repo (expand writeup if time allows) | Pending |
| BE owner | Add `https://bug-tracker-g2.vercel.app` to `CORS_ALLOWED_ORIGINS`, redeploy BE | Pending |
| All | End-to-end smoke test from deployed FE to deployed BE | Pending |
| Rudik | Add deployed FE URL to partner-facing BE README, send to downstream partner | Pending |

## Risks / Blockers

- Next.js 16.2.6 is the course backport — deployment to Vercel/Render not yet verified end-to-end. Mitigation: if it fails, downgrade `package.json` to Collins' verified 15.5.18 (Rudik's code uses no Next-16-specific APIs).
- CORS preflight is the highest-probability footgun if forgotten; release checklist explicitly tracks it.

## Next Check-in

- Async on team channel after deploy succeeds.
