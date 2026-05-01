'use client'

import { Truck, ShieldCheck, RotateCcw, Lock } from 'lucide-react'
import { Reveal } from '@/components/effects/reveal'

const BADGES = [
  { Icon: Truck, title: 'Free shipping', sub: 'On orders ₹1499+' },
  { Icon: ShieldCheck, title: '100% authentic', sub: 'No knock-offs ever' },
  { Icon: RotateCcw, title: '30-day returns', sub: 'Easy & no questions' },
  { Icon: Lock, title: 'Secure checkout', sub: 'Razorpay protected' },
]

export function TrustBadgesSection() {
  return (
    <section className="w-full bg-background border-b border-border">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {BADGES.map(({ Icon, title, sub }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="bg-background p-6 md:p-8 flex items-start gap-4 group hover:bg-card transition-colors h-full">
                <div className="p-2.5 border border-border group-hover:border-primary group-hover:text-primary transition-colors">
                  <Icon size={18} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-display text-lg md:text-2xl uppercase tracking-tight leading-none mb-1">
                    {title}
                  </h3>
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                    {sub}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
