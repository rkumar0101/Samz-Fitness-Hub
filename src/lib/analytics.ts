/**
 * Lightweight analytics helpers.
 *
 * Every helper pushes a typed event onto `window.dataLayer`.
 * Google Tag Manager (loaded in app/layout.tsx via @next/third-parties)
 * picks the event up; in GTM you configure GA4 Event tags listening to
 * these custom events and forward them to GA4 with the named params.
 *
 * Why dataLayer (and not gtag directly):
 * - Works whether you keep GTM, swap to a different tag manager, or
 *   add Meta/LinkedIn/etc. — same event reaches all of them.
 * - Survives ad-blockers gracefully: if dataLayer is missing we
 *   silently no-op, the click still goes through.
 */

type DataLayerEvent = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

function push(event: DataLayerEvent) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
  } catch {
    /* noop */
  }
}

/* -----------------------------------------------------------
   WhatsApp click
   - `source`  identifies WHERE the button lives
                ('hero', 'header', 'footer', 'compare_table',
                 'compare_bottom_cta', 'branch_panel',
                 'branch_contact', 'faq_helper').
   - `branch`  optional — slug of the branch the button is tied to.
   ----------------------------------------------------------- */
export function trackWa(opts: { source: string; branch?: string }) {
  push({
    event: "wa_click",
    wa_source: opts.source,
    wa_branch: opts.branch ?? "",
  });
}

/* Phone / call link click */
export function trackPhone(opts: { source: string }) {
  push({ event: "phone_click", phone_source: opts.source });
}

/* Email mailto click */
export function trackEmail(opts: { source: string }) {
  push({ event: "email_click", email_source: opts.source });
}

/* "Open in Maps" / directions click */
export function trackMaps(opts: { source: string; branch?: string }) {
  push({
    event: "directions_click",
    directions_source: opts.source,
    directions_branch: opts.branch ?? "",
  });
}

/* Call-back form submit attempt */
export function trackFormSubmit(opts: {
  source: string;
  branch?: string;
  status: "submitted" | "validation_error" | "server_error";
}) {
  push({
    event: "lead_form_submit",
    form_source: opts.source,
    form_branch: opts.branch ?? "",
    form_status: opts.status,
  });
}

/* AI Plan Builder */
export function trackPlanGenerated(opts: {
  goal: string;
  daysPerWeek: string;
}) {
  push({
    event: "ai_plan_generated",
    plan_goal: opts.goal,
    plan_days_per_week: opts.daysPerWeek,
  });
}

export function trackPlanDownloaded(opts: { goal: string }) {
  push({ event: "ai_plan_downloaded", plan_goal: opts.goal });
}

/* Branch viewed (when a user lands on the deep link or scrolls to it) */
export function trackBranchView(branchId: string) {
  push({ event: "branch_view", wa_branch: branchId });
}
