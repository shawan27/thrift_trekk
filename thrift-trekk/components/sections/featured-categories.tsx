'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Reveal, RevealText } from '@/components/effects/reveal'
import { TiltCard } from '@/components/effects/tilt-card'

const categories = [
  { number: '01', name: 'Baggy Fit', sub: 'Heavy & loose', code: 'BG-01' },
  { number: '02', name: 'Wide Leg', sub: 'Statement silhouette', code: 'WL-02' },
  { number: '03', name: 'Cargo', sub: 'Utility coded', code: 'CG-03' },
  { number: '04', name: 'Slim Fit', sub: 'Sharp & modern', code: 'SF-04' },
  { number: '05', name: 'Oversized', sub: 'Skater proportions', code: 'OS-05' },
  { number: '06', name: 'Custom', sub: 'Made to your spec', code: 'CT-06' },
]

export function FeaturedCategoriesSection() {
  return (
    <section className="relative w-full bg-background text-foreground py-20 md:py-28 border-b border-border">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-20">
          <div>
            <Reveal>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 flex items-center gap-2">
                <span className="inline-block w-6 h-px bg-primary" />
                Section / 02 — Categories
              </p>
            </Reveal>
            <h2 className="text-huge font-display text-pretty">
              <RevealText text="Pick your" />
              <br />
              <RevealText text="silhouette." className="text-primary italic" delay={0.1} />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="text-base md:text-lg text-muted-foreground max-w-sm leading-snug">
              Six fits, zero filler. Each cut is engineered for the way real
              people move — through cities, parties, and everything in between.
            </p>
          </Reveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {categories.map((cat, i) => (
            <Reveal key={cat.code} delay={i * 0.05} y={30}>
              <TiltCard intensity={4} className="h-full">
                <Link
                  href="/shop"
                  className="group relative bg-background hover:bg-primary hover:text-primary-foreground transition-colors duration-300 p-6 md:p-8 h-full flex flex-col justify-between min-h-[280px] md:min-h-[340px] overflow-hidden"
                >
                  {/* Code + number row */}
                  <div className="flex items-start justify-between font-mono text-[10px] tracking-[0.2em] uppercase">
                    <span className="text-muted-foreground group-hover:text-primary-foreground/70 transition-colors">
                      {cat.code}
                    </span>
                    <span className="text-foreground/40 group-hover:text-primary-foreground/60 transition-colors">
                      [ {cat.number} / 06 ]
                    </span>
                  </div>

                  {/* Big number */}
                  <div className="font-display text-[6rem] md:text-[8rem] leading-none -tracking-[0.04em] text-foreground/8 group-hover:text-primary-foreground/20 absolute -bottom-4 right-4 select-none transition-colors">
                    {cat.number}
                  </div>

                  {/* Title */}
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ x: 0 }}
                      className="flex items-center gap-3 mb-2"
                    >
                      <h3 className="font-display text-3xl md:text-5xl uppercase tracking-tight leading-none">
                        {cat.name}
                      </h3>
                      <ArrowUpRight
                        size={28}
                        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        strokeWidth={2.5}
                      />
                    </motion.div>
                    <p className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground group-hover:text-primary-foreground/80 transition-colors">
                      {cat.sub}
                    </p>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
