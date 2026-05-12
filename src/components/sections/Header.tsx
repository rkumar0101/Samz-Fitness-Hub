"use client";

import { Container } from "@/components/ui/Container";
import { BRAND, NAV_LINKS, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";
import { waLink } from "@/lib/whatsapp";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappHref = waLink(BRAND.phoneE164, WHATSAPP_DEFAULT_MESSAGE);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/[0.08] bg-[color:var(--fh-bg)]/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <Container>
        <div className="flex h-16 items-center justify-between md:h-20">
          <a
            href="#top"
            className="flex items-center gap-3"
            data-cursor-label="Home"
          >
            <span className="relative inline-flex h-10 w-10 overflow-hidden rounded-xl border border-white/15 bg-white/[0.04]">
              <Image
                src="/samz-fitness-hub.jpeg"
                alt={`${BRAND.name} logo`}
                fill
                className="object-contain"
                sizes="40px"
                priority
              />
            </span>
            <span className="font-display text-base uppercase tracking-wide text-white">
              {BRAND.name}
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="group relative text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65 transition hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[color:var(--fh-red)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="WhatsApp"
              className="hidden items-center gap-2 rounded-full bg-[color:var(--fh-red)] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:translate-y-[-1px] hover:shadow-[0_12px_40px_-12px_rgba(255,42,61,0.7)] sm:inline-flex"
            >
              WhatsApp
            </a>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={[
                    "absolute left-0 right-0 h-px bg-current transition-all",
                    open ? "top-1.5 rotate-45" : "top-0",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 right-0 h-px bg-current transition-all",
                    open ? "top-1.5 -rotate-45" : "top-3",
                  ].join(" ")}
                />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden"
            >
              <div className="pb-4">
                <div className="mt-2 grid gap-1 rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl">
                  {NAV_LINKS.map((l) => (
                    <a
                      key={l.id}
                      href={`#${l.id}`}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/80 transition hover:bg-white/[0.05] hover:text-white"
                    >
                      {l.label}
                    </a>
                  ))}
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 rounded-xl bg-[color:var(--fh-red)] px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Container>
      <ScrollProgress />
    </header>
  );
}
