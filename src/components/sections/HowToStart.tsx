import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { BRAND, BRANCHES, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";
import { waLink } from "@/lib/whatsapp";

const STEPS = [
  ["01", "Choose area", "Pick the nearest Samz Fitness Hub location."],
  ["02", "Check plan", "Compare membership, PT, yearly, couple, or group rates."],
  ["03", "Confirm slot", "Call or WhatsApp to confirm timing and trainer availability."],
  ["04", "Start training", "Visit the branch and begin with basic trainer guidance."],
];

export default function HowToStart() {
  const whatsappHref = waLink(BRAND.phoneE164, WHATSAPP_DEFAULT_MESSAGE);
  const images = [
    BRANCHES[2].images[1],
    BRANCHES[0].images[2],
    BRANCHES[3].images[2],
  ];

  return (
    <section id="how-to-start" className="scroll-mt-24 bg-white py-16">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
          <div className="rounded-[2rem] bg-[#07111F] p-6 text-white shadow-xl shadow-black/10">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/45">
              Admission process
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
              Join in four simple steps
            </h2>
            <p className="mt-4 text-sm leading-6 text-white/68">
              The goal is simple: choose the area, understand pricing, confirm
              your slot, and start training without confusion.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {images.map((image, index) => (
                <div
                  key={image}
                  className={[
                    "relative overflow-hidden rounded-2xl border border-white/10 bg-black",
                    index === 1 ? "mt-8 h-44" : "h-44",
                  ].join(" ")}
                >
                  <Image
                    src={image}
                    alt="Samz Fitness Hub interior"
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                <p className="text-2xl font-extrabold">Nil</p>
                <p className="mt-1 text-xs text-white/60">
                  Admission charge till offer
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                <p className="text-2xl font-extrabold">Mon-Sat</p>
                <p className="mt-1 text-xs text-white/60">
                  Morning and evening slots
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-[#F7FAFC] p-6 shadow-sm">
            <div className="grid gap-4">
              {STEPS.map(([number, title, desc]) => (
                <div
                  key={number}
                  className="group grid grid-cols-[64px_1fr] gap-4 rounded-3xl border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-base font-extrabold text-white shadow-lg shadow-red-950/20">
                    {number}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-black">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-black/65">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-3 rounded-3xl bg-black p-5 text-white md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-sm font-extrabold">Want a routine first?</p>
                <p className="mt-1 text-sm leading-6 text-white/65">
                  Use the AI planner, then ask the gym to match it with your
                  branch timing.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#plan-builder"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Open AI planner
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
