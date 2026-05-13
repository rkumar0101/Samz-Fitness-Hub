"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { BRAND, BRANCHES, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";
import { waLink } from "@/lib/whatsapp";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { trackWa } from "@/lib/analytics";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

const HERO_AREAS = [
  { name: "Laketown", id: "fit-beat", img: "/gym-images/fit-beat-1.jpeg" },
  { name: "Arabinda Pally", id: "fitness-hub-2", img: "/gym-images/fitness-hub-2-1.jpeg" },
  { name: "Haiderpara", id: "fitness-hub-4", img: "/gym-images/fitness-hub-4-1.jpeg" },
  { name: "Central Siliguri", id: "fitness-hub-3", img: "/gym-images/fitness-hub-4-2.jpeg" },
];

const STAT_CHIPS = [
  { value: "04", label: "Branches" },
  { value: "12", label: "Hours daily" },
  { value: "06", label: "Days a week" },
  { value: "₹800", label: "Plans from" },
];

export default function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const whatsappHref = waLink(BRAND.phoneE164, WHATSAPP_DEFAULT_MESSAGE);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scroll-driven transforms only on desktop. On mobile we keep things static
  // to avoid the layout/perf cost of recomputing transforms on every scroll frame.
  const enableScrollAnim = isDesktop && !reduce;
  const photoY = useTransform(scrollYProgress, [0, 1], [0, enableScrollAnim ? -120 : 0]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, enableScrollAnim ? 1.05 : 1]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, enableScrollAnim ? 80 : 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate overflow-hidden bg-[color:var(--fh-bg)] text-white"
      aria-label="Samz Fitness Hub — gyms in Siliguri"
    >
      {/* Theme-aware ambient backdrop + grid */}
      <div aria-hidden className="fh-backdrop-hero absolute inset-0 -z-30" />
      <div aria-hidden className="absolute inset-0 -z-20 premium-grid opacity-50" />

      <Container>
        <div className="relative grid min-h-[100svh] grid-cols-1 items-center gap-10 pt-20 pb-14 sm:pt-24 md:pt-32 md:pb-20 lg:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT — Editorial copy */}
          <motion.div style={{ y: titleY }} className="relative">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/60"
            >
              <span className="block h-px w-10 bg-[color:var(--fh-red)]" />
              <span>{BRAND.name}</span>
              <span className="text-white/30">·</span>
              <span>{BRAND.cityLine}</span>
            </motion.div>

            {/* Semantic H1 (screen readers + SEO) */}
            <h1 className="sr-only">
              Best gym in Siliguri — Samz Fitness Hub. 4 neighbourhood
              locations across Laketown, Arabinda Pally, Haiderpara, and
              Central Siliguri with transparent monthly and yearly memberships.
            </h1>

            {/* Visual H1 — editorial stack */}
            <div aria-hidden className="mt-7 select-none">
              {[
                { text: "Gyms in", style: "" },
                { text: "Siliguri", style: "text-gradient-gold" },
                { text: "4 Locations", style: "text-stroke" },
                { text: "One Promise.", style: "" },
              ].map((line, i) => (
                <div key={line.text} className="overflow-hidden">
                  <motion.span
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.95,
                      delay: 0.25 + i * 0.09,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={[
                      "block h-display text-[14vw] leading-[0.92] sm:text-[11vw] md:text-[7.2vw] lg:text-[5.6rem] xl:text-[6.8rem]",
                      line.style,
                    ].join(" ")}
                  >
                    {line.text}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Area chips strip — every branch shown for SEO */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-6 flex flex-wrap items-center gap-2"
            >
              {HERO_AREAS.map((a) => (
                <a
                  key={a.id}
                  href={`#${a.id}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/75 transition hover:border-[color:var(--fh-red)]/60 hover:bg-[color:var(--fh-red)]/10 hover:text-white"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--fh-red)] transition group-hover:scale-125" />
                  {a.name}
                </a>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-6 max-w-xl text-base leading-7 text-white/72 md:text-[17px]"
            >
              Looking for the best gym in Siliguri?{" "}
              <strong className="font-semibold text-white">
                Samz Fitness Hub
              </strong>{" "}
              runs 4 branches across Laketown, Arabinda Pally, Haiderpara, and
              central Siliguri — with morning and evening batches, personal
              training support, and transparent membership pricing.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWa({ source: "hero" })}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[color:var(--fh-red)] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:-translate-y-[2px] hover:shadow-[0_18px_50px_-18px_rgba(255,42,61,0.7)]"
              >
                <span className="relative z-10">Talk on WhatsApp</span>
                <svg className="relative z-10 h-4 w-4 transition group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </a>

              <a
                href="#plans"
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md transition hover:bg-white/[0.08]"
              >
                View memberships
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.05 }}
              className="mt-4 text-xs font-medium text-white/55"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--fh-gold)]/15 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[color:var(--fh-gold-soft)]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--fh-gold)]" />
                Offer running
              </span>
              <span className="ml-3">₹0 joining fee · Call +91 9832 589 366</span>
            </motion.p>
          </motion.div>

          {/* RIGHT — Editorial photo composition */}
          <motion.div
            style={{ y: photoY, scale: photoScale }}
            className="relative mx-auto h-[460px] w-full max-w-[560px] sm:h-[520px] lg:h-[620px]"
          >
            {/* Main photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-[6%] top-[8%] h-[78%] w-[72%] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_120px_-40px_rgba(255,42,61,0.4)]"
            >
              <Image
                src="/gym-images/fit-beat-1.jpeg"
                alt="Samz Fitness Hub gym floor in Laketown, Siliguri"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--fh-red)]" />
                FIT-BEAT · Laketown
              </div>
            </motion.div>

            {/* Floating accent card 1 */}
            <motion.a
              href="#fitness-hub-4"
              initial={{ opacity: 0, x: 30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group absolute right-[2%] top-[2%] h-[38%] w-[44%] overflow-hidden rounded-[1.5rem] border border-white/12 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] transition hover:-translate-y-1"
            >
              <Image
                src="/gym-images/fitness-hub-4-3.jpeg"
                alt="Samz Fitness Hub branch in Haiderpara, Siliguri"
                fill
                sizes="(min-width: 1024px) 22vw, 45vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
                <span className="inline-block h-1 w-1 rounded-full bg-[color:var(--fh-gold)]" />
                Hub 4.0 · Haiderpara
              </div>
            </motion.a>

            {/* Floating accent card 2 */}
            <motion.a
              href="#fitness-hub-2"
              initial={{ opacity: 0, x: -30, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="group absolute bottom-[2%] left-0 h-[34%] w-[46%] overflow-hidden rounded-[1.5rem] border border-white/12 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] transition hover:-translate-y-1"
            >
              <Image
                src="/gym-images/fitness-hub-2-3.jpeg"
                alt="Samz Fitness Hub branch in Arabinda Pally, Siliguri"
                fill
                sizes="(min-width: 1024px) 22vw, 45vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
                <span className="inline-block h-1 w-1 rounded-full bg-[color:var(--fh-red)]" />
                Hub 2.0 · Arabinda Pally
              </div>
            </motion.a>

            {/* Ambient corner badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-[4%] bottom-[10%] flex h-24 w-24 items-center justify-center rounded-full border border-[color:var(--fh-gold)]/40 bg-[color:var(--fh-bg)]/80 backdrop-blur-md"
            >
              <div className="text-center leading-tight">
                <div className="font-display text-2xl text-[color:var(--fh-gold-soft)]">04</div>
                <div className="text-[8.5px] font-bold uppercase tracking-[0.18em] text-white/70">
                  Branches
                </div>
              </div>
            </motion.div>

            {/* Decorative red arc */}
            <motion.span
              aria-hidden
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.55 }}
              transition={{ duration: 1.6, delay: 0.5 }}
              className="absolute -left-6 -top-6 h-32 w-32"
            >
              <svg viewBox="0 0 100 100" fill="none" className="h-full w-full">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="46"
                  stroke="url(#g)"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.6, delay: 0.6 }}
                  strokeDasharray="4 4"
                />
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ff2a3d" />
                    <stop offset="100%" stopColor="#d4a85a" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.span>
          </motion.div>
        </div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="-mt-2 grid grid-cols-2 gap-3 pb-12 sm:grid-cols-4"
        >
          {STAT_CHIPS.map((s, i) => (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md transition hover:border-white/20 hover:bg-white/[0.06] sm:p-5"
            >
              <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-[color:var(--fh-red)]/10 blur-2xl transition group-hover:bg-[color:var(--fh-red)]/20" />
              <div className="font-display text-3xl tracking-tight text-white sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">
                {s.label}
              </div>
              {i === 1 ? (
                <div className="mt-2 text-[10px] text-white/40">6AM to 12PM · 4PM to 10PM</div>
              ) : null}
              {i === 2 ? (
                <div className="mt-2 text-[10px] text-white/40">Mon to Sat · Sun closed</div>
              ) : null}
              {i === 3 ? (
                <div className="mt-2 text-[10px] text-white/40">Monthly · all branches</div>
              ) : null}
              {i === 0 ? (
                <div className="mt-2 text-[10px] text-white/40">Siliguri network</div>
              ) : null}
            </div>
          ))}
        </motion.div>
      </Container>

      {/* Branch marquee */}
      <div className="relative border-y border-white/10 bg-black/30 py-4">
        <div className="marquee" style={{ ["--marquee-duration" as string]: "38s" }}>
          {Array.from({ length: 2 }).map((_, repeat) => (
            <div key={repeat} className="flex shrink-0 items-center gap-12 px-6" aria-hidden={repeat === 1}>
              {BRANCHES.map((b) => (
                <span
                  key={`${repeat}-${b.id}`}
                  className="flex items-center gap-4 whitespace-nowrap font-display text-3xl tracking-tight text-white/80"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--fh-red)]" />
                  {b.shortName.toUpperCase()} · {b.area}
                </span>
              ))}
              <span className="flex items-center gap-4 whitespace-nowrap font-display text-3xl tracking-tight text-[color:var(--fh-gold)]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--fh-gold)]" />
                Siliguri&apos;s Gym Network
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
