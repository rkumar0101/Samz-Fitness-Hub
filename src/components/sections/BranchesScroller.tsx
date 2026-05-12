"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { BRAND, BRANCHES, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";
import { waLink } from "@/lib/whatsapp";

function inr(v: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(v);
}

export default function BranchesScroller() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Horizontal translate: 4 panels => translate by -75% (so the 4th sits in view)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  // Progress bar
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="branches"
      ref={sectionRef}
      aria-label="Samz Fitness Hub branches in Siliguri"
      className="relative bg-[color:var(--fh-bg)] text-white"
      style={{ height: "400vh" }}
    >
      {/* Sticky stage */}
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
        {/* Header strip */}
        <div className="relative z-20 border-b border-white/10 bg-[color:var(--fh-bg)]/85 backdrop-blur-md">
          <Container>
            <div className="flex items-center justify-between gap-6 py-5">
              <div className="flex items-center gap-4">
                <span className="inline-block h-px w-10 bg-[color:var(--fh-red)]" />
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[color:var(--fh-red)]">
                  Branches in Siliguri
                </p>
              </div>
              <div className="flex items-center gap-5">
                <p className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 md:block">
                  Scroll to explore each gym
                </p>
                <div className="relative h-1 w-32 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    style={{ width: progress }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[color:var(--fh-red)] to-[color:var(--fh-gold)]"
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Horizontal track */}
        <div className="relative flex-1 overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex h-full w-[400%] will-change-transform"
          >
            {BRANCHES.map((b, i) => (
              <BranchPanel
                key={b.id}
                branch={b}
                index={i}
                total={BRANCHES.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </motion.div>
        </div>

        {/* Pagination dots */}
        <div className="absolute inset-x-0 bottom-6 z-20 flex items-center justify-center gap-2">
          {BRANCHES.map((b, i) => (
            <PanelDot
              key={b.id}
              index={i}
              total={BRANCHES.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PanelDot({
  index,
  total,
  scrollYProgress,
}: {
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(
    scrollYProgress,
    [start - 0.05, start + 0.02, end - 0.02, end + 0.05],
    [0.35, 1, 1, 0.35]
  );
  const w = useTransform(
    scrollYProgress,
    [start - 0.05, start + 0.02, end - 0.02, end + 0.05],
    [8, 28, 28, 8]
  );

  return (
    <motion.span
      style={{ opacity, width: w }}
      className="h-1.5 rounded-full bg-white"
    />
  );
}

function BranchPanel({
  branch,
  index,
  total,
  scrollYProgress,
}: {
  branch: (typeof BRANCHES)[number];
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const panelStart = index / total;
  const panelEnd = (index + 1) / total;

  // Image parallax + scale within its slot
  const imageX = useTransform(
    scrollYProgress,
    [panelStart, panelEnd],
    ["6%", "-6%"]
  );
  const imageScale = useTransform(
    scrollYProgress,
    [panelStart, panelEnd],
    [1.08, 1]
  );
  const copyX = useTransform(
    scrollYProgress,
    [panelStart - 0.05, panelStart + 0.05, panelEnd - 0.05, panelEnd + 0.05],
    ["-4%", "0%", "0%", "4%"]
  );
  const copyOpacity = useTransform(
    scrollYProgress,
    [panelStart - 0.04, panelStart + 0.05, panelEnd - 0.05, panelEnd + 0.04],
    [0.4, 1, 1, 0.4]
  );

  // Inverse parallax for the side photo
  const sideX = useTransform(imageX, (v) => `calc(${v} * -0.6)`);

  const whatsappHref = waLink(
    BRAND.phoneE164,
    `Hi Samz Fitness Hub, I want details for ${branch.name} (${branch.area}).`
  );

  const mainImg = branch.images[0] ?? "/gym-images/fit-beat-1.jpeg";
  const sideImg = branch.images[1] ?? branch.images[0];

  return (
    <div className="relative h-full w-screen shrink-0">
      <Container className="h-full">
        <div className="grid h-full grid-cols-1 items-center gap-8 py-12 md:grid-cols-[1fr_1.05fr] md:py-16 lg:gap-14">
          {/* LEFT — copy */}
          <motion.div style={{ x: copyX, opacity: copyOpacity }} className="relative">
            <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.28em] text-white/50">
              <span className="font-display text-6xl text-[color:var(--fh-red)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="block h-px flex-1 bg-white/15" />
              <span>{branch.shortName} · Siliguri</span>
            </div>

            <h3 className="mt-5 h-display text-4xl leading-[0.95] text-white sm:text-5xl md:text-6xl">
              {branch.name.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-gradient-gold">
                {branch.name.split(" ").slice(-1)[0]}
              </span>
            </h3>

            <p className="mt-3 text-base font-semibold text-white/85">
              {branch.area}
            </p>
            <p className="mt-1 text-sm text-white/55">{branch.landmark}</p>

            {/* Pricing strip */}
            <div className="mt-7 grid grid-cols-3 gap-2">
              <PriceCell label="Monthly" value={inr(branch.pricing.monthly)} accent />
              <PriceCell label="Yearly" value={inr(branch.pricing.yearly)} />
              <PriceCell label="PT / mo" value={inr(branch.pricing.ptMonthly)} />
            </div>

            {/* Timings */}
            <div className="mt-5 grid gap-2">
              {branch.timings.slice(0, 2).map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-3 text-sm text-white/75"
                >
                  <span className="inline-block h-1 w-1 rounded-full bg-[color:var(--fh-red)]" />
                  {t}
                </div>
              ))}
              <div className="flex items-center gap-3 text-xs text-white/45">
                <span className="inline-block h-1 w-1 rounded-full bg-white/30" />
                {branch.timings[2]} · {branch.timings[3]}
              </div>
            </div>

            {branch.note ? (
              <p className="mt-4 text-xs text-white/45">{branch.note}</p>
            ) : null}

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--fh-red)] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-18px_rgba(255,42,61,0.7)]"
              >
                WhatsApp this branch
                <svg className="h-3.5 w-3.5 transition group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href={branch.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 transition hover:bg-white/[0.08]"
              >
                Get directions
              </a>
            </div>

            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--fh-gold-soft)]">
              ₹0 joining fee · offer running
            </p>
          </motion.div>

          {/* RIGHT — photo composition */}
          <div className="relative h-full max-h-[68vh] min-h-[320px]">
            {/* Main photo */}
            <motion.div
              style={{ x: imageX, scale: imageScale }}
              className="absolute right-0 top-0 h-[78%] w-[88%] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.7)]"
            >
              <Image
                src={mainImg}
                alt={`${branch.name} interior — ${branch.area}, Siliguri`}
                fill
                sizes="(min-width: 768px) 50vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--fh-red)]" />
                Inside the gym
              </div>
            </motion.div>

            {/* Side photo */}
            <motion.div
              style={{ x: sideX }}
              className="absolute bottom-0 left-0 h-[44%] w-[44%] overflow-hidden rounded-[1.5rem] border border-white/12 shadow-[0_28px_70px_-30px_rgba(0,0,0,0.7)]"
            >
              <Image
                src={sideImg}
                alt={`${branch.area} training space`}
                fill
                sizes="(min-width: 768px) 25vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
                <span className="inline-block h-1 w-1 rounded-full bg-[color:var(--fh-gold)]" />
                {branch.area}
              </div>
            </motion.div>

            {/* Big numeric watermark */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-6 -right-2 font-display text-[18vw] leading-none text-white/[0.04] sm:text-[14vw] md:text-[10vw] lg:text-[9rem]"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
}

function PriceCell({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-2xl border p-3 transition",
        accent
          ? "border-[color:var(--fh-red)]/30 bg-[color:var(--fh-red)]/8"
          : "border-white/10 bg-white/[0.03]",
      ].join(" ")}
    >
      <div className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-white/55">
        {label}
      </div>
      <div className="mt-1 font-display text-xl tracking-tight text-white">
        {value}
      </div>
    </div>
  );
}
