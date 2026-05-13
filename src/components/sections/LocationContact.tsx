"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { BRAND, BRANCHES, type Branch } from "@/lib/constants";
import { waLink } from "@/lib/whatsapp";
import { trackWa, trackMaps, trackFormSubmit } from "@/lib/analytics";

type LeadState = "idle" | "loading" | "success" | "error";
type FormShape = { name: string; phone: string; message: string };

export default function LocationContact() {
  const [activeId, setActiveId] = useState(BRANCHES[0].id);
  const [status, setStatus] = useState<LeadState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [form, setForm] = useState<FormShape>({
    name: "",
    phone: "",
    message: "",
  });

  const active = BRANCHES.find((b) => b.id === activeId) ?? BRANCHES[0];

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!form.name.trim() || !form.phone.trim()) {
      setErrorMsg("Please enter your name and phone number.");
      setStatus("error");
      trackFormSubmit({
        source: "branch-contact",
        branch: active.id,
        status: "validation_error",
      });
      return;
    }

    try {
      setStatus("loading");
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          goal: active.area,
          message: form.message,
          source: "branch-contact",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", phone: "", message: "" });
      trackFormSubmit({
        source: "branch-contact",
        branch: active.id,
        status: "submitted",
      });
    } catch {
      setStatus("error");
      setErrorMsg("Could not submit. Try WhatsApp instead.");
      trackFormSubmit({
        source: "branch-contact",
        branch: active.id,
        status: "server_error",
      });
    }
  }

  return (
    <section
      id="contact"
      aria-label="Find a branch and contact Samz Fitness Hub"
      className="relative bg-[color:var(--fh-bg)] py-24 text-white md:py-32"
    >
      <div aria-hidden className="fh-backdrop-soft absolute inset-0 -z-10" />

      <Container>
        {/* Header */}
        <div className="max-w-5xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[color:var(--fh-red)]">
            Visit and contact
          </p>
          <h2 className="mt-3 h-display text-5xl leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-[6.5rem]">
            Find your{" "}
            <span className="text-gradient-gold">nearest gym.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/65">
            Pick a branch to see the address, training slots, and a direct line.
            WhatsApp is the fastest way to confirm membership details.
          </p>
        </div>

        {/* ----- MOBILE / TABLET — accordion drawer ----- */}
        <div className="mt-12 grid gap-3 lg:hidden">
          {BRANCHES.map((b) => {
            const selected = b.id === active.id;
            return (
              <div key={b.id}>
                <PickerButton
                  branch={b}
                  selected={selected}
                  onSelect={() => setActiveId(b.id)}
                  withChevron
                />
                <AnimatePresence initial={false}>
                  {selected ? (
                    <motion.div
                      key="drawer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3">
                        <BranchDetail
                          branch={active}
                          form={form}
                          setForm={setForm}
                          status={status}
                          errorMsg={errorMsg}
                          onSubmit={submit}
                        />
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ----- DESKTOP — 2-column with persistent detail ----- */}
        <div className="mt-14 hidden gap-8 lg:grid lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-3 self-start">
            {BRANCHES.map((b) => (
              <PickerButton
                key={b.id}
                branch={b}
                selected={b.id === active.id}
                onSelect={() => setActiveId(b.id)}
              />
            ))}
          </div>

          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <BranchDetail
                  branch={active}
                  form={form}
                  setForm={setForm}
                  status={status}
                  errorMsg={errorMsg}
                  onSubmit={submit}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- PickerButton ---------- */
function PickerButton({
  branch,
  selected,
  onSelect,
  withChevron = false,
}: {
  branch: Branch;
  selected: boolean;
  onSelect: () => void;
  withChevron?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-expanded={withChevron ? selected : undefined}
      className={[
        "group flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition",
        selected
          ? "border-[color:var(--fh-red)]/60 bg-[color:var(--fh-red)]/10"
          : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]",
      ].join(" ")}
    >
      <span
        className={[
          "mt-1 inline-flex h-2 w-2 shrink-0 rounded-full",
          selected
            ? "bg-[color:var(--fh-red)] shadow-[0_0_0_4px_rgba(255,42,61,0.18)]"
            : "bg-white/30",
        ].join(" ")}
      />
      <div className="min-w-0 flex-1">
        <p className="font-display text-xl uppercase tracking-tight text-white">
          {branch.shortName}
        </p>
        <p className="mt-1 text-sm font-semibold text-white/85">
          {branch.area}
        </p>
        <p className="mt-1 text-xs text-white/55">{branch.landmark}</p>
      </div>
      {withChevron ? (
        <span
          aria-hidden
          className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-transform"
          style={{ transform: selected ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <svg
            className="h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      ) : null}
    </button>
  );
}

/* ---------- BranchDetail ---------- */
function BranchDetail({
  branch,
  form,
  setForm,
  status,
  errorMsg,
  onSubmit,
}: {
  branch: Branch;
  form: FormShape;
  setForm: React.Dispatch<React.SetStateAction<FormShape>>;
  status: LeadState;
  errorMsg: string;
  onSubmit: (e: React.FormEvent) => void | Promise<void>;
}) {
  const whatsappHref = waLink(
    BRAND.phoneE164,
    `Hi ${BRAND.name}, I want details for ${branch.name} (${branch.area}).`
  );

  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] lg:rounded-[2rem]">
      {/* Hero photo */}
      <div className="relative h-56 sm:h-64 md:h-72">
        <Image
          src={branch.images[branch.images.length - 1]}
          alt={`${branch.name} interior in ${branch.area}`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60">
            Selected branch
          </p>
          <p className="mt-2 font-display text-3xl leading-none tracking-tight text-white sm:text-4xl">
            {branch.name}
          </p>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-6 md:p-8 lg:grid-cols-2">
        {/* Address + timings + CTAs */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
            Address
          </p>
          <p className="mt-2 text-sm leading-6 text-white/80">
            {branch.address}
          </p>

          <div className="mt-6 grid gap-3">
            {branch.timings.slice(0, 2).map((t) => (
              <div
                key={t}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--fh-red)]" />
                <span className="text-sm font-semibold text-white/85">
                  {t}
                </span>
              </div>
            ))}
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
              {branch.timings[2]} · {branch.timings[3]}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWa({ source: "branch_contact", branch: branch.id })}
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--fh-red)] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5"
            >
              WhatsApp
            </a>
            <a
              href={branch.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMaps({ source: "branch_contact", branch: branch.id })}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 transition hover:bg-white/[0.08]"
            >
              Open in Maps
            </a>
          </div>

          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--fh-gold-soft)]">
            ₹0 joining fee · offer running
          </p>
        </div>

        {/* Call-back form */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
            Request a call back
          </p>
          <p className="mt-1 text-xs text-white/55">
            For {branch.area}, our team will reach out within working hours.
          </p>

          <form onSubmit={onSubmit} className="mt-4 grid gap-3">
            <input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-[color:var(--fh-red)]/50 focus:bg-white/[0.06]"
              placeholder="Your name"
              aria-label="Your name"
            />
            <input
              value={form.phone}
              onChange={(e) =>
                setForm((p) => ({ ...p, phone: e.target.value }))
              }
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-[color:var(--fh-red)]/50 focus:bg-white/[0.06]"
              placeholder="Phone number"
              inputMode="tel"
              aria-label="Phone number"
            />
            <textarea
              value={form.message}
              onChange={(e) =>
                setForm((p) => ({ ...p, message: e.target.value }))
              }
              className="min-h-24 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-[color:var(--fh-red)]/50 focus:bg-white/[0.06]"
              placeholder="Preferred plan, timing, or PT enquiry"
              aria-label="Message"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--fh-red)] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-14px_rgba(255,42,61,0.6)] disabled:opacity-60"
            >
              {status === "loading" ? "Submitting..." : "Request call back"}
              {status !== "loading" ? (
                <svg
                  className="h-3.5 w-3.5"
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
              ) : null}
            </button>

            {status === "success" ? (
              <p className="text-xs font-semibold text-[color:var(--fh-gold-soft)]">
                Got it. We will call you soon.
              </p>
            ) : null}
            {status === "error" && errorMsg ? (
              <p className="text-xs font-semibold text-[color:var(--fh-red-soft)]">
                {errorMsg}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </article>
  );
}
