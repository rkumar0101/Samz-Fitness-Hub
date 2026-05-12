"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";

type Facility = {
  title: string;
  desc: string;
  why: string;
  accent: "blue" | "red";
  icon: "spark" | "lock" | "cardio" | "strength" | "mobility" | "coach";
  image: string;
  tag?: string;
};

function Icon({ name }: { name: Facility["icon"] }) {
  const cls = "h-5 w-5";
  if (name === "lock")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none">
        <path
          d="M7 11V8a5 5 0 0 1 10 0v3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6 11h12v10H6V11Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (name === "cardio")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none">
        <path
          d="M3 12c2-6 6 0 9 4 3-4 7-10 9-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 12h3l-1 2h2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  if (name === "strength")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none">
        <path
          d="M7 10v4M17 10v4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M9 12h6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M5 9v6M19 9v6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  if (name === "mobility")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3v3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M7 21c2-6 8-6 10 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6 12c3-1 9-1 12 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  if (name === "coach")
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  // spark
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l1.2 4.3L18 7.5l-4.1 2.5L12 14l-1.9-4-4.1-2.5 4.8-1.2L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Facilities() {
  const items: Facility[] = useMemo(
    () => [
      {
        title: "Clean equipment",
        desc: "Well-maintained machines and free weights.",
        why: "Less downtime, safer workouts, better hygiene. You feel like coming back.",
        accent: "blue",
        icon: "spark",
        tag: "Top priority",
        image: "/gym-images/fit-beat-1.jpeg",
      },
      {
        title: "Lockers",
        desc: "Keep your stuff safe while you train.",
        why: "Peace of mind = better focus. No distractions mid-session.",
        accent: "red",
        icon: "lock",
        tag: "Pro",
        image: "/gym-images/fitness-hub-2-2.jpeg",
      },
      {
        title: "Cardio zone",
        desc: "Treadmills, cycles, warm-up space.",
        why: "Good cardio setup makes fat-loss and stamina training easier to follow.",
        accent: "blue",
        icon: "cardio",
        tag: "Popular",
        image: "/gym-images/fitness-hub-4-1.jpeg",
      },
      {
        title: "Strength zone",
        desc: "Racks, benches, dumbbells.",
        why: "Real strength comes from progressive overload. This zone is built for that.",
        accent: "red",
        icon: "strength",
        tag: "Most used",
        image: "/gym-images/fit-beat-4.jpeg",
      },
      {
        title: "Stretch area",
        desc: "Mobility and cool-down space.",
        why: "Fewer injuries, better movement, and quicker recovery.",
        accent: "blue",
        icon: "mobility",
        tag: "Core",
        image: "/gym-images/fitness-hub-4-4.jpeg",
      },
      {
        title: "Guided sessions",
        desc: "Trainer support when you need it.",
        why: "Form correction and routine guidance help members progress with fewer mistakes.",
        accent: "red",
        icon: "coach",
        tag: "Pro",
        image: "/gym-images/fitness-hub-2-5.jpeg",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const a = items[active];

  const chip = {
    blue: "bg-blue-500/10 text-blue-700 border-blue-500/20",
    red: "bg-red-500/10 text-red-700 border-red-500/20",
  } as const;

  const glow = {
    blue: "shadow-[0_0_0_1px_rgba(37,99,235,0.12),0_16px_40px_-20px_rgba(37,99,235,0.45)]",
    red: "shadow-[0_0_0_1px_rgba(220,38,38,0.12),0_16px_40px_-20px_rgba(220,38,38,0.42)]",
  } as const;

  return (
    <section className="bg-white py-16">
      <Container>
        <SectionHeading
          title="Facilities"
          subtitle="Basic gym facilities members expect in a clean training space."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          {/* Left: interactive cards */}
          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((it, idx) => {
                const selected = idx === active;
                return (
                  <motion.button
                    key={it.title}
                    type="button"
                    onClick={() => setActive(idx)}
                    onMouseEnter={() => setActive(idx)}
                    className={[
                      "group text-left rounded-3xl border bg-white p-6 transition",
                      selected
                        ? `border-black/10 ${glow[it.accent]}`
                        : "border-black/10 hover:-translate-y-0.5 hover:shadow-sm",
                    ].join(" ")}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={[
                          "inline-flex h-10 w-10 items-center justify-center rounded-2xl",
                          it.accent === "blue"
                            ? "bg-blue-500/10 text-blue-600"
                            : "bg-red-500/10 text-red-600",
                        ].join(" ")}
                      >
                        <Icon name={it.icon} />
                      </div>

                      {it.tag ? (
                        <span
                          className={[
                            "rounded-full border px-3 py-1 text-xs font-semibold",
                            chip[it.accent],
                          ].join(" ")}
                        >
                          {it.tag}
                        </span>
                      ) : (
                        <span className="text-xs text-black/40">
                          {selected ? "Selected" : "Preview"}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 text-sm font-bold">{it.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-black/70">
                      {it.desc}
                    </p>

                    <div className="mt-4 h-px bg-black/10" />

                    <p className="mt-3 text-xs text-black/60">
                      <span className="font-semibold text-black/70">Why:</span>{" "}
                      {it.why}
                    </p>

                    <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                      <div className="absolute -left-10 top-0 h-full w-24 rotate-12 bg-black/[0.03] blur-md" />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right: preview panel */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="overflow-hidden rounded-3xl border border-black/10 bg-black">
                <div className="relative h-[260px] w-full sm:h-[320px]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={a.title}
                      src={a.image}
                      alt={a.title}
                      className="h-full w-full object-cover opacity-85"
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.35 }}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,0.25),transparent_55%),radial-gradient(circle_at_70%_40%,rgba(220,38,38,0.18),transparent_55%)]" />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-white">{a.title}</p>
                      <p className="mt-1 text-xs text-white/75">{a.desc}</p>
                    </div>
                    <span
                      className={[
                        "rounded-full border px-3 py-1 text-xs font-semibold",
                        a.accent === "blue"
                          ? "border-blue-500/30 bg-blue-500/10 text-blue-100"
                          : "border-red-500/30 bg-red-500/10 text-red-100",
                      ].join(" ")}
                    >
                      {a.tag ?? (a.accent === "blue" ? "Core" : "Pro")}
                    </span>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs leading-5 text-white/80">{a.why}</p>
                  </div>

                  <div className="mt-4 text-xs text-white/60">
                    Tap a card to preview the facility.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
