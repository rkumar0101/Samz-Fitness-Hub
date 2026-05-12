"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Facility = {
  num: string;
  title: string;
  desc: string;
  image: string;
  accent: "red" | "gold";
};

const FACILITIES: Facility[] = [
  {
    num: "01",
    title: "Clean equipment",
    desc: "Machines and free weights are wiped down and serviced on a fixed routine. Less downtime, better hygiene, and a floor you actually want to come back to.",
    image: "/gym-images/fit-beat-1.jpeg",
    accent: "red",
  },
  {
    num: "02",
    title: "Strength zone",
    desc: "Power racks, benches, and a full dumbbell range. Built for progressive overload, beginner friendly with form guidance from trainers on the floor.",
    image: "/gym-images/fit-beat-4.jpeg",
    accent: "gold",
  },
  {
    num: "03",
    title: "Cardio floor",
    desc: "Treadmills, cycles, and a dedicated warm up space. Cardio sets your stamina and fat loss base, so it gets real space, not a corner.",
    image: "/gym-images/fitness-hub-4-1.jpeg",
    accent: "red",
  },
  {
    num: "04",
    title: "Stretch and mobility",
    desc: "An open mat area for warm ups, cool downs, and mobility work. Fewer injuries, better movement, and recovery that actually fits the session.",
    image: "/gym-images/fitness-hub-4-4.jpeg",
    accent: "gold",
  },
  {
    num: "05",
    title: "Lockers and changing",
    desc: "Lockers for your bag and phone while you train. Changing space is kept clean so you can step in, train hard, and step out without thinking about logistics.",
    image: "/gym-images/fitness-hub-2-2.jpeg",
    accent: "red",
  },
  {
    num: "06",
    title: "Trainer support",
    desc: "Floor trainers help you with form and routine. Personal training is available as an add on if you want a planned, week by week progression.",
    image: "/gym-images/fitness-hub-2-5.jpeg",
    accent: "gold",
  },
];

export default function FacilitiesStack() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Header parallax fade
  const headerY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.6]);

  return (
    <section
      id="facilities"
      ref={sectionRef}
      aria-label="Facilities at every Samz Fitness Hub gym"
      className="relative bg-[color:var(--fh-bg)] text-white"
    >
      <Container>
        {/* Section header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="max-w-5xl pt-24 pb-12 md:pt-32 md:pb-16"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[color:var(--fh-red)]">
            Facilities
          </p>
          <h2 className="mt-3 h-display text-5xl leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-[6.5rem]">
            What you get on the{" "}
            <span className="text-gradient-gold">gym floor.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/65">
            The same six standards at every branch in Siliguri. No surprise gaps
            between Laketown, Arabinda Pally, Haiderpara, and Central.
          </p>
        </motion.div>

        {/* Sticky-stack column */}
        <div className="relative pb-24 md:pb-32">
          {FACILITIES.map((f, i) => {
            const topOffset = 96 + i * 22;
            return (
              <article
                key={f.num}
                className="sticky mb-6 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[color:var(--fh-bg-2)] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.7)]"
                style={{ top: `${topOffset}px` }}
              >
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.05fr]">
                  {/* Left — copy */}
                  <div className="relative overflow-hidden p-8 md:p-12 lg:p-14">
                    <div
                      aria-hidden
                      className="absolute -left-10 -top-10 h-40 w-40 rounded-full blur-3xl"
                      style={{
                        background:
                          f.accent === "red"
                            ? "radial-gradient(circle, rgba(255,42,61,0.32) 0%, transparent 70%)"
                            : "radial-gradient(circle, rgba(212,168,90,0.28) 0%, transparent 70%)",
                      }}
                    />

                    <div className="relative flex items-center gap-4">
                      <span
                        className={
                          "font-display text-6xl tracking-tight md:text-7xl " +
                          (f.accent === "red"
                            ? "text-[color:var(--fh-red)]"
                            : "text-gradient-gold")
                        }
                      >
                        {f.num}
                      </span>
                      <span className="block h-px flex-1 bg-white/15" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/55">
                        Facility
                      </span>
                    </div>

                    <h3 className="relative mt-6 h-display text-4xl leading-[0.95] text-white sm:text-5xl md:text-6xl">
                      {f.title}
                    </h3>

                    <p className="relative mt-5 max-w-md text-base leading-7 text-white/70">
                      {f.desc}
                    </p>

                    <div className="relative mt-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--fh-red)]" />
                      <span>Available at every branch</span>
                    </div>
                  </div>

                  {/* Right — image */}
                  <div className="relative h-72 md:h-auto md:min-h-[460px]">
                    <Image
                      src={f.image}
                      alt={`${f.title} at Samz Fitness Hub, Siliguri`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent md:bg-gradient-to-r md:from-[color:var(--fh-bg-2)] md:via-transparent md:to-transparent" />
                    <div className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                      <span
                        className={
                          "inline-block h-1.5 w-1.5 rounded-full " +
                          (f.accent === "red"
                            ? "bg-[color:var(--fh-red)]"
                            : "bg-[color:var(--fh-gold)]")
                        }
                      />
                      {String(i + 1).padStart(2, "0")} of{" "}
                      {String(FACILITIES.length).padStart(2, "0")}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
