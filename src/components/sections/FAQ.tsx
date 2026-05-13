"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { BRAND, BRANCHES, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";
import { waLink } from "@/lib/whatsapp";
import { trackWa } from "@/lib/analytics";

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the best gym in Siliguri?",
    a: "Samz Fitness Hub is among the most accessible gym networks in Siliguri with 4 neighbourhood branches — FIT-BEAT in Laketown, FITNESS HUB 2.0 in Arabinda Pally, FITNESS HUB 3.0 in central Siliguri, and FITNESS HUB 4.0 in Haiderpara. Members get transparent monthly and yearly memberships starting at ₹800, morning and evening batches, personal training support, and a current ₹0 joining fee offer.",
  },
  {
    q: "Which areas of Siliguri does Samz Fitness Hub cover?",
    a: "Four branches across Siliguri. FIT-BEAT in Laketown (Ward 33), FITNESS HUB 2.0 in Arabinda Pally (Ward 23), FITNESS HUB 3.0 in central Siliguri, and FITNESS HUB 4.0 in Haiderpara at Haripal More.",
  },
  {
    q: "What is the cheapest membership plan?",
    a: "Monthly plans start at ₹800 at FITNESS HUB 3.0. Yearly plans start at ₹5000 at FITNESS HUB 3.0. Other branches start at ₹1000 to ₹1500 per month depending on location.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes. Message us on WhatsApp to book a trial slot at the nearest branch. We will also suggest a simple starter routine based on your goal.",
  },
  {
    q: "What are the gym timings?",
    a: "Most branches run 6 AM to 12 PM in the morning and 4 PM to 10 PM in the evening, Monday to Saturday. Sunday is closed. FITNESS HUB 2.0 morning slot runs till 11:30 AM.",
  },
  {
    q: "Is there a joining or admission fee?",
    a: "Joining fee is ₹0 right now under the running offer. Confirm on WhatsApp before you visit since the offer is time limited.",
  },
  {
    q: "Do you provide personal training (PT)?",
    a: "Yes. PT is available at every branch from ₹1500 per month at FITNESS HUB 3.0 and ₹2000 to ₹3000 per month at the other branches. Tell us your goal and slot when you enquire.",
  },
  {
    q: "Are there couple or group memberships?",
    a: "Yes. Couple yearly memberships range from ₹8000 to ₹16000 depending on the branch. Group yearly is ₹8000 per person at branches that offer it, with a minimum of 3 members.",
  },
  {
    q: "I am a beginner. Will someone guide me?",
    a: "Yes. Floor trainers help you with setup, basic form cues, and a simple weekly plan you can follow without confusion. You can also use the AI Plan Builder on this page to get a starter split.",
  },
  {
    q: "What time of day is least crowded?",
    a: "Late morning (around 10 AM to 12 PM) and after 8:30 PM are usually the calmest slots. Peak time is early morning and 6 PM to 8 PM evening.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number>(0);
  const whatsappHref = waLink(BRAND.phoneE164, WHATSAPP_DEFAULT_MESSAGE);

  // FAQPage JSON-LD for AEO / AIO
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section
      id="faq"
      aria-label="Frequently asked questions about Samz Fitness Hub gyms in Siliguri"
      className="relative bg-[color:var(--fh-bg)] py-24 text-white md:py-32"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Container>
        {/* Header */}
        <div className="max-w-5xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[color:var(--fh-red)]">
            FAQ
          </p>
          <h2 className="mt-3 h-display text-5xl leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-[6.5rem]">
            Quick answers about{" "}
            <span className="text-gradient-gold">membership.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/65">
            Pricing, timings, PT, branches, and trial details. If your question
            is not here, WhatsApp is the fastest way to a real answer.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          {/* LEFT — accordion */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02]">
            {FAQS.map((f, i) => {
              const open = i === openIdx;
              return (
                <div
                  key={f.q}
                  className={[
                    "border-b border-white/10",
                    i === FAQS.length - 1 ? "border-b-0" : "",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx((p) => (p === i ? -1 : i))}
                    aria-expanded={open}
                    className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-white/[0.02] md:px-8 md:py-6"
                  >
                    <span className="flex items-center gap-4">
                      <span className="font-display text-2xl text-[color:var(--fh-red)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base font-semibold text-white md:text-lg">
                        {f.q}
                      </span>
                    </span>
                    <span
                      className={[
                        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition",
                        open
                          ? "border-[color:var(--fh-red)]/50 bg-[color:var(--fh-red)]/15 text-[color:var(--fh-red)]"
                          : "border-white/15 bg-white/[0.04] text-white/70 group-hover:border-white/30",
                      ].join(" ")}
                    >
                      <svg
                        className={[
                          "h-4 w-4 transition",
                          open ? "rotate-180" : "",
                        ].join(" ")}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 pl-[80px] text-sm leading-7 text-white/70 md:px-8 md:pb-7 md:pl-[88px] md:text-base">
                          {f.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* RIGHT — helper card */}
          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--fh-red)]">
                Still unsure?
              </p>
              <p className="mt-3 font-display text-3xl leading-tight text-white">
                Tell us your goal. We will pick the branch and slot.
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWa({ source: "faq_helper" })}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[color:var(--fh-red)] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5"
              >
                Ask on WhatsApp
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
                Branch quick links
              </p>
              <div className="mt-4 grid gap-2">
                {BRANCHES.map((b) => (
                  <a
                    key={b.id}
                    href={`#${b.id}`}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/85 transition hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    <span className="font-semibold">{b.shortName}</span>
                    <span className="text-xs text-white/55">{b.area}</span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
