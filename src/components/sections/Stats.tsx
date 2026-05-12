"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { BRAND, BRANCHES } from "@/lib/constants";

const minMonthly = Math.min(...BRANCHES.map((branch) => branch.pricing.monthly));
const minPt = Math.min(...BRANCHES.map((branch) => branch.pricing.ptMonthly));

const STATS = [
  {
    label: "Branches",
    value: `${BRANCHES.length}`,
    hint: "Across Siliguri",
  },
  {
    label: "Admission",
    value: "Nil",
    hint: "Till offer",
  },
  {
    label: "Monthly plans",
    value: `Rs. ${minMonthly}`,
    hint: "Starting price",
  },
  {
    label: "Personal training",
    value: `Rs. ${minPt}`,
    hint: "Starting per month",
  },
];

export default function Stats() {
  return (
    <section className="border-y border-black/10 bg-white">
      <Container>
        <motion.div
          className="grid gap-4 py-10 sm:grid-cols-2 md:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-5 shadow-sm"
              variants={{
                hidden: { opacity: 0, y: 18, scale: 0.96 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
            >
              <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[color:var(--fh-red)] to-[color:var(--fh-blue)] transition-transform duration-500 group-hover:scale-x-100" />
              <p className="text-xs font-semibold text-black/55">
                {stat.label}
              </p>
              <motion.p
                className="mt-3 text-2xl font-extrabold tracking-tight"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                {stat.value}
              </motion.p>
              <p className="mt-2 text-xs text-black/60">{stat.hint}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.p
          className="-mt-4 pb-8 text-center text-xs text-black/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          For more information kindly contact{" "}
          {BRAND.phoneE164.replace(/^91/, "+91 ")}.
        </motion.p>
      </Container>
    </section>
  );
}
