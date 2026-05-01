'use client'

import { ProductCard } from '@/components/product-card'
import { products } from '@/lib/products'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal, RevealText } from '@/components/effects/reveal'

export function BestsellersSection() {
  const bestsellers = products.filter((p) => p.tag === 'Bestseller').slice(0, 4)
  const fillers = products.filter((p) => p.tag !== 'Bestseller').slice(0, 4 - bestsellers.length)
  const display = [...bestsellers, ...fillers].slice(0, 4)

  return (
    <section className="w-full bg-background text-foreground py-20 md:py-28 border-b border-border">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <Reveal>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 flex items-center gap-2">
                <span className="inline-block w-6 h-px bg-primary" />
                Section / 03 — Hot list
              </p>
            </Reveal>
            <h2 className="text-huge font-display">
              <RevealText text="Top" />{' '}
              <RevealText text="sellers." className="text-primary italic" delay={0.1} />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <Link
              href="/shop"
              className="group hidden md:inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase font-bold border-b border-foreground/30 hover:border-primary hover:text-primary pb-1 transition-colors"
            >
              View all 24
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {display.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="text-center mt-12 md:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-mono text-xs tracking-[0.2em] uppercase font-bold px-7 py-4 hover:bg-foreground hover:text-background transition-colors"
          >
            View all bestsellers
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
