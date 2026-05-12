import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Motion";

type Review = {
  name: string;
  area: string;
  rating: 5 | 4;
  text: string;
  tag: string;
};

const REVIEWS: Review[] = [
  {
    name: "Rakesh Tamang",
    area: "Laketown",
    rating: 5,
    tag: "Strength",
    text: "Clean machines, helpful staff, and the evening batch has a good serious-training crowd.",
  },
  {
    name: "Moumita Dey",
    area: "Haiderpara",
    rating: 5,
    tag: "Fat loss",
    text: "The timings work well after office. Trainers correct form without making beginners uncomfortable.",
  },
  {
    name: "Niraj Agarwal",
    area: "Arabinda Pally",
    rating: 5,
    tag: "Beginner",
    text: "I joined after a long break. The routine was simple, and I did not feel lost around the equipment.",
  },
  {
    name: "Pema Bhutia",
    area: "Siliguri",
    rating: 5,
    tag: "PT",
    text: "Personal training is practical. They focus on consistency first, then slowly increase intensity.",
  },
  {
    name: "Ananya Saha",
    area: "Ward 23",
    rating: 4,
    tag: "General fitness",
    text: "Good atmosphere and helpful guidance. Peak hours are busy, but the floor stays organized.",
  },
  {
    name: "Suman Roy",
    area: "Laketown",
    rating: 5,
    tag: "Muscle gain",
    text: "The strength area has what I need, and the trainers keep the workout plan realistic.",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={["h-4 w-4", i < rating ? "text-red-600" : "text-black/15"].join(" ")}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-24 bg-black/[0.02] py-16">
      <Container>
        <SectionHeading
          eyebrow="Reviews"
          title="Member reviews"
          subtitle="Sample local reviews for now. These can be replaced with verified Google reviews later."
        />

        <Reveal>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {REVIEWS.map((review) => (
              <article
                key={`${review.name}-${review.area}`}
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-sm font-extrabold text-white">
                      {initials(review.name)}
                    </div>
                    <div>
                      <p className="text-sm font-extrabold">{review.name}</p>
                      <p className="mt-0.5 text-xs text-black/55">
                        {review.area}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-700 ring-1 ring-red-500/15">
                    {review.tag}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Stars rating={review.rating} />
                  <span className="text-xs font-semibold text-black/50">
                    {review.rating}.0
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-[color:var(--fh-muted)]">
                  &quot;{review.text}&quot;
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
