import { ArrowUpRight, Star } from "lucide-react"
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL, REVIEWS, type ReviewSummary } from "@/lib/reviews"

function Stars({ className }: { className: string }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label="5 out of 5 stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${className} fill-[#f1c40f] text-[#f1c40f]`} aria-hidden="true" />
      ))}
    </span>
  )
}

function ReviewCard({ review }: { review: ReviewSummary }) {
  return (
    <article className="w-[300px] lg:w-[360px] shrink-0 border-l border-[#f1c40f]/30 pl-6 pr-8 lg:pr-10">
      <Stars className="w-3.5 h-3.5" />
      <h3 className="font-editorial text-xl text-[#f5efe6] mt-3 mb-2 leading-tight">{review.topic}</h3>
      <p className="text-sm text-[#f5efe6]/75 leading-relaxed mb-3">{review.summary}</p>
      <p className="font-script text-xl text-[#f1c40f] leading-none">{review.name}</p>
    </article>
  )
}

/**
 * Google reviews on a continuous scrolling band. Hovering, focusing, or
 * pressing it pauses the scroll. With reduced motion on, it's swipeable instead.
 */
export function Testimonials() {
  return (
    <section className="bg-[#0d0d0d] text-[#f5efe6] py-12 lg:py-14 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 mb-8 lg:mb-10 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rotate-45 bg-[#f1c40f]" />
            <p className="font-display tracking-[0.3em] text-xs text-[#f1c40f]">THE PEOPLE</p>
          </div>
          <h2 className="font-anton text-3xl lg:text-5xl text-[#f5efe6] leading-none uppercase">
            Fort Wayne{" "}
            <span className="text-transparent bg-gradient-to-b from-[#f1c40f] to-[#c0392b] bg-clip-text">
              says it best.
            </span>
          </h2>
        </div>

        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 text-[#f5efe6] hover:text-[#f1c40f] transition-colors"
        >
          <span className="font-anton text-4xl text-[#f1c40f] leading-none">{GOOGLE_RATING.score}</span>
          <span>
            <Stars className="w-4 h-4" />
            <span className="mt-1 flex items-center gap-1 text-xs tracking-wide">
              {GOOGLE_RATING.count} Google reviews
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
          </span>
        </a>
      </div>

      <div
        className="group motion-reduce:overflow-x-auto"
        tabIndex={0}
        role="region"
        aria-label="Summaries of Google reviews"
      >
        <div
          className="flex w-max animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused] group-focus:[animation-play-state:paused] group-active:[animation-play-state:paused]"
          style={{ animationDuration: "70s" }}
        >
          {REVIEWS.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
          {/* Second copy makes the loop seamless */}
          <div className="flex motion-reduce:hidden" aria-hidden="true">
            {REVIEWS.map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
          </div>
        </div>
      </div>

      <p className="max-w-[1600px] mx-auto px-6 lg:px-10 mt-6 text-xs text-[#f5efe6]/45">
        Summaries of public Google reviews.
      </p>
    </section>
  )
}
