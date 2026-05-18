# Sprint 5 Individual Workflow Writeup - Rudik

## 1) First Prompt

- Prompt text:
Read `sprint-5.md` and `openapi.yaml` in this folder.
Create a Next.js app-router frontend with one public page containing a bug-report form.
Form fields must match `IssueCreateRequest` and submit to `POST /v1/issues`.
Use `NEXT_PUBLIC_API_URL` as env var for base URL.

- Why I chose this prompt:
I wanted a short prompt that relies on repo context files instead of a long chat explanation. The goal was to get a working first scaffold aligned to the Sprint 5 requirements and OpenAPI contract.

## 2) First Agent Output

- What the agent generated:
A Next.js App Router scaffold with a single public form page and submit handler for issue creation.

- What was immediately usable:
The basic page structure, controlled form inputs, and API submission flow were usable right away as a first cut.

- What was incorrect or missing:
The first cut needed stronger UX for validation and failure handling, plus better accessibility details and clearer user-facing messages for error states.

## 3) Iteration Prompts

- Prompt 2:
Add field-level validation messages and map API 400 errors into user-friendly text.
Do not clear user input when the request fails.

- Prompt 3:
If fetch fails or server is unavailable, show a retry-safe error message and preserve entered form values.

- Prompt 4:
Ensure labels, `aria-invalid`, and focus management for submit errors.

## 4) Keep / Cut Decisions

- Kept:
The final form field set (`title`, `description`, `reproductionSteps`, `reporterContact`), async submit pattern, and use of `NEXT_PUBLIC_API_URL`.

- Cut:
Generic or unclear default messages that did not clearly separate validation errors from network/server failures.

- Refactored manually:
Tightened local validation, standardized success/error banner behavior, and aligned payload trimming/optional-field handling with `IssueCreateRequest`.

## 5) Final Behavior Check

- Success state works: yes
- Validation error state works: yes
- Network/server error state works: yes
- Uses `NEXT_PUBLIC_API_URL`: yes

## 6) What I Would Do Differently Next Time

- I would run a faster compare loop earlier by capturing screenshots or short clips from each iteration and keeping a small decision log per prompt, so team comparison/pick-or-merge discussion is quicker.
