'use client'

import { REVIEWS } from '@/lib/constants'
import { Star, Quote } from 'lucide-react'
import { Reveal, RevealText } from '@/components/effects/reveal'
import { Marquee } from '@/components/effects/marquee'

const HANDLES = ['@arjun.k', '@priya.m', '@rahul.s', '@neha.p']

export function ReviewsSection() {
  // Build a doubled list for visual richness
  const all = [...REVIEWS, ...REVIEWS]

  return (
    <section className="w-full bg-background text-foreground py-20 md:py-28 border-b border-border overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <div>
            <Reveal>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 flex items-center gap-2">
                <span className="inline-block w-6 h-px bg-primary" />
                Section / 06 — Real ones
              </p>
            </Reveal>
            <h2 className="text-huge font-display">
              <RevealText text="The streets" />
              <br />
              <RevealText text="speak." className="text-primary italic" delay={0.1} />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <div className="flex flex-col items-start md:items-end gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill="var(--primary)"
                    className="text-primary"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
                4.9 / 5 — 2,400+ verified
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Marquee row 1 */}
      <Marquee speed="slow" pauseOnHover className="mb-4">
        {all.map((review, i) => (
          <div
            key={`r1-${i}`}
            className="w-[320px] md:w-[420px] shrink-0 mx-3 bg-card border border-border p-6 md:p-8 hover:border-primary transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                {[...Array(review.rating)].map((_, k) => (
                  <Star
                    key={k}
                    size={14}
                    fill="var(--primary)"
                    className="text-primary"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <Quote className="text-primary" size={20} />
            </div>
            <p className="text-base md:text-lg leading-snug text-pretty mb-6 min-h-[6rem]">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <p className="font-display text-lg uppercase tracking-tight leading-none">
                  {review.name}
                </p>
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-1">
                  {HANDLES[(i % HANDLES.length)]}
                </p>
              </div>
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase bg-primary text-primary-foreground px-2 py-1">
                Verified
              </span>
            </div>
          </div>
        ))}
      </Marquee>

      {/* Marquee row 2 — reverse */}
      <Marquee reverse speed="slow" pauseOnHover>
        {all
          .slice()
          .reverse()
          .map((review, i) => (
            <div
              key={`r2-${i}`}
              className="w-[320px] md:w-[420px] shrink-0 mx-3 bg-background border border-border p-6 md:p-8 hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, k) => (
                    <Star
                      key={k}
                      size={14}
                      fill="var(--primary)"
                      className="text-primary"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <Quote className="text-primary" size={20} />
              </div>
              <p className="text-base md:text-lg leading-snug text-pretty mb-6 min-h-[6rem]">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="font-display text-lg uppercase tracking-tight leading-none">
                    {review.name}
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-1">
                    {HANDLES[(i % HANDLES.length)]}
                  </p>
                </div>
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase border border-foreground/40 px-2 py-1">
                  Verified
                </span>
              </div>
            </div>
          ))}
      </Marquee>
    </section>
  )
}
