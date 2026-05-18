"use client";

import { forwardRef } from "react";

type Props = {
  kind: "success" | "error";
  message: string;
};

export const StatusBanner = forwardRef<HTMLDivElement, Props>(function StatusBanner(
  { kind, message },
  ref,
) {
  return (
    <div
      ref={ref}
      tabIndex={-1}
      className={`status-banner status-banner--${kind}`}
      role={kind === "error" ? "alert" : "status"}
      aria-live={kind === "error" ? "assertive" : "polite"}
    >
      <span aria-hidden="true" className="status-banner__icon">
        {kind === "success" ? "✓" : "!"}
      </span>
      <span>{message}</span>
    </div>
  );
});
