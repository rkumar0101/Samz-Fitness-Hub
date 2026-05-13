"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { BRAND, BRANCHES } from "@/lib/constants";
import { waLink } from "@/lib/whatsapp";
import { trackWa, trackMaps } from "@/lib/analytics";

function inr(v: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(v);
}

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

export default function BranchesScroller() {
  const isDesktop = useIsDesktop();

  return isDesktop ? <DesktopHorizontalScroller /> : <MobileVerticalStack />;
}

/* -----------------------------------------------------------
   DESKTOP — pinned horizontal scroller (lg and up)
   ----------------------------------------------------------- */
function DesktopHorizontalScroller() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="branches"
      ref={sectionRef}
      aria-label="Samz Fitness Hub branches in Siliguri"
      className="relative bg-[color:var(--fh-bg)] text-white"
      style={{ height: "400vh" }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
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

        <div className="relative flex-1 overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex h-full w-[400%] will-change-transform"
          >
            {BRANCHES.map((b, i) => (
              <DesktopPanel
                key={b.id}
                branch={b}
                index={i}
                total={BRANCHES.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </motion.div>
        </div>

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

function DesktopPanel({
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
        <div className="grid h-full grid-cols-[1fr_1.05fr] items-center gap-14 py-16">
          <motion.div style={{ x: copyX, opacity: copyOpacity }} className="relative">
            <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.28em] text-white/50">
              <span className="font-display text-6xl text-[color:var(--fh-red)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="block h-px flex-1 bg-white/15" />
              <span>{branch.shortName} · Siliguri</span>
            </div>

            <h3 className="mt-5 h-display text-5xl leading-[0.95] text-white md:text-6xl">
              {branch.name.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-gradient-gold">
                {branch.name.split(" ").slice(-1)[0]}
              </span>
            </h3>

            <p className="mt-3 text-base font-semibold text-white/85">
              {branch.area}
            </p>
            <p className="mt-1 text-sm text-white/55">{branch.landmark}</p>

            <div className="mt-7 grid grid-cols-3 gap-2">
              <PriceCell label="Monthly" value={inr(branch.pricing.monthly)} accent />
              <PriceCell label="Yearly" value={inr(branch.pricing.yearly)} />
              <PriceCell label="PT / mo" value={inr(branch.pricing.ptMonthly)} />
            </div>

            <div className="mt-5 grid gap-2">
              {branch.timings.slice(0, 2).map((t) => (
                <div key={t} className="flex items-center gap-3 text-sm text-white/75">
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

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWa({ source: "branch_panel", branch: branch.id })}
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
                onClick={() => trackMaps({ source: "branch_panel", branch: branch.id })}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 transition hover:bg-white/[0.08]"
              >
                Get directions
              </a>
            </div>

            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--fh-gold-soft)]">
              ₹0 joining fee · offer running
            </p>
          </motion.div>

          <div className="relative h-full max-h-[68vh] min-h-[320px]">
            <motion.div
              style={{ x: imageX, scale: imageScale }}
              className="fh-photo-overlay absolute right-0 top-0 h-[78%] w-[88%] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.7)]"
            >
              <Image
                src={mainImg}
                alt={`${branch.name} interior in ${branch.area}, Siliguri`}
                fill
                sizes="50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--fh-red)]" />
                Inside the gym
              </div>
            </motion.div>

            <motion.div
              style={{ x: sideX }}
              className="fh-photo-overlay absolute bottom-0 left-0 h-[44%] w-[44%] overflow-hidden rounded-[1.5rem] border border-white/12 shadow-[0_28px_70px_-30px_rgba(0,0,0,0.7)]"
            >
              <Image
                src={sideImg}
                alt={`${branch.area} training space`}
                fill
                sizes="25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
                <span className="inline-block h-1 w-1 rounded-full bg-[color:var(--fh-gold)]" />
                {branch.area}
              </div>
            </motion.div>

            <span
              aria-hidden
              className="pointer-events-none absolute -top-6 -right-2 font-display text-[10vw] leading-none text-white/[0.04] lg:text-[9rem]"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
}

/* -----------------------------------------------------------
   MOBILE — vertical stack (default, < lg)
   ----------------------------------------------------------- */
function MobileVerticalStack() {
  return (
    <section
      id="branches"
      aria-label="Samz Fitness Hub branches in Siliguri"
      className="relative bg-[color:var(--fh-bg)] py-20 text-white"
    >
      <Container>
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[color:var(--fh-red)]">
            <span className="inline-block h-px w-8 bg-[color:var(--fh-red)]" />
            Branches in Siliguri
          </div>
          <h2 className="mt-3 h-display text-4xl leading-[0.95] text-white sm:text-5xl">
            Four neighbourhood gyms.{" "}
            <span className="text-gradient-gold">Pick your nearest one.</span>
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/65">
            Tap any branch to see pricing, timings, and a direct WhatsApp line.
          </p>
        </div>

        <div className="mt-10 grid gap-8">
          {BRANCHES.map((b, i) => (
            <MobilePanel
              key={b.id}
              branch={b}
              index={i}
              total={BRANCHES.length}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function MobilePanel({
  branch,
  index,
}: {
  branch: (typeof BRANCHES)[number];
  index: number;
  total: number;
}) {
  const whatsappHref = waLink(
    BRAND.phoneE164,
    `Hi Samz Fitness Hub, I want details for ${branch.name} (${branch.area}).`
  );

  const mainImg = branch.images[0] ?? "/gym-images/fit-beat-1.jpeg";

  return (
    <motion.article
      id={branch.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03]"
    >
      <div className="fh-photo-overlay relative h-56 sm:h-72">
        <Image
          src={mainImg}
          alt={`${branch.name} interior in ${branch.area}, Siliguri`}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <span
          aria-hidden
          className="absolute right-4 top-4 font-display text-5xl leading-none text-white/15"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
            {branch.shortName} · Siliguri
          </p>
          <p className="mt-1 font-display text-3xl leading-[0.95] text-white">
            {branch.name}
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-sm font-semibold text-white/85">{branch.area}</p>
        <p className="mt-1 text-xs text-white/55">{branch.landmark}</p>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <PriceCell label="Monthly" value={inr(branch.pricing.monthly)} accent />
          <PriceCell label="Yearly" value={inr(branch.pricing.yearly)} />
          <PriceCell label="PT / mo" value={inr(branch.pricing.ptMonthly)} />
        </div>

        <div className="mt-4 grid gap-2">
          {branch.timings.slice(0, 2).map((t) => (
            <div
              key={t}
              className="flex items-center gap-3 text-sm text-white/75"
            >
              <span className="inline-block h-1 w-1 rounded-full bg-[color:var(--fh-red)]" />
              {t}
            </div>
          ))}
          <div className="text-[11px] text-white/45">
            {branch.timings[2]} · {branch.timings[3]}
          </div>
        </div>

        {branch.note ? (
          <p className="mt-3 text-[11px] text-white/45">{branch.note}</p>
        ) : null}

        <div className="mt-5 grid grid-cols-2 gap-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWa({ source: "branch_panel_mobile", branch: branch.id })}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--fh-red)] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white"
          >
            WhatsApp
          </a>
          <a
            href={branch.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackMaps({ source: "branch_panel_mobile", branch: branch.id })}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85"
          >
            Directions
          </a>
        </div>

        <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--fh-gold-soft)]">
          ₹0 joining fee · offer running
        </p>
      </div>
    </motion.article>
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
