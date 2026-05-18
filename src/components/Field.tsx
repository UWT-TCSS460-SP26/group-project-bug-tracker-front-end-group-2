"use client";

import {
  ChangeEvent,
  forwardRef,
  ReactNode,
  TextareaHTMLAttributes,
  InputHTMLAttributes,
} from "react";

type CommonProps = {
  id: string;
  name: string;
  label: string;
  index?: string;
  required?: boolean;
  hint?: ReactNode;
  error?: string;
  value: string;
  limit?: number;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

type InputFieldProps = CommonProps & {
  as?: "input";
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
};

type TextareaFieldProps = CommonProps & {
  as: "textarea";
  rows?: TextareaHTMLAttributes<HTMLTextAreaElement>["rows"];
};

type FieldProps = InputFieldProps | TextareaFieldProps;

export const Field = forwardRef<HTMLInputElement | HTMLTextAreaElement, FieldProps>(
  function Field(props, ref) {
    const { id, name, label, index, required, hint, error, value, limit, onChange } = props;

    const errorId = error ? `${id}-error` : undefined;
    const hintId = hint ? `${id}-hint` : undefined;
    const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;
    const showCounter = typeof limit === "number";
    const overLimit = showCounter && value.length > limit;

    const labelNode = (
      <label htmlFor={id} className="field-label">
        {index && (
          <span aria-hidden="true" className="field-index">
            {index}
          </span>
        )}
        <span>{label}</span>
        {required && (
          <span aria-hidden="true" className="field-required">
            *
          </span>
        )}
        {!required && <span className="field-optional">(optional)</span>}
      </label>
    );

    const counterNode = showCounter ? (
      <span
        className={`field-counter ${overLimit ? "over" : ""}`}
        aria-live="polite"
      >
        {value.length} / {limit}
      </span>
    ) : null;

    const hintNode = hint ? (
      <p id={hintId} className="field-hint">
        {hint}
      </p>
    ) : null;

    const errorNode = error ? (
      <p id={errorId} className="field-error" role="alert">
        {error}
      </p>
    ) : null;

    if (props.as === "textarea") {
      return (
        <div className="field">
          <div className="field-header">
            {labelNode}
            {counterNode}
          </div>
          <textarea
            id={id}
            name={name}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            value={value}
            onChange={onChange}
            rows={props.rows ?? 4}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            aria-required={required}
          />
          {hintNode}
          {errorNode}
        </div>
      );
    }

    return (
      <div className="field">
        <div className="field-header">
          {labelNode}
          {counterNode}
        </div>
        <input
          id={id}
          name={name}
          type={props.type ?? "text"}
          ref={ref as React.Ref<HTMLInputElement>}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          aria-required={required}
        />
        {hintNode}
        {errorNode}
      </div>
    );
  },
);
