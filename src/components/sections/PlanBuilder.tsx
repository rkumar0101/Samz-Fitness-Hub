"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { BRAND } from "@/lib/constants";

type Inputs = {
  goal: string;
  experience: string;
  daysPerWeek: string;
  sessionTime: string;
  equipment: string;
  injuries: string;
  diet: string;
  schedulePref: string;
};

type Plan = {
  headline: string;
  summary: string;
  weeklySplit: { day: string; focus: string; workout: string }[];
  workoutRules: string[];
  nutritionBasics: string[];
  recovery: string[];
  progression4Weeks: { week: string; whatToDo: string }[];
  safetyNotes: string[];
  whatToTellTrainer: string[];
};

const FIELDS: {
  key: keyof Inputs;
  label: string;
  options: string[];
}[] = [
  {
    key: "goal",
    label: "Goal",
    options: ["Fat loss", "Muscle gain", "Strength", "General fitness", "Mobility and recovery"],
  },
  {
    key: "experience",
    label: "Experience",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    key: "daysPerWeek",
    label: "Days per week",
    options: ["3", "4", "5", "6"],
  },
  {
    key: "sessionTime",
    label: "Session length",
    options: ["30 min", "45 min", "60 min"],
  },
  {
    key: "equipment",
    label: "Equipment",
    options: ["Full gym", "Basic dumbbells", "Bodyweight only"],
  },
  {
    key: "injuries",
    label: "Injuries",
    options: ["None", "Knee", "Back", "Shoulder", "Other"],
  },
  {
    key: "diet",
    label: "Diet preference",
    options: ["No preference", "Veg", "Non-veg", "High protein"],
  },
  {
    key: "schedulePref",
    label: "Preferred slot",
    options: ["Morning", "Evening", "Anytime"],
  },
];

export default function PlanBuilder() {
  const [inputs, setInputs] = useState<Inputs>({
    goal: "Fat loss",
    experience: "Beginner",
    daysPerWeek: "4",
    sessionTime: "45 min",
    equipment: "Full gym",
    injuries: "None",
    diet: "No preference",
    schedulePref: "Evening",
  });

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [error, setError] = useState<string>("");

  // Lead gate
  const [gateOpen, setGateOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [leadError, setLeadError] = useState<string>("");

  function setInput<K extends keyof Inputs>(k: K, v: Inputs[K]) {
    setInputs((p) => ({ ...p, [k]: v }));
  }

  async function generatePlan() {
    setLoading(true);
    setError("");
    setPlan(null);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed");
      setPlan(data.plan);
      // Scroll the preview into view
      setTimeout(() => {
        document
          .getElementById("plan-preview")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function submitLeadAndDownload() {
    setLeadError("");
    const cleanPhone = phone.replace(/\s+/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      setLeadError("Enter a valid 10-digit phone number.");
      return;
    }
    if (!consent) {
      setLeadError("Please tick consent to download.");
      return;
    }
    if (!plan) {
      setLeadError("Plan missing. Generate again.");
      return;
    }

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: cleanPhone,
          consent,
          goal: inputs.goal,
        }),
      });
    } catch {
      // continue
    }

    const w = window.open("", "_blank");
    if (!w) {
      setLeadError("Popup blocked. Allow popups and try again.");
      return;
    }

    const safe = (s: string) =>
      s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    const list = (arr: string[]) =>
      `<ul>${arr.map((x) => `<li>${safe(x)}</li>`).join("")}</ul>`;
    const table = plan.weeklySplit
      .map(
        (x) => `
        <tr>
          <td><b>${safe(x.day)}</b><br/><span class="muted">${safe(x.focus)}</span></td>
          <td>${safe(x.workout)}</td>
        </tr>`
      )
      .join("");

    const html = `<!doctype html><html><head><meta charset="utf-8"/><title>${safe(
      plan.headline
    )} - ${safe(BRAND.name)}</title><style>
    body { font-family: Arial, sans-serif; padding: 24px; color: #0f172a; }
    .top { display:flex; justify-content:space-between; align-items:center; gap:16px; }
    .brand { font-weight:800; letter-spacing:-0.02em; font-size: 18px; }
    .chip { display:inline-block; padding:6px 10px; border-radius:999px; background:#0b1220; color:#fff; font-size:12px; }
    h1 { margin:16px 0 6px; font-size:26px; }
    p { margin: 8px 0; line-height: 1.5; }
    .muted { color:#475569; font-size:12px; }
    .section { margin-top:18px; padding-top:14px; border-top:1px solid #e2e8f0; }
    table { width:100%; border-collapse:collapse; margin-top:10px; }
    td { border:1px solid #e2e8f0; padding:10px; vertical-align:top; }
    ul { margin: 8px 0 0 18px; }
    li { margin: 6px 0; }
    .grid { display:grid; grid-template-columns: 1fr 1fr; gap:14px; }
    @media print { .no-print { display:none; } body { padding: 0; } }
    </style></head><body>
    <div class="top">
      <div>
        <div class="brand">${safe(BRAND.name)}</div>
        <div class="muted">Personalized plan report</div>
      </div>
      <div class="chip">${safe(inputs.goal)} • ${safe(inputs.experience)}</div>
    </div>
    <h1>${safe(plan.headline)}</h1>
    <p>${safe(plan.summary)}</p>
    <p class="muted">Generated for: ${safe(name || "Member")} • Phone: ${safe(phone)}</p>
    <div class="section"><h2>Weekly Split</h2><table><tr><td><b>Day</b></td><td><b>Workout</b></td></tr>${table}</table></div>
    <div class="section grid"><div><h2>Workout Rules</h2>${list(plan.workoutRules)}</div><div><h2>Nutrition Basics</h2>${list(plan.nutritionBasics)}</div></div>
    <div class="section grid"><div><h2>Recovery</h2>${list(plan.recovery)}</div><div><h2>Safety Notes</h2>${list(plan.safetyNotes)}</div></div>
    <div class="section"><h2>4-Week Progression</h2><ul>${plan.progression4Weeks
      .map((x) => `<li><b>${safe(x.week)}:</b> ${safe(x.whatToDo)}</li>`)
      .join("")}</ul></div>
    <div class="section"><h2>What to tell your trainer</h2>${list(plan.whatToTellTrainer)}</div>
    <div class="section no-print"><button onclick="window.print()" style="padding:10px 14px;border-radius:10px;border:1px solid #e2e8f0;background:#0b1220;color:#fff;font-weight:700;cursor:pointer;">Print or Save as PDF</button></div>
    <script>setTimeout(() => window.print(), 400);</script>
    </body></html>`;

    w.document.open();
    w.document.write(html);
    w.document.close();
    setGateOpen(false);
  }

  return (
    <section
      id="plan-builder"
      aria-label="AI workout plan builder for Samz Fitness Hub members"
      className="relative bg-[color:var(--fh-bg)] py-24 text-white md:py-32"
    >
      <div aria-hidden className="fh-backdrop-soft absolute inset-0 -z-10" />

      <Container>
        {/* Header */}
        <div className="max-w-5xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[color:var(--fh-red)]">
            AI plan builder
          </p>
          <h2 className="mt-3 h-display text-5xl leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-[6.5rem]">
            Get a custom weekly plan{" "}
            <span className="text-gradient-gold">in 30 seconds.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/65">
            Tell us your goal and the basics. Our AI builds a weekly split,
            nutrition pointers, recovery notes, and a 4-week progression you can
            download as a PDF.
          </p>
        </div>

        {/* Form card */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT — inputs */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
                Your basics
              </p>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/70">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--fh-red)] animate-pulse" />
                Live · powered by Gemini
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <ChipSelect
                  key={f.key}
                  label={f.label}
                  value={inputs[f.key]}
                  options={f.options}
                  onChange={(v) => setInput(f.key, v)}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={generatePlan}
              disabled={loading}
              className="group mt-8 inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-[color:var(--fh-red)] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-18px_rgba(255,42,61,0.7)] disabled:opacity-60 sm:w-auto"
            >
              {loading ? (
                <>
                  <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Building your plan
                </>
              ) : (
                <>
                  Build my plan
                  <svg
                    className="h-4 w-4 transition group-hover:translate-x-1"
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
                </>
              )}
            </button>

            {error ? (
              <p className="mt-4 text-sm font-semibold text-[color:var(--fh-red-soft)]">
                {error}
              </p>
            ) : null}

            <p className="mt-4 text-[10px] text-white/40">
              No login. Free. Download as PDF after generating.
            </p>
          </div>

          {/* RIGHT — preview */}
          <div
            id="plan-preview"
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
          >
            <AnimatePresence mode="wait">
              {!plan && !loading ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-[360px] flex-col items-start justify-center gap-3"
                >
                  <span className="font-display text-6xl text-white/15">
                    01
                  </span>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
                    Plan preview
                  </p>
                  <p className="font-display text-2xl leading-tight text-white">
                    Build your plan to see the weekly split here.
                  </p>
                  <p className="text-sm text-white/55">
                    Your AI-generated split, nutrition basics, and 4-week
                    progression will appear in this panel.
                  </p>
                </motion.div>
              ) : loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-[360px] flex-col items-start justify-center gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-[color:var(--fh-red)]" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/65">
                      Gemini is building
                    </p>
                  </div>
                  <p className="font-display text-2xl leading-tight text-white">
                    Personalising your weekly plan...
                  </p>
                  <div className="grid w-full gap-2">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="h-3 animate-pulse rounded-full bg-white/[0.06]"
                        style={{ width: `${80 - i * 12}%` }}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : plan ? (
                <motion.div
                  key="plan"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-5"
                >
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--fh-red)]">
                      Your plan
                    </p>
                    <p className="mt-2 font-display text-3xl leading-tight text-white">
                      {plan.headline}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/70">
                      {plan.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Chip label={inputs.goal} />
                      <Chip label={`${inputs.daysPerWeek} days/week`} />
                      <Chip label={inputs.sessionTime} />
                      <Chip label={inputs.schedulePref} />
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
                      Weekly split
                    </p>
                    <div className="mt-3 space-y-2">
                      {plan.weeklySplit.slice(0, 5).map((d) => (
                        <div
                          key={d.day}
                          className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                        >
                          <p className="text-xs font-bold text-white">
                            {d.day}{" "}
                            <span className="font-medium text-white/55">
                              · {d.focus}
                            </span>
                          </p>
                          <p className="mt-1 text-xs leading-5 text-white/70">
                            {d.workout}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setGateOpen(true)}
                    className="btn-invert inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:-translate-y-0.5"
                  >
                    Download full PDF report
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M12 4v12m0 0 4-4m-4 4-4-4M4 20h16"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </Container>

      {/* Lead gate modal */}
      <AnimatePresence>
        {gateOpen ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGateOpen(false)}
          >
            <motion.div
              className="w-full max-w-md rounded-3xl border border-white/10 bg-[color:var(--fh-bg-2)] p-7 text-white"
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--fh-red)]">
                One last step
              </p>
              <p className="mt-2 font-display text-2xl leading-tight text-white">
                Download your plan
              </p>
              <p className="mt-2 text-xs text-white/55">
                Enter your phone number so we can follow up on WhatsApp if you
                want help getting started.
              </p>

              <div className="mt-5 grid gap-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-[color:var(--fh-red)]/50"
                  placeholder="Your name (optional)"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-[color:var(--fh-red)]/50"
                  placeholder="10-digit phone number"
                  inputMode="numeric"
                />
              </div>

              <label className="mt-4 flex items-start gap-2 text-xs text-white/65">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5"
                />
                <span>
                  I agree to be contacted on WhatsApp for plan follow-up and
                  offers.
                </span>
              </label>

              {leadError ? (
                <p className="mt-3 text-xs font-semibold text-[color:var(--fh-red-soft)]">
                  {leadError}
                </p>
              ) : null}

              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => setGateOpen(false)}
                  className="flex-1 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitLeadAndDownload}
                  className="flex-1 rounded-full bg-[color:var(--fh-red)] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
                >
                  Download now
                </button>
              </div>

              <p className="mt-3 text-[10px] text-white/40">
                A new tab opens and prints automatically. Choose Save as PDF.
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function ChipSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
        {label}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {options.map((o) => {
          const selected = value === o;
          return (
            <button
              key={o}
              type="button"
              onClick={() => onChange(o)}
              aria-pressed={selected}
              className={[
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                selected
                  ? "border-[color:var(--fh-red)]/50 bg-[color:var(--fh-red)]/15 text-white"
                  : "border-white/10 bg-white/[0.03] text-white/65 hover:border-white/20 hover:bg-white/[0.06] hover:text-white",
              ].join(" ")}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/75">
      <span className="inline-block h-1 w-1 rounded-full bg-[color:var(--fh-red)]" />
      {label}
    </span>
  );
}
