'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Marquee } from '@/components/effects/marquee'
import { Reveal } from '@/components/effects/reveal'

const LINES = [
  'WE DON\'T DO TRENDS.',
  'WE MAKE FITS THAT OUTLAST THE TIMELINE.',
  'NO INFLUENCERS. NO GIMMICKS.',
  'JUST DENIM HEAVY ENOUGH TO MEAN SOMETHING.',
]

export function ManifestoSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section
      ref={ref}
      className="relative w-full bg-card text-foreground py-24 md:py-40 border-b border-border overflow-hidden"
    >
      {/* Floating background number */}
      <motion.div
        style={{ x }}
        aria-hidden
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-0 right-0 font-display text-foreground/[0.04] leading-none whitespace-nowrap select-none"
      >
        <span style={{ fontSize: 'clamp(12rem, 30vw, 40rem)', letterSpacing: '-0.05em' }}>
          MANIFESTO/05
        </span>
      </motion.div>

      <div className="relative max-w-[1600px] mx-auto px-4 md:px-8">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-primary" />
            Section / 05 — What we&apos;re about
          </p>
        </Reveal>

        <div className="space-y-2 md:space-y-3">
          {LINES.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h3
                initial={{ y: '110%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`text-big font-display text-pretty ${
                  i === 1 || i === 3 ? 'text-primary' : ''
                } ${i % 2 === 1 ? 'md:pl-[10vw]' : ''}`}
              >
                {line}
              </motion.h3>
            </div>
          ))}
        </div>

        {/* Lower marquee */}
        <div className="mt-16 md:mt-24 -mx-4 md:-mx-8">
          <Marquee speed="slow" reverse>
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="font-display text-5xl md:text-8xl uppercase tracking-tight px-6 flex items-center gap-6 text-foreground/30"
              >
                Decide your fit
                <span aria-hidden className="inline-block w-4 h-4 bg-primary" />
                Decide your fit
                <span aria-hidden className="inline-block w-4 h-4 border-2 border-primary" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
