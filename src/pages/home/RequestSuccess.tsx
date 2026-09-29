import { CheckCircle2, Copy, ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";

export function RequestSuccess() {
  const [searchParams] = useSearchParams();
  const trackingCode = searchParams.get("code");

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!trackingCode) return;

    await navigator.clipboard.writeText(trackingCode);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  if (!trackingCode) {
    return (
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center px-4 mt-20">
        <div className="text-center">
          <h1 className="text-lg font-semibold text-text">
            شناسه پیگیری پیدا نشد
          </h1>

          <Link
            to="/my-request"
            className="mt-4 inline-flex items-center gap-2 text-sm text-primary"
          >
            پیگیری درخواست
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center px-4 py-20">
      <div className="w-full rounded-2xl border border-border bg-surface p-6 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-7 w-7" />
        </div>

        <h1 className="mt-5 text-xl font-bold text-text">درخواست شما ثبت شد</h1>

        <p className="mt-2 text-sm leading-6 text-text-2">
          درخواست شما با موفقیت ثبت شد. این شناسه را برای پیگیری درخواست خود نگه
          دارید.
        </p>

        <div className="mt-6 rounded-xl border border-border bg-bg p-4">
          <span className="text-xs text-text-2">شناسه پیگیری</span>

          <div className="mt-2 flex items-center justify-center gap-3">
            <span className="font-mono text-lg font-bold tracking-wider text-text">
              {trackingCode}
            </span>

            <button
              type="button"
              onClick={handleCopy}
              className="rounded-lg p-2 text-text-2 transition-colors hover:bg-surface hover:text-primary"
              aria-label="کپی شناسه پیگیری"
            >
              {copied ? (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </button>
          </div>

          {copied && (
            <p className="mt-2 text-xs text-primary">شناسه پیگیری کپی شد</p>
          )}
        </div>

        <Link
          to={`/track?code=${encodeURIComponent(trackingCode)}`}
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-surface transition-colors hover:bg-primary-dark"
        >
          پیگیری درخواست
        </Link>
      </div>
    </div>
  );
}
