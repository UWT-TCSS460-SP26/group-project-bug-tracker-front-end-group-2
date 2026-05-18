import type { FieldErrors, FormValues, SubmitResult } from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeBaseUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getIssuesEndpoint(baseUrl: string): string {
  return `${normalizeBaseUrl(baseUrl.trim())}/v1/issues`;
}

function buildPayload(values: FormValues) {
  const payload: Record<string, string> = {
    title: values.title.trim(),
    description: values.description.trim(),
  };

  const reproduction = values.reproductionSteps.trim();
  if (reproduction) {
    payload.reproductionSteps = reproduction;
  }

  const contact = values.reporterContact.trim();
  if (contact) {
    payload.reporterContact = contact;
  }

  return payload;
}

function inferFieldErrorsFromMessage(message: string): FieldErrors {
  const normalized = message.toLowerCase().replace(/[^a-z0-9]/g, "");
  const fieldErrors: FieldErrors = {};

  if (normalized.includes("title")) {
    fieldErrors.title = message;
  }
  if (normalized.includes("description")) {
    fieldErrors.description = message;
  }
  if (normalized.includes("reproductionsteps") || normalized.includes("reproduction")) {
    fieldErrors.reproductionSteps = message;
  }
  if (normalized.includes("reportercontact") || normalized.includes("contact")) {
    fieldErrors.reporterContact = message;
  }

  return fieldErrors;
}

export async function submitIssue(
  endpoint: string,
  values: FormValues,
): Promise<SubmitResult> {
  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload(values)),
    });
  } catch {
    throw new Error("NETWORK_FAILURE");
  }

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (response.ok) {
    const issueId =
      isRecord(body) && typeof body.id === "number" ? body.id : null;
    const issueStatus =
      isRecord(body) && typeof body.status === "string" ? body.status : "open";
    return { kind: "success", issueId, issueStatus };
  }

  const apiMessage =
    isRecord(body) && typeof body.error === "string" && body.error.trim().length > 0
      ? body.error.trim()
      : `Submission failed (status ${response.status}).`;

  const fieldErrors =
    response.status === 400 ? inferFieldErrorsFromMessage(apiMessage) : {};

  return {
    kind: "error",
    message: apiMessage,
    fieldErrors,
  };
}
