"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BRAND, BRANCHES, type Branch } from "@/lib/constants";
import { waLink } from "@/lib/whatsapp";
import TiltCard from "@/components/ui/TiltCard";

const currency = (n: number) =>
  n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

function allRates(branch: Branch) {
  const rows = [
    ["Monthly", branch.pricing.monthly],
    ["Quarterly", branch.pricing.quarterly],
    ["Half yearly", branch.pricing.halfYearly],
    ["Yearly", branch.pricing.yearly],
    ["Couple yearly", branch.pricing.coupleYearly],
    ["PT / month", branch.pricing.ptMonthly],
  ];

  if (branch.pricing.groupYearly) {
    rows.splice(5, 0, ["Group yearly", branch.pricing.groupYearly]);
  }

  return rows;
}

function bestValue(branch: Branch) {
  const monthlyTotal = branch.pricing.monthly * 12;
  const saving = monthlyTotal - branch.pricing.yearly;
  if (saving <= 0) return "Best for regular members";
  return `Save Rs. ${currency(saving)} on yearly`;
}

export default function Plans() {
  const [activeId, setActiveId] = useState(BRANCHES[0].id);
  const [imageIndex, setImageIndex] = useState(0);

  const active = useMemo(
    () => BRANCHES.find((branch) => branch.id === activeId) ?? BRANCHES[0],
    [activeId]
  );

  const activeImage = active.images[imageIndex % active.images.length];
  const href = waLink(
    BRAND.phoneE164,
    `Hi ${BRAND.name}, I want membership details for ${active.area}.`
  );

  function selectBranch(branch: Branch) {
    setActiveId(branch.id);
    setImageIndex(0);
  }

  return (
    <section id="plans" className="scroll-mt-24 bg-[#F7FAFC] py-16">
      <Container>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Membership"
            title="Area-wise membership plans"
            subtitle="Select a location to view rates, timings, map link, and membership options without clutter."
          />

          <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm shadow-sm">
            <span className="font-semibold text-black">Admission:</span>{" "}
            <span className="text-black/65">Nil till offer</span>
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-4">
          {BRANCHES.map((branch, index) => {
            const selected = branch.id === active.id;
            return (
              <button
                key={branch.id}
                type="button"
                onMouseEnter={() => selectBranch(branch)}
                onClick={() => selectBranch(branch)}
                className={[
                  "group overflow-hidden rounded-2xl border bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg",
                  selected ? "border-blue-500 ring-2 ring-blue-500/15" : "border-black/10",
                ].join(" ")}
              >
                <div className="relative h-28">
                  <Image
                    src={branch.images[index % branch.images.length]}
                    alt={`${branch.area} preview`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 768px) 25vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                  <p className="absolute bottom-3 left-3 right-3 text-sm font-extrabold text-white">
                    {branch.area}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 p-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase text-black/45">
                      Monthly
                    </p>
                    <p className="text-sm font-extrabold">
                      Rs. {currency(branch.pricing.monthly)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase text-black/45">
                      PT
                    </p>
                    <p className="text-sm font-extrabold">
                      Rs. {currency(branch.pricing.ptMonthly)}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          className="mt-6 overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-xl shadow-black/5"
        >
          <div className="grid lg:grid-cols-[1fr_1fr]">
            <div className="bg-[#07111F] p-4">
              <TiltCard className="relative h-[430px] overflow-hidden rounded-[1.55rem] lg:h-full lg:min-h-[560px]">
                <Image
                  src={activeImage}
                  alt={`${active.area} gym view`}
                  fill
                  className="object-cover transition duration-700"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/12 to-transparent" />
                <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/38 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
                  {active.landmark}
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="mb-4 max-w-lg text-white">
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/55">
                      Membership preview
                    </p>
                    <h3 className="mt-1 text-3xl font-extrabold tracking-tight">
                      {active.area}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {active.images.slice(0, 5).map((image, index) => (
                      <button
                        key={image}
                        type="button"
                        onClick={() => setImageIndex(index)}
                        className={[
                          "relative h-16 w-24 overflow-hidden rounded-2xl border transition",
                          index === imageIndex
                            ? "border-white opacity-100"
                            : "border-white/20 opacity-70 hover:opacity-100",
                        ].join(" ")}
                        aria-label={`Show ${active.area} image ${index + 1}`}
                      >
                        <Image
                          src={image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </div>

            <div className="p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                Selected area
              </p>
              <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-black">
                {active.area}
              </h3>
              <p className="mt-2 text-sm font-semibold text-black/55">
                {active.landmark}
              </p>
              <p className="mt-4 text-sm leading-6 text-black/65">
                {active.address}
              </p>

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {active.timings.slice(0, 2).map((time) => (
                  <div
                    key={time}
                    className="rounded-2xl border border-blue-600/15 bg-blue-600/5 px-4 py-3"
                  >
                    <p className="text-xs font-semibold text-blue-700">
                      Training slot
                    </p>
                    <p className="mt-1 text-sm font-extrabold text-black">
                      {time}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 overflow-hidden rounded-3xl border border-black/10">
                {allRates(active).map(([label, value], index) => (
                  <div
                    key={label}
                    className={[
                      "grid grid-cols-[1fr_auto] items-center gap-4 px-4 py-3",
                      index % 2 === 0 ? "bg-black/[0.025]" : "bg-white",
                    ].join(" ")}
                  >
                    <p className="text-sm font-semibold text-black/65">{label}</p>
                    <p className="text-base font-extrabold text-black">
                      Rs. {currency(Number(value))}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-3xl bg-black p-5 text-white">
                <p className="text-sm font-extrabold">Recommended option</p>
                <p className="mt-1 text-sm text-white/70">{bestValue(active)}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={href} target="_blank">
                  Enquire on WhatsApp
                </Button>
                <Button variant="secondary" href={active.mapLink} target="_blank">
                  Open map
                </Button>
                <Button variant="secondary" href="#plan-builder">
                  AI plan builder
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
