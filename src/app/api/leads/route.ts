import { NextResponse } from "next/server";
import { BRAND } from "@/lib/constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* -----------------------------------------------------------
   Simple per-IP rate limit (in-memory)
   - Survives within a single serverless instance.
   - Cold starts reset the map. Acceptable for v1 (we only need
     to stop brute spam from a single client).
   ----------------------------------------------------------- */
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 60_000; // 1 minute
const RATE_MAX = 5; // 5 submits per IP per minute

function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "anon";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  entry.count++;
  return entry.count <= RATE_MAX;
}

/* -----------------------------------------------------------
   Sanitisation helpers
   ----------------------------------------------------------- */
function sanitize(s: unknown, maxLen = 500): string {
  if (typeof s !== "string") return "";
  return s.trim().slice(0, maxLen);
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

type Lead = {
  name: string;
  phone: string;
  message: string;
  branch: string;
  goal: string;
  source: string;
  consent: boolean;
};

/* -----------------------------------------------------------
   Resend email delivery
   ----------------------------------------------------------- */
async function sendEmail(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.RESEND_FROM_EMAIL ??
    "Samz Fitness Hub <leads@samzfitnesshub.com>";
  const to = process.env.LEAD_NOTIFY_EMAIL || BRAND.email;
  const ccRaw = process.env.LEAD_NOTIFY_CC || "";
  const cc = ccRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (!apiKey || !to) {
    console.warn(
      "[leads] Email skipped — missing RESEND_API_KEY or LEAD_NOTIFY_EMAIL"
    );
    return;
  }

  // Build WhatsApp deep-link to one-tap reply to the lead.
  const cleanPhone = lead.phone.replace(/[^\d]/g, "");
  const waNumber = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;
  const waMessage = `Hi${
    lead.name ? " " + lead.name.split(" ")[0] : ""
  }, this is ${BRAND.name} replying to your enquiry.`;
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    waMessage
  )}`;

  const submittedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const subject = `New ${lead.source || "lead"} — ${
    lead.name || "Unnamed"
  } (${lead.phone || "no phone"})`;

  const row = (label: string, value: string) =>
    value
      ? `<tr>
          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#515967;width:120px;vertical-align:top;">${label}</td>
          <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:15px;color:#0a0c10;line-height:1.55;">${value}</td>
        </tr>`
      : "";

  const html = `<!doctype html>
<html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>New lead</title></head>
<body style="margin:0;padding:0;background:#f4f4f1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f1;">
    <tr><td align="center" style="padding:28px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px -20px rgba(0,0,0,0.15);">
        <tr><td style="background:#07080b;padding:22px 28px;">
          <div style="font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#ff2a3d;">New lead · ${escapeHtml(
            lead.source
          )}</div>
          <div style="margin-top:6px;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.01em;">${escapeHtml(
            BRAND.name
          )}</div>
        </td></tr>

        <tr><td style="padding:28px;">
          <h1 style="margin:0 0 4px;font-size:24px;color:#0a0c10;font-weight:700;letter-spacing:-0.01em;">${escapeHtml(
            lead.name || "Someone"
          )} just enquired</h1>
          <p style="margin:0 0 22px;font-size:13px;color:#515967;">${submittedAt} · IST</p>

          <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;margin-bottom:24px;">
            ${row("Name", escapeHtml(lead.name) || "—")}
            ${row(
              "Phone",
              `<a href="tel:${escapeHtml(
                lead.phone
              )}" style="color:#0a0c10;text-decoration:none;font-weight:700;">${escapeHtml(
                lead.phone
              )}</a>`
            )}
            ${row("Branch / area", escapeHtml(lead.branch))}
            ${row("Goal", escapeHtml(lead.goal))}
            ${row("Message", escapeHtml(lead.message))}
            ${row("Consent", lead.consent ? "Yes" : "Not given")}
          </table>

          <a href="${waLink}" style="display:inline-block;background:#25d366;color:#ffffff;padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:700;font-size:13px;letter-spacing:0.06em;text-transform:uppercase;">
            Reply on WhatsApp →
          </a>

          <p style="margin:18px 0 0;font-size:11px;color:#9aa3b2;">
            Tap the WhatsApp button to message the lead in one tap. Number is also tappable above for a direct call.
          </p>
        </td></tr>

        <tr><td style="background:#0a0c10;padding:14px 28px;text-align:center;font-size:11px;color:#9aa3b2;letter-spacing:0.08em;text-transform:uppercase;">
          samzfitnesshub.com · gyms in siliguri
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const text =
    `New ${lead.source} from ${lead.name || "Unnamed"} (${lead.phone}). ` +
    (lead.branch ? `Branch: ${lead.branch}. ` : "") +
    (lead.goal ? `Goal: ${lead.goal}. ` : "") +
    (lead.message ? `Message: ${lead.message}. ` : "") +
    `Reply on WhatsApp: ${waLink}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      cc: cc.length ? cc : undefined,
      subject,
      html,
      text,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${errBody.slice(0, 300)}`);
  }
}

/* -----------------------------------------------------------
   Google Sheets webhook (Apps Script)
   ----------------------------------------------------------- */
async function appendToSheet(lead: Lead): Promise<void> {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) {
    console.warn("[leads] Sheets skipped — missing SHEETS_WEBHOOK_URL");
    return;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: lead.source,
      name: lead.name,
      phone: lead.phone,
      branch: lead.branch,
      message: lead.message,
      goal: lead.goal,
      consent: lead.consent,
    }),
    // Apps Script may issue a 302 to googleusercontent.com — must follow.
    redirect: "follow",
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    throw new Error(`Sheets ${res.status}: ${errBody.slice(0, 300)}`);
  }
}

/* -----------------------------------------------------------
   POST handler
   ----------------------------------------------------------- */
export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Try again in a minute." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => ({}));

    const lead: Lead = {
      name: sanitize(body.name, 100),
      phone: sanitize(body.phone, 20),
      message: sanitize(body.message, 1000),
      branch: sanitize(body.branch, 100) || sanitize(body.area, 100),
      goal: sanitize(body.goal, 100),
      source: sanitize(body.source, 80) || "website",
      consent: Boolean(body.consent),
    };

    const phoneDigits = lead.phone.replace(/[^\d]/g, "");
    if (phoneDigits.length < 7) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid phone number." },
        { status: 400 }
      );
    }

    // Fire both channels in parallel. allSettled = one failing doesn't
    // block the other or the user response.
    const results = await Promise.allSettled([
      sendEmail(lead),
      appendToSheet(lead),
    ]);

    const failures: string[] = [];
    results.forEach((r, i) => {
      if (r.status === "rejected") {
        const channel = i === 0 ? "email" : "sheet";
        failures.push(channel);
        console.error(`[leads] ${channel} delivery failed:`, r.reason);
      }
    });

    // Always log the lead so Vercel logs are the final fallback.
    console.log("[leads]", JSON.stringify({ ...lead, failures }));

    // If BOTH channels failed, treat as error — user should see something
    // (and try WhatsApp directly).
    if (failures.length === 2) {
      return NextResponse.json(
        {
          ok: false,
          error: "Could not deliver right now. Please WhatsApp us directly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("[leads] handler error:", err);
    const message = err instanceof Error ? err.message : "Lead capture failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
