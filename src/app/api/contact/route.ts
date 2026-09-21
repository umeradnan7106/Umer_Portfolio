import { NextResponse } from "next/server";

import { site } from "@/data/site";
import { budgets, projectTypes } from "@/data/contact";

/*
 * Contact form -> email, via Resend's REST API (no SDK needed).
 *
 * Environment variables (set in .env.local locally and in Vercel for prod):
 *   RESEND_API_KEY      required
 *   CONTACT_TO_EMAIL    optional, defaults to site.email
 *   CONTACT_FROM_EMAIL  optional, defaults to Resend's shared test sender
 *
 * Without a verified domain, Resend only delivers mail sent from
 * onboarding@resend.dev to the address the Resend account was created with —
 * so the account must be registered with CONTACT_TO_EMAIL.
 */

export const runtime = "nodejs";

const LIMITS = { name: 100, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!
  );

const bad = (error: string, status = 400) =>
  NextResponse.json({ ok: false, error }, { status });

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return bad("Invalid request.");
  }

  const field = (key: string) => String(body[key] ?? "").trim();

  // Honeypot: a field real visitors never see. Bots fill every input, so a
  // value here means spam — report success so the bot has nothing to retry.
  if (field("website")) return NextResponse.json({ ok: true });

  const name = field("name");
  const email = field("email");
  const message = field("message");
  const projectType = field("projectType");
  const budget = field("budget");

  if (!name || !email || !message)
    return bad("Please fill in your name, email and message.");
  if (name.length > LIMITS.name) return bad("That name is too long.");
  if (email.length > LIMITS.email || !EMAIL_RE.test(email))
    return bad("Please enter a valid email address.");
  if (message.length > LIMITS.message)
    return bad(`Please keep the message under ${LIMITS.message} characters.`);
  // Only accept values the form actually offers
  if (projectType && !projectTypes.includes(projectType))
    return bad("Please pick a project type from the list.");
  if (budget && !budgets.includes(budget))
    return bad("Please pick a budget from the list.");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return bad("The form is not set up yet.", 503);
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Project type", projectType || "—"],
    ["Budget", budget || "—"],
  ];

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#0b0d0f;max-width:560px">
      <h2 style="margin:0 0 16px;font-size:18px">New enquiry from your portfolio</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:6px 12px 6px 0;color:#5f666e;white-space:nowrap;vertical-align:top">${label}</td>
            <td style="padding:6px 0">${escapeHtml(value)}</td>
          </tr>`
          )
          .join("")}
      </table>
      <div style="margin-top:20px;padding:16px;background:#f4f5f2;border-radius:8px;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</div>
      <p style="margin-top:20px;font-size:12px;color:#5f666e">Reply to this email to answer ${escapeHtml(name)} directly.</p>
    </div>`;

  const text = [
    "New enquiry from your portfolio",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL ?? site.email],
        // Hitting Reply in the inbox answers the visitor, not the sender
        reply_to: email,
        subject: `New enquiry from ${name}${projectType ? ` — ${projectType}` : ""}`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      console.error("[contact] Resend rejected the email:", res.status, await res.text());
      return bad("Your message could not be sent. Please email me directly.", 502);
    }
  } catch (error) {
    console.error("[contact] Could not reach Resend:", error);
    return bad("Your message could not be sent. Please email me directly.", 502);
  }

  return NextResponse.json({ ok: true });
}
