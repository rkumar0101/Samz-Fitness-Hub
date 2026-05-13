"use client";

import { Container } from "@/components/ui/Container";
import { BRAND, BRANCHES, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";
import { waLink } from "@/lib/whatsapp";
import { trackWa, trackMaps } from "@/lib/analytics";
import { motion } from "framer-motion";
import { useState } from "react";

type Row = {
  key: string;
  label: string;
  format: "money" | "text";
  pricingKey?: keyof (typeof BRANCHES)[number]["pricing"];
  textValue?: (b: (typeof BRANCHES)[number]) => string;
  highlight?: boolean;
  hint?: string;
};

const ROWS: Row[] = [
  { key: "area", label: "Area", format: "text", textValue: (b) => b.area },
  { key: "landmark", label: "Landmark", format: "text", textValue: (b) => b.landmark },
  { key: "monthly", label: "Monthly", format: "money", pricingKey: "monthly", highlight: true },
  { key: "quarterly", label: "Quarterly", format: "money", pricingKey: "quarterly" },
  { key: "halfYearly", label: "Half-yearly", format: "money", pricingKey: "halfYearly" },
  { key: "yearly", label: "Yearly", format: "money", pricingKey: "yearly", highlight: true },
  { key: "coupleYearly", label: "Couple (yearly)", format: "money", pricingKey: "coupleYearly" },
  { key: "groupYearly", label: "Group (yearly, p.p.)", format: "money", pricingKey: "groupYearly", hint: "Per person · minimum 3 members" },
  { key: "ptMonthly", label: "Personal training", format: "money", pricingKey: "ptMonthly" },
  { key: "timings", label: "Daily hours", format: "text", textValue: (b) => `${b.timings[0]} · ${b.timings[1]}` },
  { key: "days", label: "Days open", format: "text", textValue: () => "Mon – Sat (Sun closed)" },
  { key: "admission", label: "Joining fee", format: "text", textValue: () => "₹0 (offer running)" },
];

function inr(v: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(v);
}

export default function CompareBranches() {
  const whatsappHref = waLink(BRAND.phoneE164, WHATSAPP_DEFAULT_MESSAGE);
  const [highlight, setHighlight] = useState<string | null>(null);

  return (
    <section
      id="compare"
      className="relative bg-[color:var(--fh-bg)] py-20 text-white md:py-28"
      aria-label="Compare gym branches in Siliguri"
    >
      {/* Theme-aware ambient glow */}
      <div aria-hidden className="fh-backdrop-soft absolute inset-0 -z-10" />

      <Container>
        {/* Header — big heading, tiny eyebrow, small subtitle */}
        <div className="max-w-5xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[color:var(--fh-red)]">
            Compare branches
          </p>
          <h2 className="mt-3 h-display text-5xl leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-[6.5rem]">
            Pick the gym that fits your{" "}
            <span className="text-gradient-gold">budget and route.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/65">
            Compare the best gyms in Siliguri side by side. Pricing, timings,
            and locations for every Samz Fitness Hub branch — Laketown,
            Arabinda Pally, Haiderpara, and Central — in one view, so you can
            choose the closest one without making a single call.
          </p>
        </div>

        {/* Table — desktop */}
        <div className="mt-10 hidden overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] md:block">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">
              Pricing and timings comparison across Samz Fitness Hub branches in Siliguri.
            </caption>
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th
                  scope="col"
                  className="sticky left-0 z-10 bg-[color:var(--fh-bg)] px-5 py-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white/55"
                >
                  Detail
                </th>
                {BRANCHES.map((b) => (
                  <th
                    key={b.id}
                    scope="col"
                    onMouseEnter={() => setHighlight(b.id)}
                    onMouseLeave={() => setHighlight(null)}
                    className={[
                      "px-5 py-4 align-top transition",
                      highlight === b.id ? "bg-[color:var(--fh-red)]/8" : "",
                    ].join(" ")}
                  >
                    <a
                      href={`#${b.id}`}
                      className="block"
                    >
                      <div className="font-display text-xl uppercase tracking-tight text-white">
                        {b.shortName}
                      </div>
                      <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
                        {b.area}
                      </div>
                      <div className="mt-2 text-xs font-medium text-white/75">
                        {b.name}
                      </div>
                    </a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, idx) => (
                <tr
                  key={row.key}
                  className={[
                    "border-b border-white/[0.06] transition",
                    row.highlight ? "bg-white/[0.025]" : "",
                  ].join(" ")}
                >
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-[color:var(--fh-bg)] px-5 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white/65"
                  >
                    <div>{row.label}</div>
                    {row.hint ? (
                      <div className="mt-1 text-[9px] font-medium normal-case tracking-normal text-white/40">
                        {row.hint}
                      </div>
                    ) : null}
                  </th>
                  {BRANCHES.map((b) => {
                    const value =
                      row.format === "money" && row.pricingKey
                        ? b.pricing[row.pricingKey]
                        : null;
                    const text =
                      row.format === "text" && row.textValue
                        ? row.textValue(b)
                        : null;

                    return (
                      <td
                        key={`${row.key}-${b.id}`}
                        onMouseEnter={() => setHighlight(b.id)}
                        onMouseLeave={() => setHighlight(null)}
                        className={[
                          "px-5 py-4 align-top transition",
                          highlight === b.id ? "bg-[color:var(--fh-red)]/8" : "",
                          idx % 2 === 0 ? "" : "",
                        ].join(" ")}
                      >
                        {value !== null && value !== undefined ? (
                          <span
                            className={[
                              "font-display text-2xl tracking-tight",
                              row.highlight ? "text-white" : "text-white/90",
                            ].join(" ")}
                          >
                            {inr(value)}
                          </span>
                        ) : text ? (
                          <span className="text-sm leading-6 text-white/80">{text}</span>
                        ) : (
                          <span className="text-sm text-white/30">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* CTA row */}
              <tr>
                <th scope="row" className="sticky left-0 z-10 bg-[color:var(--fh-bg)] px-5 py-5 text-xs font-bold uppercase tracking-[0.16em] text-white/65">
                  Enquire
                </th>
                {BRANCHES.map((b) => (
                  <td key={`cta-${b.id}`} className="px-5 py-5">
                    <div className="flex flex-col gap-2">
                      <a
                        href={waLink(
                          BRAND.phoneE164,
                          `Hi Samz Fitness Hub, I want details for ${b.name} (${b.area}).`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWa({ source: "compare_table", branch: b.id })}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--fh-red)] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-14px_rgba(255,42,61,0.7)]"
                      >
                        WhatsApp
                      </a>
                      <a
                        href={b.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackMaps({ source: "compare_table", branch: b.id })}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85 transition hover:bg-white/[0.05]"
                      >
                        Get directions
                      </a>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table — mobile (stacked cards) */}
        <div className="mt-8 grid gap-4 md:hidden">
          {BRANCHES.map((b) => (
            <article
              key={b.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <header className="border-b border-white/10 bg-white/[0.04] px-5 py-4">
                <div className="font-display text-xl uppercase tracking-tight text-white">
                  {b.shortName}
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
                  {b.area} · {b.landmark}
                </div>
              </header>
              <dl className="grid grid-cols-2 gap-x-3 gap-y-3 px-5 py-4 text-sm">
                <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Monthly</dt>
                <dd className="text-right font-display text-xl text-white">{inr(b.pricing.monthly)}</dd>
                <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Yearly</dt>
                <dd className="text-right font-display text-xl text-white">{inr(b.pricing.yearly)}</dd>
                <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Couple yearly</dt>
                <dd className="text-right text-sm text-white/80">{inr(b.pricing.coupleYearly)}</dd>
                <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">PT monthly</dt>
                <dd className="text-right text-sm text-white/80">{inr(b.pricing.ptMonthly)}</dd>
                <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Daily hours</dt>
                <dd className="text-right text-xs text-white/75">
                  {b.timings[0]}<br />{b.timings[1]}
                </dd>
              </dl>
              <footer className="flex gap-2 border-t border-white/10 px-5 py-3">
                <a
                  href={waLink(
                    BRAND.phoneE164,
                    `Hi Samz Fitness Hub, I want details for ${b.name} (${b.area}).`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWa({ source: "compare_card_mobile", branch: b.id })}
                  className="flex-1 rounded-full bg-[color:var(--fh-red)] py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-white"
                >
                  WhatsApp
                </a>
                <a
                  href={b.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackMaps({ source: "compare_card_mobile", branch: b.id })}
                  className="flex-1 rounded-full border border-white/15 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85"
                >
                  Directions
                </a>
              </footer>
            </article>
          ))}
        </div>

        {/* Trust note */}
        <p className="mt-8 text-xs text-white/45">
          Prices and timings are pulled from each branch directly. ₹0 joining fee
          applies during the current offer. Tap any branch to enquire on WhatsApp.
        </p>

        {/* Bottom CTA bar */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div>
            <p className="font-display text-2xl text-white">
              Not sure which branch suits you?
            </p>
            <p className="mt-1 text-sm text-white/65">
              Send your area and preferred time on WhatsApp. We will match the
              closest branch for you.
            </p>
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWa({ source: "compare_bottom_cta" })}
            className="btn-invert inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] transition hover:-translate-y-0.5"
          >
            Ask on WhatsApp
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </Container>
    </section>
  );
}
