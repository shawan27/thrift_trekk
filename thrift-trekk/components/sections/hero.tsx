'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { useRef } from 'react'
import { Magnetic } from '@/components/effects/magnetic'
import { Marquee } from '@/components/effects/marquee'

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      className="relative w-full bg-background text-foreground overflow-hidden border-b border-border"
    >
      {/* Top spec line */}
      <div className="border-b border-border">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-primary animate-[blink_1.2s_steps(2)_infinite]" />
            DROP/06 — LIVE NOW
          </span>
          <span className="hidden sm:inline">EST. 2023 / IND</span>
          <span>VOL.04</span>
        </div>
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative max-w-[1600px] mx-auto px-4 md:px-8 pt-12 md:pt-20 pb-8 md:pb-12"
      >
        {/* Main monstrous headline */}
        <div className="relative">
          <h1 className="text-massive font-display text-pretty">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="block overflow-hidden"
            >
              <span className="block">DECIDE</span>
            </motion.span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                THE <span className="text-primary italic">FASHION</span>
                <span className="inline-block ml-3 align-middle h-[0.7em] w-[0.7em] bg-primary translate-y-[-0.05em] rotate-12" />
              </motion.span>
            </span>
          </h1>
        </div>

        {/* Sub copy + CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-10 md:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="md:col-span-5 md:col-start-1"
          >
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
              [ Manifesto / 01 ]
            </p>
            <p className="text-lg md:text-xl text-foreground/85 leading-snug text-pretty max-w-md">
              Heavy denim. Wide silhouettes. Built for the kids who don&apos;t
              ask permission. Worn loud, loved louder — no restocks, no apologies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="md:col-span-6 md:col-start-7 flex flex-col sm:flex-row gap-3 md:gap-4 md:justify-end md:items-end"
          >
            <Magnetic strength={0.3}>
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 bg-primary text-primary-foreground font-mono text-xs tracking-[0.2em] uppercase font-bold px-7 py-5 hover:bg-foreground hover:text-background transition-colors"
              >
                Shop the drop
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </Magnetic>
            <Magnetic strength={0.3}>
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 border border-foreground/40 text-foreground font-mono text-xs tracking-[0.2em] uppercase font-bold px-7 py-5 hover:border-primary hover:text-primary transition-colors"
              >
                The story
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        {/* Stats / spec strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-14 md:mt-24 grid grid-cols-2 md:grid-cols-4 border-t border-border"
        >
          {[
            { k: '14oz', v: 'Pure denim weight' },
            { k: '100%', v: 'Cotton, no shortcuts' },
            { k: '50+', v: 'Cities shipped' },
            { k: '4.9★', v: 'Verified reviews' },
          ].map((s, i) => (
            <div
              key={s.k}
              className={`p-5 md:p-7 ${
                i !== 3 ? 'md:border-r border-border' : ''
              } ${i < 2 ? 'border-b md:border-b-0 border-border' : ''} ${
                i % 2 === 0 ? 'border-r md:border-r border-border' : ''
              }`}
            >
              <div className="font-display text-4xl md:text-6xl leading-none text-primary">
                {s.k}
              </div>
              <div className="font-mono text-[10px] md:text-xs tracking-[0.18em] uppercase text-muted-foreground mt-2">
                {s.v}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <div className="hidden md:flex items-center gap-3 mt-10 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          <ArrowDown size={14} className="animate-bounce" />
          Scroll to enter
        </div>
      </motion.div>

      {/* Bottom marquee band */}
      <div className="bg-primary text-primary-foreground py-5 md:py-7 border-y-2 border-foreground">
        <Marquee speed="fast">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-5xl md:text-7xl uppercase tracking-tight px-6 flex items-center gap-6"
            >
              Built loud
              <span aria-hidden className="inline-block w-4 h-4 bg-primary-foreground rotate-45" />
              Worn louder
              <span aria-hidden className="inline-block w-4 h-4 border-2 border-primary-foreground" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
