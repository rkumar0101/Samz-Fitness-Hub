"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Motion";

type Trainer = {
  id: string;
  name: string;
  role: string;
  expYears: number;
  photo: string;
  bio: string;
  specialties: string[];
  availability: string;
  area: string;
};

const TRAINERS: Trainer[] = [
  {
    id: "saurav",
    name: "Saurav Chettri",
    role: "Strength coaching",
    expYears: 7,
    photo: "/gym-images/fit-beat-2.jpeg",
    bio: "Calm form correction, steady loading, and practical routines for members returning to training.",
    specialties: ["Strength basics", "Form correction", "Weight training"],
    availability: "Morning and evening slots",
    area: "Laketown",
  },
  {
    id: "pooja",
    name: "Pooja Rai",
    role: "Fat-loss guidance",
    expYears: 5,
    photo: "/gym-images/fitness-hub-4-3.jpeg",
    bio: "Simple cardio, machine circuits, and food-habit guidance that fits regular Siliguri schedules.",
    specialties: ["Fat loss", "Beginner routine", "Cardio planning"],
    availability: "Evening slots",
    area: "Haiderpara",
  },
  {
    id: "aniket",
    name: "Aniket Das",
    role: "Muscle gain",
    expYears: 6,
    photo: "/gym-images/fit-beat-4.jpeg",
    bio: "Focused hypertrophy training with clean technique, sensible volume, and weekly progression.",
    specialties: ["Hypertrophy", "Split planning", "Progress tracking"],
    availability: "Flexible slots",
    area: "Arabinda Pally",
  },
  {
    id: "rituparna",
    name: "Rituparna Saha",
    role: "Mobility and safe training",
    expYears: 4,
    photo: "/gym-images/fitness-hub-2-4.jpeg",
    bio: "Warm-up, mobility, and safer machine setup for beginners, women members, and comeback training.",
    specialties: ["Mobility", "Warm-up flow", "Beginner setup"],
    availability: "Morning slots",
    area: "Siliguri",
  },
];

function SkillPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-black/65">
      {children}
    </span>
  );
}

export default function Trainers() {
  const [activeId, setActiveId] = useState(TRAINERS[0].id);

  const active = useMemo(
    () => TRAINERS.find((trainer) => trainer.id === activeId) ?? TRAINERS[0],
    [activeId]
  );

  return (
    <section id="trainers" className="scroll-mt-24 py-16">
      <Container>
        <SectionHeading
          eyebrow="Coaching"
          title="Trainer support"
          subtitle="Local trainer support for strength, fat loss, beginner workouts, and PT enquiries."
        />

        <Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_420px]">
            <div className="grid gap-4 sm:grid-cols-2">
              {TRAINERS.map((trainer) => {
                const selected = trainer.id === activeId;
                return (
                  <button
                    key={trainer.id}
                    type="button"
                    onMouseEnter={() => setActiveId(trainer.id)}
                    onClick={() => setActiveId(trainer.id)}
                    className={[
                      "group rounded-3xl border bg-white p-4 text-left transition hover:-translate-y-0.5 hover:shadow-sm",
                      selected
                        ? "border-blue-500/30 shadow-[0_20px_50px_-35px_rgba(37,99,235,0.9)]"
                        : "border-black/10",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-black">
                        <Image
                          src={trainer.photo}
                          alt={`${trainer.name} coaching photo`}
                          fill
                          className="object-cover transition group-hover:scale-105"
                          sizes="64px"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-extrabold">
                          {trainer.name}
                        </p>
                        <p className="mt-1 truncate text-xs text-black/60">
                          {trainer.role}
                        </p>
                        <p className="mt-2 text-xs font-semibold text-blue-700">
                          {trainer.expYears} years experience - {trainer.area}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="rounded-3xl border border-black/10 bg-black/[0.02] p-5">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-3xl bg-black">
                  <Image
                    src={active.photo}
                    alt={`${active.name} selected coaching photo`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div>
                  <p className="text-lg font-extrabold">{active.name}</p>
                  <p className="mt-1 text-sm text-black/60">{active.role}</p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-[color:var(--fh-muted)]">
                {active.bio}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {active.specialties.map((skill) => (
                  <SkillPill key={skill}>{skill}</SkillPill>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-black/10 bg-white p-4">
                  <p className="text-xs font-semibold text-black/50">Area</p>
                  <p className="mt-1 text-sm font-bold">{active.area}</p>
                </div>
                <div className="rounded-2xl border border-black/10 bg-white p-4">
                  <p className="text-xs font-semibold text-black/50">
                    Availability
                  </p>
                  <p className="mt-1 text-sm font-bold">{active.availability}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
