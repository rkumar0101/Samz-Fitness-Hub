// "use client";

// import { useMemo, useState } from "react";
// import { Container } from "@/components/ui/Container";
// import { SectionHeading } from "@/components/ui/SectionHeading";
// import { BRAND, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";
// import { waLink } from "@/lib/whatsapp";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/Button";

// type Program = {
//   id: string;
//   title: string;
//   desc: string;
//   accent: "blue" | "red";
//   tag: string;
//   level: "Beginner" | "Intermediate" | "Advanced";
//   duration: string;
//   frequency: string;
//   focus: string[];
//   split: { day: string; plan: string }[];
//   checklist: string[];
// };

// function Icon({ name }: { name: "flame" | "barbell" | "leaf" | "bolt" | "heart" | "target" }) {
//   const cls = "h-5 w-5";
//   if (name === "flame")
//     return (
//       <svg className={cls} viewBox="0 0 24 24" fill="none">
//         <path
//           d="M12 22c4 0 7-3 7-7 0-5-5-6-5-11-2 2-2 4-2 5-2-2-2-4-2-7-4 4-6 7-6 12 0 4 3 8 8 8Z"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinejoin="round"
//         />
//       </svg>
//     );
//   if (name === "barbell")
//     return (
//       <svg className={cls} viewBox="0 0 24 24" fill="none">
//         <path d="M7 10v4M17 10v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//         <path d="M9 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//         <path d="M5 9v6M19 9v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//       </svg>
//     );
//   if (name === "leaf")
//     return (
//       <svg className={cls} viewBox="0 0 24 24" fill="none">
//         <path
//           d="M20 4c-8 1-14 7-15 15 8-1 14-7 15-15Z"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinejoin="round"
//         />
//         <path d="M9 15c2-2 5-5 11-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//       </svg>
//     );
//   if (name === "bolt")
//     return (
//       <svg className={cls} viewBox="0 0 24 24" fill="none">
//         <path
//           d="M13 2 3 14h8l-1 8 11-14h-8l0-6Z"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinejoin="round"
//         />
//       </svg>
//     );
//   if (name === "heart")
//     return (
//       <svg className={cls} viewBox="0 0 24 24" fill="none">
//         <path
//           d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.4-9.5 9-9.5 9Z"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinejoin="round"
//         />
//       </svg>
//     );
//   // target
//   return (
//     <svg className={cls} viewBox="0 0 24 24" fill="none">
//       <path d="M12 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//       <path
//         d="M21 3v6h-6"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <path
//         d="M20 13a8 8 0 1 1-9-9"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// }

// export default function Programs() {
//   const programs: Program[] = useMemo(
//     () => [
//       {
//         id: "fat-loss",
//         title: "Fat loss",
//         desc: "Sustainable routine + simple tracking.",
//         accent: "red",
//         tag: "Most requested",
//         level: "Beginner",
//         duration: "4–6 weeks",
//         frequency: "4–5 days/week",
//         focus: ["Steps + cardio", "Full-body strength", "Simple nutrition"],
//         split: [
//           { day: "Day 1", plan: "Full body strength + 10 min incline walk" },
//           { day: "Day 2", plan: "Cardio + core (low impact)" },
//           { day: "Day 3", plan: "Upper body + brisk walk" },
//           { day: "Day 4", plan: "Lower body + mobility" },
//           { day: "Day 5", plan: "Conditioning circuit (easy) + stretch" },
//         ],
//         checklist: ["8k–10k steps", "Protein every meal", "Sleep 7h+", "Track 3 habits only"],
//       },
//       {
//         id: "strength-basics",
//         title: "Strength basics",
//         desc: "Compound lifts with form guidance.",
//         accent: "blue",
//         tag: "Best foundation",
//         level: "Beginner",
//         duration: "6–8 weeks",
//         frequency: "3–4 days/week",
//         focus: ["Squat pattern", "Press + pull", "Progressive overload"],
//         split: [
//           { day: "Day 1", plan: "Squat + push + accessories" },
//           { day: "Day 2", plan: "Hinge + pull + accessories" },
//           { day: "Day 3", plan: "Full body (lighter) + core" },
//           { day: "Day 4", plan: "Optional: mobility + easy cardio" },
//         ],
//         checklist: ["Log weights", "Add reps weekly", "Warm-up properly", "Rest 2–3 min on main lifts"],
//       },
//       {
//         id: "beginner-plan",
//         title: "Beginner plan",
//         desc: "Start light, build consistency.",
//         accent: "blue",
//         tag: "No overwhelm",
//         level: "Beginner",
//         duration: "2–4 weeks",
//         frequency: "3 days/week",
//         focus: ["Form first", "Simple machines", "Routine you repeat"],
//         split: [
//           { day: "Day 1", plan: "Machines: push + pull + legs (light)" },
//           { day: "Day 2", plan: "Cardio 20 min + mobility" },
//           { day: "Day 3", plan: "Repeat Day 1 (slightly better form)" },
//         ],
//         checklist: ["Show up 3x/week", "Keep workouts 45 min", "Leave 2 reps in tank", "Stretch 5 min"],
//       },
//       {
//         id: "muscle-gain",
//         title: "Muscle gain",
//         desc: "Progressive overload + recovery.",
//         accent: "red",
//         tag: "Build size",
//         level: "Intermediate",
//         duration: "8–12 weeks",
//         frequency: "4–6 days/week",
//         focus: ["Hypertrophy sets", "Good volume", "Recovery + food"],
//         split: [
//           { day: "Day 1", plan: "Push (chest/shoulders/triceps)" },
//           { day: "Day 2", plan: "Pull (back/biceps)" },
//           { day: "Day 3", plan: "Legs + calves" },
//           { day: "Day 4", plan: "Upper (lighter) + arms" },
//           { day: "Day 5", plan: "Lower (lighter) + core" },
//         ],
//         checklist: ["Protein target", "Sleep 7–8h", "Track lifts", "Deload every 6–8 weeks"],
//       },
//       {
//         id: "mobility-recovery",
//         title: "Mobility & recovery",
//         desc: "Move better, lift safer.",
//         accent: "blue",
//         tag: "Injury-proof",
//         level: "Beginner",
//         duration: "2–3 weeks",
//         frequency: "3–5 days/week",
//         focus: ["Hips + ankles", "Shoulders", "Breathing + core"],
//         split: [
//           { day: "Day 1", plan: "Hips + ankles (20–25 min)" },
//           { day: "Day 2", plan: "Shoulders + T-spine (20 min)" },
//           { day: "Day 3", plan: "Core + breathing (15–20 min)" },
//           { day: "Day 4", plan: "Full body flow (20 min)" },
//         ],
//         checklist: ["Do it post-workout", "No pain range", "Slow reps", "Breathe properly"],
//       },
//       {
//         id: "cardio-conditioning",
//         title: "Cardio conditioning",
//         desc: "Stamina without burning out.",
//         accent: "red",
//         tag: "Performance",
//         level: "Intermediate",
//         duration: "4–6 weeks",
//         frequency: "3–4 days/week",
//         focus: ["Zone 2", "Intervals", "Recovery days"],
//         split: [
//           { day: "Day 1", plan: "Zone 2 cardio (25–35 min)" },
//           { day: "Day 2", plan: "Intervals (10–15 min) + walk" },
//           { day: "Day 3", plan: "Zone 2 cardio (25–35 min)" },
//           { day: "Day 4", plan: "Easy recovery + mobility" },
//         ],
//         checklist: ["Keep it sustainable", "Hydrate", "Warm-up 5 min", "Don’t max out daily"],
//       },
//     ],
//     []
//   );

//   const [activeId, setActiveId] = useState(programs[0].id);
//   const active = programs.find((p) => p.id === activeId) ?? programs[0];

//   const accent = {
//     blue: {
//       ring: "ring-blue-500/20",
//       chip: "border-blue-500/20 bg-blue-500/10 text-blue-700",
//       icon: "bg-blue-500/10 text-blue-600",
//       glow: "shadow-[0_0_0_1px_rgba(37,99,235,0.12),0_18px_44px_-24px_rgba(37,99,235,0.45)]",
//       bar: "bg-blue-600",
//     },
//     red: {
//       ring: "ring-red-500/20",
//       chip: "border-red-500/20 bg-red-500/10 text-red-700",
//       icon: "bg-red-500/10 text-red-600",
//       glow: "shadow-[0_0_0_1px_rgba(220,38,38,0.12),0_18px_44px_-24px_rgba(220,38,38,0.42)]",
//       bar: "bg-red-600",
//     },
//   } as const;

//   const whatsappHref = waLink(
//     BRAND.phoneE164,
//     `${WHATSAPP_DEFAULT_MESSAGE}\n\nGoal: ${active.title}\nPreferred time: Morning/Evening\nExperience: ${active.level}`
//   );

//   return (
//     <section className="bg-black/[0.02] py-16">
//       <Container>
//         <SectionHeading
//           eyebrow="Programs"
//           title="Pick a goal. We’ll map the plan."
//           subtitle="Choose a program and see the weekly split instantly."
//         />

//         <div className="mt-10 grid gap-6 lg:grid-cols-12">
//           {/* Left: goal cards */}
//           <div className="lg:col-span-7">
//             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//               {programs.map((p, i) => {
//                 const selected = p.id === activeId;
//                 const a = accent[p.accent];

//                 const iconName =
//                   p.id === "fat-loss"
//                     ? "flame"
//                     : p.id === "strength-basics"
//                     ? "barbell"
//                     : p.id === "beginner-plan"
//                     ? "leaf"
//                     : p.id === "muscle-gain"
//                     ? "bolt"
//                     : p.id === "mobility-recovery"
//                     ? "heart"
//                     : "target";

//                 return (
//                   <motion.button
//                     key={p.id}
//                     type="button"
//                     onClick={() => setActiveId(p.id)}
//                     whileTap={{ scale: 0.98 }}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.25, delay: i * 0.03 }}
//                     className={[
//                       "group relative text-left rounded-3xl border border-black/10 bg-white p-6 transition",
//                       selected ? `ring-2 ${a.ring} ${a.glow}` : "hover:-translate-y-0.5 hover:shadow-sm",
//                     ].join(" ")}
//                   >
//                     <div className="flex items-start justify-between gap-3">
//                       <div className={["inline-flex h-10 w-10 items-center justify-center rounded-2xl", a.icon].join(" ")}>
//                         <Icon name={iconName as any} />
//                       </div>
//                       <span className={["rounded-full border px-3 py-1 text-xs font-semibold", a.chip].join(" ")}>
//                         {p.tag}
//                       </span>
//                     </div>

//                     <h3 className="mt-4 text-sm font-bold">{p.title}</h3>
//                     <p className="mt-2 text-sm leading-6 text-black/70">{p.desc}</p>

//                     <div className="mt-4 flex flex-wrap gap-2">
//                       <span className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-xs font-semibold text-black/70">
//                         {p.level}
//                       </span>
//                       <span className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-xs font-semibold text-black/70">
//                         {p.frequency}
//                       </span>
//                       <span className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-xs font-semibold text-black/70">
//                         {p.duration}
//                       </span>
//                     </div>

//                     {selected ? (
//                       <p className="mt-4 text-xs font-semibold text-black/60">
//                         Selected • See mapped plan →
//                       </p>
//                     ) : (
//                       <p className="mt-4 text-xs text-black/40">Tap to preview</p>
//                     )}
//                   </motion.button>
//                 );
//               })}
//             </div>

//             {/* small micro copy */}
//             <p className="mt-5 text-xs text-black/55">
//               Don’t overthink it. Pick one goal and follow it for 4 weeks. Then adjust.
//             </p>
//           </div>

//           {/* Right: mapped plan */}
//           <div className="lg:col-span-5">
//             <div className="sticky top-24">
//               <div className="rounded-3xl border border-black/10 bg-white p-6">
//                 <div className="flex items-start justify-between gap-3">
//                   <div>
//                     <p className="text-sm font-bold">{active.title}</p>
//                     <p className="mt-1 text-xs text-black/60">{active.desc}</p>
//                   </div>
//                   <span className={["rounded-full border px-3 py-1 text-xs font-semibold", accent[active.accent].chip].join(" ")}>
//                     {active.level}
//                   </span>
//                 </div>

//                 {/* progress feel */}
//                 <div className="mt-4">
//                   <p className="text-xs font-semibold text-black/60">Focus</p>
//                   <div className="mt-2 flex flex-wrap gap-2">
//                     {active.focus.map((f) => (
//                       <span
//                         key={f}
//                         className="rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-xs font-semibold text-black/70"
//                       >
//                         {f}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="mt-5 h-px bg-black/10" />

//                 {/* Weekly split */}
//                 <div className="mt-5">
//                   <p className="text-xs font-semibold text-black/60">Weekly split</p>

//                   <div className="mt-3 space-y-2">
//                     <AnimatePresence mode="wait">
//                       <motion.div
//                         key={active.id}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -6 }}
//                         transition={{ duration: 0.25 }}
//                         className="space-y-2"
//                       >
//                         {active.split.map((s) => (
//                           <div
//                             key={s.day}
//                             className="rounded-2xl border border-black/10 bg-white p-3"
//                           >
//                             <div className="flex items-start justify-between gap-3">
//                               <p className="text-xs font-bold">{s.day}</p>
//                               <span className="rounded-full border border-black/10 bg-black/[0.02] px-2 py-0.5 text-[11px] font-semibold text-black/60">
//                                 {active.frequency}
//                               </span>
//                             </div>
//                             <p className="mt-1 text-xs leading-5 text-black/70">
//                               {s.plan}
//                             </p>
//                             <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
//                               <div className={["h-full w-[68%] rounded-full", accent[active.accent].bar].join(" ")} />
//                             </div>
//                           </div>
//                         ))}
//                       </motion.div>
//                     </AnimatePresence>
//                   </div>
//                 </div>

//                 {/* checklist */}
//                 <div className="mt-5 rounded-2xl border border-black/10 bg-black/[0.02] p-4">
//                   <p className="text-xs font-bold">Simple checklist</p>
//                   <ul className="mt-2 space-y-1 text-xs text-black/70">
//                     {active.checklist.map((c) => (
//                       <li key={c} className="flex gap-2">
//                         <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-black/40" />
//                         <span>{c}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="mt-5 flex flex-wrap gap-3">
//                   <Button
//                     href={whatsappHref}
//                     target="_blank"
//                     className="bg-[color:var(--fh-red)] hover:opacity-95"
//                   >
//                     Send this plan on WhatsApp
//                   </Button>
//                   <Button variant="secondary" href="#plans">
//                     See pricing
//                   </Button>
//                 </div>

//                 <p className="mt-3 text-xs text-black/50">
//                   Note: This is a starter map. We can tweak based on your goal + timing.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// }