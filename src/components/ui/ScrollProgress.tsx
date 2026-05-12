"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 28,
    mass: 0.35,
  });
  const [nextLabel, setNextLabel] = useState("Plans");
  const raf = useRef<number | null>(null);
  const ids = useMemo(() => NAV_LINKS.map((link) => link.id), []);

  useEffect(() => {
    function updateNextLabel() {
      if (raf.current) return;
      raf.current = window.requestAnimationFrame(() => {
        raf.current = null;
        const next = ids
          .map((id) => {
            const el = document.getElementById(id);
            return el ? { id, top: el.getBoundingClientRect().top } : null;
          })
          .filter(Boolean)
          .find((item) => item && item.top > 96);

        const link = next
          ? NAV_LINKS.find((item) => item.id === next.id)
          : NAV_LINKS[NAV_LINKS.length - 1];

        setNextLabel(link?.label ?? "Contact");
      });
    }

    updateNextLabel();
    window.addEventListener("scroll", updateNextLabel, { passive: true });
    window.addEventListener("resize", updateNextLabel);
    return () => {
      if (raf.current) window.cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", updateNextLabel);
      window.removeEventListener("resize", updateNextLabel);
    };
  }, [ids]);

  return (
    <div className="absolute bottom-0 left-0 right-0">
      <div className="h-[3px] origin-left bg-black/5">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-[color:var(--fh-red)] via-[color:var(--fh-gold)] to-[color:var(--fh-blue)]"
          style={{ scaleX }}
        />
      </div>
      <div className="pointer-events-none absolute right-4 top-2 hidden rounded-full border border-black/10 bg-white/85 px-3 py-1 text-[11px] font-semibold text-black shadow-sm backdrop-blur lg:block">
        Next: {nextLabel}
      </div>
    </div>
  );
}
