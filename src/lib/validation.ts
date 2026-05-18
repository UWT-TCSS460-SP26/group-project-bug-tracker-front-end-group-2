import type { FieldErrors, FormValues } from "./types";

export const FIELD_LIMITS = {
  title: 120,
  description: 4000,
  reproductionSteps: 4000,
  reporterContact: 200,
} as const;

export function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};

  const title = values.title.trim();
  if (!title) {
    errors.title = "Title is required.";
  } else if (title.length > FIELD_LIMITS.title) {
    errors.title = `Title must be ${FIELD_LIMITS.title} characters or fewer.`;
  }

  const description = values.description.trim();
  if (!description) {
    errors.description = "Description is required.";
  } else if (description.length > FIELD_LIMITS.description) {
    errors.description = `Description must be ${FIELD_LIMITS.description} characters or fewer.`;
  }

  if (values.reproductionSteps.length > FIELD_LIMITS.reproductionSteps) {
    errors.reproductionSteps = `Reproduction steps must be ${FIELD_LIMITS.reproductionSteps} characters or fewer.`;
  }

  if (values.reporterContact.length > FIELD_LIMITS.reporterContact) {
    errors.reporterContact = `Reporter contact must be ${FIELD_LIMITS.reporterContact} characters or fewer.`;
  }

  return errors;
}

export function hasFieldErrors(errors: FieldErrors): boolean {
  return Object.values(errors).some((value) => Boolean(value));
}
