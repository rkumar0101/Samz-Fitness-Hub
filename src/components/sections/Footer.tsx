"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { trackWa, trackPhone, trackEmail } from "@/lib/analytics";
import {
  BRAND,
  BRANCHES,
  NAV_LINKS,
  WHATSAPP_DEFAULT_MESSAGE,
} from "@/lib/constants";
import { waLink } from "@/lib/whatsapp";

export default function Footer() {
  const year = new Date().getFullYear();
  const whatsappHref = waLink(BRAND.phoneE164, WHATSAPP_DEFAULT_MESSAGE);

  return (
    <footer
      aria-label="Site footer"
      className="relative overflow-hidden border-t border-white/10 bg-[#050609] text-white"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 500px at 18% 0%, rgba(255,42,61,0.16), transparent 60%)," +
            "radial-gradient(700px 460px at 82% 0%, rgba(212,168,90,0.1), transparent 60%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 -z-20 premium-grid opacity-30" />

      <Container>
        <div className="pt-20 pb-10 md:pt-28 md:pb-14">
          {/* Big wordmark */}
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <div>
              <div className="flex items-center gap-4">
                <span className="relative inline-flex h-12 w-12 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04]">
                  {/* Footer is always dark — use the dark-bg variant
                      so the logo background blends with the footer. */}
                  <Image
                    src="/samz-fitness-hub-dark.png"
                    alt={`${BRAND.name} logo`}
                    fill
                    className="object-contain"
                    sizes="48px"
                  />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[color:var(--fh-red)]">
                  Best gym in Siliguri · 4 branches
                </span>
              </div>
              <p className="mt-6 h-display text-5xl leading-[0.92] sm:text-6xl md:text-7xl lg:text-[6rem]">
                Samz <span className="text-gradient-gold">Fitness Hub.</span>
              </p>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/65">
                The best gym in Siliguri with 4 neighbourhood branches —
                Laketown, Arabinda Pally, Haiderpara, and Central. Pick your
                nearest, lock a slot, and start. Pricing, timings, and training
                support are kept transparent so consistency feels easy.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWa({ source: "footer" })}
                  className="inline-flex items-center gap-2 rounded-full bg-[color:var(--fh-red)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5"
                >
                  Talk on WhatsApp
                </a>
                <a
                  href="#compare"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 transition hover:bg-white/[0.08]"
                >
                  Compare branches
                </a>
              </div>
            </div>

            {/* Right column: contact card */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md md:p-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
                Reach us
              </p>
              <div className="mt-4 space-y-3 text-sm">
                <a
                  href="tel:+919832589366"
                  onClick={() => trackPhone({ source: "footer" })}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:bg-white/[0.06]"
                >
                  <span className="text-white/55">Phone</span>
                  <span className="font-semibold text-white">+91 9832589366</span>
                </a>
                <a
                  href={`mailto:${BRAND.email}`}
                  onClick={() => trackEmail({ source: "footer" })}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:bg-white/[0.06]"
                >
                  <span className="shrink-0 text-white/55">Email</span>
                  <span className="truncate font-semibold text-white">
                    {BRAND.email}
                  </span>
                </a>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs leading-6 text-white/65">
                  {BRAND.addressLine}
                </div>
              </div>
            </div>
          </div>

          {/* Sitemap grid */}
          <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 md:grid-cols-[1fr_1fr_1.1fr]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
                Explore
              </p>
              <ul className="mt-5 space-y-3">
                {NAV_LINKS.map((l) => (
                  <li key={l.id}>
                    <a
                      href={`#${l.id}`}
                      className="text-sm font-semibold text-white/80 transition hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
                Branches
              </p>
              <ul className="mt-5 space-y-3">
                {BRANCHES.map((b) => (
                  <li key={b.id}>
                    <a
                      href={`#${b.id}`}
                      className="block text-sm transition"
                    >
                      <span className="font-semibold text-white/85 hover:text-white">
                        {b.shortName}
                      </span>
                      <span className="ml-2 text-xs text-white/45">
                        {b.area}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
                Hours
              </p>
              <ul className="mt-5 space-y-2 text-sm text-white/75">
                <li className="flex items-center gap-3">
                  <span className="inline-block h-1 w-1 rounded-full bg-[color:var(--fh-red)]" />
                  Morning: 6:00 AM to 12:00 PM
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-block h-1 w-1 rounded-full bg-[color:var(--fh-red)]" />
                  Evening: 4:00 PM to 10:00 PM
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-block h-1 w-1 rounded-full bg-white/30" />
                  Mon to Sat (Sun closed)
                </li>
                <li className="mt-3 inline-flex items-center gap-2 rounded-full bg-[color:var(--fh-gold)]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--fh-gold-soft)]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--fh-gold)]" />
                  ₹0 joining fee · offer running
                </li>
              </ul>
            </div>
          </div>

          {/* Massive editorial wordmark */}
          <div className="mt-16 border-t border-white/10 pt-10">
            <p
              aria-hidden
              className="font-display text-[18vw] leading-[0.85] tracking-tight text-white/[0.04] sm:text-[14vw] md:text-[10vw]"
            >
              SAMZ · SILIGURI
            </p>
          </div>

          {/* Bottom strip */}
          <div className="mt-6 flex flex-col gap-3 text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {BRAND.name}. All rights reserved.
            </p>
            <p>Built for Siliguri. Updated regularly.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
