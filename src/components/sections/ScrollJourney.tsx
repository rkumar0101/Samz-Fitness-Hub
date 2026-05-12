"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { BRAND, BRANCHES, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";
import { waLink } from "@/lib/whatsapp";

const JOURNEY = [
  {
    label: "01",
    title: "Find the area you can repeat",
    desc: "Laketown, Haiderpara, Arabinda Pally, or central Siliguri. A nearby gym makes consistency easier after work, college, or market hours.",
    image: "/gym-images/fit-beat-5.jpeg",
    cta: "View branches",
    href: "#branches",
  },
  {
    label: "02",
    title: "Pick a time and keep it fixed",
    desc: "Morning and evening batches help members train without disturbing daily routine. Fixed timing turns gym into habit.",
    image: "/gym-images/fitness-hub-4-3.jpeg",
    cta: "Check timings",
    href: "#schedule",
  },
  {
    label: "03",
    title: "Start with the right plan",
    desc: "Compare monthly, yearly, couple, group, and PT options. Choose what matches your budget and goal before you visit.",
    image: "/gym-images/fitness-hub-2-4.jpeg",
    cta: "See plans",
    href: "#plans",
  },
  {
    label: "04",
    title: "Ask on WhatsApp before visiting",
    desc: "Confirm offer, trainer availability, and branch timing in one message. No confusion when you reach the gym.",
    image: BRANCHES[0].images[0],
    cta: "WhatsApp now",
    href: waLink(BRAND.phoneE164, WHATSAPP_DEFAULT_MESSAGE),
    external: true,
  },
];

export default function ScrollJourney() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [54, -54]);

  return (
    <section ref={ref} className="premium-grid relative bg-white py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--fh-red)]">
              Member journey
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
              From nearby branch to first workout
            </h2>
            <p className="mt-4 text-sm leading-6 text-black/65">
              The website now guides visitors the way a real Siliguri member
              thinks: distance, timing, price, and finally a quick WhatsApp
              confirmation.
            </p>
            <div className="mt-6 rounded-3xl bg-black p-5 text-white">
              <p className="text-sm font-extrabold">Built for enquiries</p>
              <p className="mt-1 text-sm text-white/65">
                Each step leads naturally to branches, schedule, plans, AI
                planner, or WhatsApp.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {JOURNEY.map((item, index) => (
              <motion.article
                key={item.label}
                style={{ y: index % 2 === 0 ? y : undefined }}
                className="group overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-xl shadow-black/5 lg:sticky lg:top-24"
              >
                <div className="grid md:grid-cols-[280px_1fr]">
                  <div className="relative min-h-60 bg-black">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(min-width: 768px) 280px, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/72 to-transparent" />
                    <span className="absolute bottom-4 left-4 rounded-2xl bg-red-600 px-4 py-3 text-lg font-extrabold text-white">
                      {item.label}
                    </span>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl font-extrabold text-black">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-black/65">
                      {item.desc}
                    </p>
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="mt-5 inline-flex rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black/85"
                    >
                      {item.cta}
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
