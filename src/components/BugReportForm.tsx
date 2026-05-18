"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";

import { getIssuesEndpoint, submitIssue } from "@/lib/api";
import type { BannerState, FieldErrors, FormValues } from "@/lib/types";
import { EMPTY_VALUES } from "@/lib/types";
import { FIELD_LIMITS, hasFieldErrors, validate } from "@/lib/validation";

import { Field } from "./Field";
import { StatusBanner } from "./StatusBanner";

type Props = {
  apiBaseUrl: string;
};

type ConfirmationState = {
  issueId: number | null;
  issueStatus: string;
};

export function BugReportForm({ apiBaseUrl }: Props) {
  const endpoint = useMemo(
    () => (apiBaseUrl ? getIssuesEndpoint(apiBaseUrl) : ""),
    [apiBaseUrl],
  );

  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [banner, setBanner] = useState<BannerState>({ kind: "idle" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<ConfirmationState | null>(null);

  const bannerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const reproductionRef = useRef<HTMLTextAreaElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (banner.kind !== "idle") {
      bannerRef.current?.focus();
    }
  }, [banner]);

  function focusFirstError(errors: FieldErrors) {
    if (errors.title) {
      titleRef.current?.focus();
      return;
    }
    if (errors.description) {
      descriptionRef.current?.focus();
      return;
    }
    if (errors.reproductionSteps) {
      reproductionRef.current?.focus();
      return;
    }
    if (errors.reporterContact) {
      contactRef.current?.focus();
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const fieldName = event.target.name as keyof FormValues;
    const nextValue = event.target.value;

    setValues((current) => ({ ...current, [fieldName]: nextValue }));

    setFieldErrors((current) => {
      if (!current[fieldName]) {
        return current;
      }
      const next = { ...current };
      delete next[fieldName];
      return next;
    });

    if (banner.kind !== "idle") {
      setBanner({ kind: "idle" });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const localErrors = validate(values);
    if (hasFieldErrors(localErrors)) {
      setFieldErrors(localErrors);
      setBanner({
        kind: "error",
        message: "Please fix the highlighted fields and try again.",
      });
      focusFirstError(localErrors);
      return;
    }

    if (!endpoint) {
      setBanner({
        kind: "error",
        message:
          "Missing NEXT_PUBLIC_API_URL. Add it to .env.local and restart the dev server.",
      });
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});
    setBanner({ kind: "idle" });

    try {
      const result = await submitIssue(endpoint, values);

      if (result.kind === "success") {
        setConfirmation({
          issueId: result.issueId,
          issueStatus: result.issueStatus,
        });
        setValues(EMPTY_VALUES);
        return;
      }

      if (hasFieldErrors(result.fieldErrors)) {
        setFieldErrors(result.fieldErrors);
        setBanner({
          kind: "error",
          message: "Please fix the highlighted fields and try again.",
        });
        focusFirstError(result.fieldErrors);
      } else {
        setBanner({ kind: "error", message: result.message });
      }
    } catch {
      setBanner({
        kind: "error",
        message:
          "Could not reach the API. Check your connection and retry — your input is saved.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleSubmitAnother() {
    setConfirmation(null);
    setBanner({ kind: "idle" });
    setFieldErrors({});
    queueMicrotask(() => titleRef.current?.focus());
  }

  if (confirmation) {
    return (
      <div className="confirmation" role="status" aria-live="polite">
        <div className="confirmation__icon" aria-hidden="true">
          ✓
        </div>
        <h2>Your report has been filed</h2>
        {confirmation.issueId !== null ? (
          <p className="confirmation__detail">
            Issue <strong>#{confirmation.issueId}</strong> is currently{" "}
            <strong>{confirmation.issueStatus}</strong>. Our team will triage it
            from the queue.
          </p>
        ) : (
          <p className="confirmation__detail">
            Thanks — the API accepted your report. Our team will triage it from
            the queue.
          </p>
        )}
        <button type="button" className="btn btn--primary" onClick={handleSubmitAnother}>
          File another report
        </button>
      </div>
    );
  }

  return (
    <>
      {banner.kind !== "idle" && (
        <StatusBanner ref={bannerRef} kind={banner.kind} message={banner.message} />
      )}

      <form className="form" noValidate onSubmit={handleSubmit}>
        <Field
          id="title"
          name="title"
          label="Title"
          index="01"
          required
          hint="One sentence — what is broken?"
          ref={titleRef}
          value={values.title}
          onChange={handleChange}
          error={fieldErrors.title}
          limit={FIELD_LIMITS.title}
        />

        <Field
          as="textarea"
          id="description"
          name="description"
          label="Description"
          index="02"
          required
          hint="What happened, what did you expect, and where did you see it?"
          ref={descriptionRef}
          rows={5}
          value={values.description}
          onChange={handleChange}
          error={fieldErrors.description}
          limit={FIELD_LIMITS.description}
        />

        <Field
          as="textarea"
          id="reproductionSteps"
          name="reproductionSteps"
          label="Reproduction steps"
          index="03"
          hint="Numbered steps help our team reproduce the bug quickly."
          ref={reproductionRef}
          rows={4}
          value={values.reproductionSteps}
          onChange={handleChange}
          error={fieldErrors.reproductionSteps}
          limit={FIELD_LIMITS.reproductionSteps}
        />

        <Field
          id="reporterContact"
          name="reporterContact"
          label="Reporter contact"
          index="04"
          type="email"
          hint="Email or handle, in case we have a follow-up question."
          ref={contactRef}
          value={values.reporterContact}
          onChange={handleChange}
          error={fieldErrors.reporterContact}
          limit={FIELD_LIMITS.reporterContact}
        />

        <div className="form-actions">
          <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="spinner" aria-hidden="true" />
                <span>Submitting…</span>
              </>
            ) : (
              <span>Submit bug report</span>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
