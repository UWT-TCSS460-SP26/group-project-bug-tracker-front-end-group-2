import { BugReportForm } from "@/components/BugReportForm";
import { getIssuesEndpoint } from "@/lib/api";

export default function Page() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim() ?? "";
  const endpointDisplay = apiBaseUrl ? getIssuesEndpoint(apiBaseUrl) : null;

  return (
    <main className="shell">
      <article className="card">
        <header className="card__header">
          <div className="card__eyebrow">
            <span className="card__brand">Group 2 · Bug Tracker</span>
            <span className="card__draft-badge" aria-hidden="true">
              <span className="card__draft-dot" />
              Issue · Draft
            </span>
          </div>
          <h1 className="card__title">File a bug report</h1>
          <p className="card__lead">
            Tell us what broke. No account needed — your report goes straight
            into our triage queue.
          </p>
        </header>

        <div className="card__body">
          <BugReportForm apiBaseUrl={apiBaseUrl} />
        </div>

        <footer className="card__footer">
          {endpointDisplay ? (
            <>
              <span className="card__footer-label">Posting to</span>
              <code className="card__footer-endpoint">{endpointDisplay}</code>
            </>
          ) : (
            <span className="card__footer-warning">
              NEXT_PUBLIC_API_URL is not set — configure it in .env.local.
            </span>
          )}
        </footer>
      </article>

      <p className="shell__note">
        TCSS 460 · Sprint 5 · Next.js against Group 2&rsquo;s OpenAPI spec
      </p>
    </main>
  );
}
