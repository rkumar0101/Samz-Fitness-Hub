"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { BRANCHES } from "@/lib/constants";

type Slide = {
  src: string;
  title: string;
  subtitle: string;
};

function clampIndex(i: number, len: number) {
  return (i + len) % len;
}

export default function HeroCarousel({ whatsappHref }: { whatsappHref: string }) {
  const slides: Slide[] = useMemo(
    () =>
      BRANCHES.flatMap((branch) =>
        branch.images.slice(0, 2).map((src) => ({
          src,
          title: `${branch.area} training space`,
          subtitle: `${branch.landmark} - ${branch.timings[0]}, ${branch.timings[1]}`,
        }))
      ),
    []
  );

  const total = slides.length;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const isHovering = useRef(false);

  function goNext() {
    setDir(1);
    setIndex((i) => clampIndex(i + 1, total));
  }

  function goPrev() {
    setDir(-1);
    setIndex((i) => clampIndex(i - 1, total));
  }

  useEffect(() => {
    const t = setInterval(() => {
      if (!isHovering.current) goNext();
    }, 4500);
    return () => clearInterval(t);
  });

  const active = slides[index] ?? slides[0];

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-black shadow-lg"
      onMouseEnter={() => {
        isHovering.current = true;
      }}
      onMouseLeave={() => {
        isHovering.current = false;
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${active.src}-${index}`}
          className="relative h-[360px] w-full sm:h-[420px]"
          initial={{ opacity: 0, x: dir * 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -dir * 24 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) goNext();
            else if (info.offset.x > 60) goPrev();
          }}
        >
          <Image
            src={active.src}
            alt={active.title}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
            priority={index === 0}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold text-white">{active.title}</p>
                <p className="mt-1 text-xs text-white/75">{active.subtitle}</p>
              </div>
              <Button
                href={whatsappHref}
                target="_blank"
                className="w-full min-w-[154px] whitespace-nowrap bg-[color:var(--fh-red)] px-6 hover:opacity-95 sm:w-auto"
              >
                Ask for details
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute left-3 top-3 flex gap-2">
        <button
          type="button"
          onClick={goPrev}
          className="rounded-xl border border-white/15 bg-black/35 px-3 py-2 text-xs font-semibold text-white hover:bg-black/45"
          aria-label="Previous"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={goNext}
          className="rounded-xl border border-white/15 bg-black/35 px-3 py-2 text-xs font-semibold text-white hover:bg-black/45"
          aria-label="Next"
        >
          Next
        </button>
      </div>

      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={`${slide.src}-${i}`}
            type="button"
            onClick={() => {
              setDir(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={[
              "h-2 rounded-full transition",
              i === index
                ? "w-6 bg-white/90"
                : "w-2 bg-white/35 hover:bg-white/55",
            ].join(" ")}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
