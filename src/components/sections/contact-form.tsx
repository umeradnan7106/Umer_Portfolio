"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

import { site } from "@/data/site";
import { budgets, projectTypes } from "@/data/contact";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

const empty = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
  website: "", // honeypot — hidden from people, filled by bots
};

const inputClass =
  "w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg " +
  "placeholder:text-muted/70 transition-colors " +
  "focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 " +
  "disabled:opacity-60";

export default function ContactForm() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const update =
    (key: keyof typeof empty) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setForm(empty);
      setStatus("sent");
    } catch {
      setError("Could not reach the server. Please check your connection.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-accent/30 bg-accent-soft p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-accent" />
        <h3 className="mt-4 text-lg font-semibold tracking-tight">
          Message sent
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
          Thanks — I&apos;ve got it and will reply within a day. If it&apos;s
          urgent, WhatsApp is the fastest way to reach me.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-accent hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={onSubmit}
      noValidate={false}
      className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
    >
      <h3 className="text-base font-semibold tracking-tight">
        Send me a message
      </h3>
      <p className="mt-1 text-sm text-muted">
        It lands straight in my inbox. I reply within a day.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium">
            Name <span className="text-accent">*</span>
          </label>
          <input
            id="cf-name"
            required
            maxLength={100}
            autoComplete="name"
            value={form.name}
            onChange={update("name")}
            disabled={sending}
            placeholder="Your name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium">
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            value={form.email}
            onChange={update("email")}
            disabled={sending}
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="cf-type" className="mb-1.5 block text-sm font-medium">
            What do you need?
          </label>
          <select
            id="cf-type"
            value={form.projectType}
            onChange={update("projectType")}
            disabled={sending}
            className={cn(inputClass, !form.projectType && "text-muted")}
          >
            <option value="">Choose one</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="cf-budget"
            className="mb-1.5 block text-sm font-medium"
          >
            Budget
          </label>
          <select
            id="cf-budget"
            value={form.budget}
            onChange={update("budget")}
            disabled={sending}
            className={cn(inputClass, !form.budget && "text-muted")}
          >
            <option value="">Choose one</option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="cf-message"
            className="mb-1.5 block text-sm font-medium"
          >
            Message <span className="text-accent">*</span>
          </label>
          <textarea
            id="cf-message"
            required
            rows={5}
            maxLength={5000}
            value={form.message}
            onChange={update("message")}
            disabled={sending}
            placeholder="What are you building, and what's in the way?"
            className={cn(inputClass, "resize-y")}
          />
        </div>

        {/* Honeypot — off-screen and skipped by keyboard and autofill */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="cf-website">Leave this empty</label>
          <input
            id="cf-website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={update("website")}
          />
        </div>
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="mt-5 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/5 p-3.5 text-sm"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <p className="text-fg-soft">
            {error}{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-accent hover:underline"
            >
              Email me instead
            </a>
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-contrast transition-all hover:bg-accent-hover disabled:opacity-60 sm:w-auto"
      >
        {sending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
