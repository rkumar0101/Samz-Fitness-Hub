import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { BRAND } from "@/lib/constants";

const FLOW = [
  {
    label: "Morning training",
    time: "06:00 AM - 12:00 PM",
    detail: "Most areas follow this morning session.",
  },
  {
    label: "Evening training",
    time: "04:00 PM - 10:00 PM",
    detail: "Best slot for office, college, and post-work routines.",
  },
  {
    label: "Weekly rhythm",
    time: "Monday - Saturday",
    detail: "Sunday remains closed for reset and maintenance.",
  },
];

export default function Schedule() {
  return (
    <section id="schedule" className="scroll-mt-24 bg-[#070B12] py-16 text-white">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/45">
              Timings
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Gym timings
            </h2>
            <p className="mt-4 text-sm leading-6 text-white/65">
              Most locations follow the same morning and evening schedule, so
              members can plan training easily.
            </p>
            <p className="mt-4 text-sm leading-6 text-white/60">
              Arabinda Pally morning session closes at 11:30 AM. Call{" "}
              {BRAND.phoneE164.replace(/^91/, "+91 ")} before visiting for PT
              slot availability.
            </p>
          </div>

          <Reveal>
            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_30px_80px_-45px_rgba(37,99,235,0.9)]">
              <div className="absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-[2rem] bg-red-500/20 blur-sm" />
              <div className="grid gap-4 md:grid-cols-3">
                {FLOW.map((item, index) => (
                  <div
                    key={item.label}
                    className="relative min-h-52 rounded-3xl border border-white/10 bg-black/35 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-sm font-extrabold text-black">
                      {index + 1}
                    </span>
                    <p className="mt-6 text-xs font-semibold uppercase text-white/45">
                      {item.label}
                    </p>
                    <p className="mt-2 text-2xl font-extrabold tracking-tight">
                      {item.time}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-white/60">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-3xl border border-white/10 bg-white p-5 text-black">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-extrabold">
                      Timely admission matters
                    </p>
                    <p className="mt-1 text-sm text-black/60">
                      Fixed slots keep equipment flow smoother and trainer
                      attention easier to manage.
                    </p>
                  </div>
                  <span className="rounded-full bg-red-600 px-4 py-2 text-xs font-bold text-white">
                    Sunday closed
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
