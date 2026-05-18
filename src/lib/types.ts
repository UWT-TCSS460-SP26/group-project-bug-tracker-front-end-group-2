export type FormValues = {
  title: string;
  description: string;
  reproductionSteps: string;
  reporterContact: string;
};

export type FieldErrors = Partial<Record<keyof FormValues, string>>;

export type SubmitSuccess = {
  kind: "success";
  issueId: number | null;
  issueStatus: string;
};

export type SubmitFailure = {
  kind: "error";
  message: string;
  fieldErrors: FieldErrors;
};

export type SubmitResult = SubmitSuccess | SubmitFailure;

export type BannerState =
  | { kind: "idle" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export const EMPTY_VALUES: FormValues = {
  title: "",
  description: "",
  reproductionSteps: "",
  reporterContact: "",
};
