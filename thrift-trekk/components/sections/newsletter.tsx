'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Reveal, RevealText } from '@/components/effects/reveal'
import { Marquee } from '@/components/effects/marquee'
import { Magnetic } from '@/components/effects/magnetic'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <section className="relative w-full bg-primary text-primary-foreground py-20 md:py-32 border-b-2 border-foreground overflow-hidden">
      {/* Top deco marquee */}
      <div className="absolute top-0 left-0 right-0 border-b-2 border-primary-foreground py-3 bg-primary">
        <Marquee speed="fast">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="font-mono text-[11px] tracking-[0.2em] uppercase font-bold px-6 flex items-center gap-6"
            >
              Join the trekk
              <span aria-hidden className="inline-block w-1.5 h-1.5 bg-primary-foreground rotate-45" />
              Drops first
              <span aria-hidden className="inline-block w-1.5 h-1.5 bg-primary-foreground rotate-45" />
              Subscriber-only fits
              <span aria-hidden className="inline-block w-1.5 h-1.5 bg-primary-foreground rotate-45" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 mt-8">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="md:col-span-7">
            <Reveal>
              <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                <span className="inline-block w-6 h-px bg-primary-foreground" />
                Section / 07 — Mailing list
              </p>
            </Reveal>
            <h2 className="text-massive font-display leading-[0.85]">
              <RevealText text="GET IT" />
              <br />
              <RevealText text="FIRST." delay={0.12} />
            </h2>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={0.2}>
              <p className="text-lg md:text-xl leading-snug text-pretty mb-8 max-w-md">
                No spam. Just first dibs on every drop, subscriber-only colorways
                and the occasional unhinged thought from the team.
              </p>

              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-0 border-2 border-primary-foreground bg-primary-foreground/5"
              >
                <input
                  type="email"
                  placeholder="your.email@somewhere.cool"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-transparent placeholder:text-primary-foreground/50 px-5 py-4 font-mono text-sm focus:outline-none focus:bg-primary-foreground/10"
                />
                <Magnetic strength={0.25}>
                  <button
                    type="submit"
                    className="group flex items-center justify-center gap-2 bg-primary-foreground text-primary px-7 py-4 font-mono text-xs tracking-[0.2em] uppercase font-bold w-full sm:w-auto hover:bg-foreground transition-colors"
                  >
                    {subscribed ? (
                      <motion.span
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <Check size={16} strokeWidth={3} /> You&apos;re in
                      </motion.span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Subscribe
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </span>
                    )}
                  </button>
                </Magnetic>
              </form>

              <p className="font-mono text-[10px] tracking-[0.18em] uppercase mt-4 text-primary-foreground/70">
                Unsubscribe in 1 click. We don&apos;t do desperate.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
