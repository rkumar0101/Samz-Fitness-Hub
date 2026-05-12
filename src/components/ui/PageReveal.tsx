"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { BRAND } from "@/lib/constants";

export default function PageReveal() {
  const [show, setShow] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const seen = sessionStorage.getItem("samz-reveal-seen");
    if (seen) {
      setShow(false);
      return;
    }
    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("samz-reveal-seen", "1");
    }, reduce ? 200 : 1700);
    return () => clearTimeout(t);
  }, [reduce]);

  if (!show) return null;

  return (
    <motion.div
      className="page-reveal"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative flex items-center gap-4 overflow-hidden">
        <motion.span
          className="block h-px w-16 bg-[color:var(--fh-red)]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />
        <div className="flex overflow-hidden">
          {BRAND.name.split("").map((c, i) => (
            <motion.span
              key={i}
              className="font-display text-3xl uppercase tracking-tight text-white sm:text-5xl"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.18 + i * 0.025,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {c === " " ? " " : c}
            </motion.span>
          ))}
        </div>
        <motion.span
          className="block h-px w-16 bg-[color:var(--fh-gold)]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          style={{ transformOrigin: "right" }}
        />
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-0 origin-bottom bg-[color:var(--fh-bg)]"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, delay: 1.15, ease: [0.76, 0, 0.24, 1] }}
        style={{ height: "100%", transformOrigin: "bottom" }}
      />
    </motion.div>
  );
}
