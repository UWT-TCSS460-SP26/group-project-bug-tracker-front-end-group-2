# Sprint 5 Final Build Decision

## Chosen Path

- [ ] We selected one member's build as final.
- [x] We merged features from multiple builds (Rudik's base + targeted patches from Collins and Jonathan).

## Evidence Used

- UI clarity and visual polish
- Accuracy to OpenAPI `IssueCreateRequest`
- Error handling quality (per-field mapping, network-fail retry behavior)
- Accessibility (label/error association, focus management, reduced-motion)
- Code organization for Sprint 6+ extensibility (NextAuth + triage UI)
- Ease of deployment
- Partner-facing README quality

## Final Selection

- **Base implementation owner:** Rudik (`sprint5-individual-rudik`)
- **Commit/branch reference:** initial commit into team `sprint5-group-fe` repo (Sprint 5 GitHub Classroom)

## Feature Merge Matrix

| Feature | Source Member | Included? | Notes |
|---|---|---|---|
| Form layout (single page, 4 fields) | Rudik | Yes | Reusable `<Field>` component for input + textarea |
| Validation handling | Rudik | Yes | Dedicated `validation.ts` with `FIELD_LIMITS` + live character counter |
| Network error handling | Rudik | Yes | API throws `NETWORK_FAILURE`; form preserves input and shows retry-safe banner |
| Success confirmation UX | Rudik | Yes | Full-replace card with issue id + status + "File another report" CTA |
| Accessibility touches | Rudik | Yes | `aria-invalid`/`aria-required`/`aria-describedby`, `role="alert"`, banner-focus + first-invalid-field focus, `prefers-reduced-motion` |
| API field-error matcher | Jonathan | Yes (ported) | `normalizeFieldReference` approach — normalize message to alphanumerics before substring-matching field names; more robust than the original substring check |
| Partner-facing README | Collins | Yes (adapted) | Live URLs at the top, tech-stack table, explicit CORS reminder in deployment section |
| `.gitignore` | Collins | Yes | Excludes `.claude/`, `.vercel`, and tracks `.env.example` explicitly (Rudik's `.env*` rule was overly broad) |
| Verified-live `201` test recipe | Collins | Documented | Carry the test approach (`POST /v1/issues` → check for `201` + new id) into the release checklist |
| Distinctive serif aesthetic | Mani | No | Off-brand for an engineering bug-report form |
| Hardcoded `DEFAULT_API_BASE_URL` fallback | Jonathan | No | Violates "no hardcoded URLs in component code" |

## Final Rationale

Rudik's build won on the angles that are expensive to retrofit:

1. **Architecture** — separate `lib/`, `components/`, `types` files mean Sprint 6's NextAuth + triage UI plugs in additively. Collins' 310-line monolithic component would need to be split first.
2. **Accessibility** — banner focus + first-invalid-field focus + reduced-motion is the kind of detail nobody backports later.
3. **Validation depth** — only build with `FIELD_LIMITS` and a live character counter; catches over-long input before the network round-trip.
4. **Visual polish** — IBM Plex typography, draft badge, animated banner-in, footer showing the live `POSTING TO {endpoint}` — most professional of the four without being off-brand.

The patches from Collins and Jonathan are surgical: the README format and `.gitignore` are file-level swaps; the field-error matcher is a 5-line function rewrite in `lib/api.ts`. None disturb Rudik's structure.

Full scoring detail and per-build deep dive are in [`SPRINT5-BUILD-ANALYSIS.md`](../../SPRINT5-BUILD-ANALYSIS.md) in the repo root (one level up from `sprint5-group-fe/`).
