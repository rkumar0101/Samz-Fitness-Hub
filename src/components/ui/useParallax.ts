"use client";

import { useEffect, useMemo, useState } from "react";

type Parallax = {
  mouseX: number; // -1..1
  mouseY: number; // -1..1
  scrollY: number; // px
};

export function useParallax() {
  const [p, setP] = useState<Parallax>({ mouseX: 0, mouseY: 0, scrollY: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setP((prev) => ({ ...prev, mouseX: x, mouseY: y }));
    };

    const onScroll = () => {
      setP((prev) => ({ ...prev, scrollY: window.scrollY || 0 }));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // computed transforms (keeps render code clean)
  const t = useMemo(() => {
    const { mouseX, mouseY, scrollY } = p;

    // small movement only
    const blob1X = mouseX * 16;
    const blob1Y = mouseY * 10 - scrollY * 0.04;

    const blob2X = mouseX * -12;
    const blob2Y = mouseY * -8 - scrollY * 0.03;

    const gridY = -scrollY * 0.06;

    return { blob1X, blob1Y, blob2X, blob2Y, gridY };
  }, [p]);

  return t;
}