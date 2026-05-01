import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { Reveal, RevealText } from '@/components/effects/reveal'
import { ArrowRight } from 'lucide-react'

const VALUES = [
  { n: '01', t: 'Quality', d: 'Heavyweight cotton, real stitching, no plastic gimmicks. Built to outlast trends.' },
  { n: '02', t: 'No Hype', d: 'No fake drops. No bot resellers. We make enough for everyone who actually wants it.' },
  { n: '03', t: 'Sustainable', d: 'Lower waste runs. Recycled water in our wash. Honest about what we don\'t know yet.' },
  { n: '04', t: 'Local', d: 'Designed and stitched in India. Our team gets paid right because that\'s the point.' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-16 md:pt-28 pb-16 md:pb-24">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6 flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-primary" />
              About / Who we are
            </p>
          </Reveal>
          <h1 className="text-massive font-display leading-[0.85]">
            <RevealText text="We make" />
            <br />
            <RevealText text="denim that" delay={0.1} />
            <br />
            <span className="text-primary italic">
              <RevealText text="speaks." delay={0.2} />
            </span>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="border-b border-border">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
              [ Section 01 — Story ]
            </p>
          </div>
          <div className="md:col-span-7 md:col-start-6 space-y-6">
            <Reveal>
              <h2 className="text-big font-display leading-[0.95]">
                Started in a 200 sqft studio. <span className="text-primary italic">Still feel like that.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-lg md:text-xl text-foreground/85 leading-snug max-w-2xl">
                THRIFT TREKK started in 2023 because the founders couldn&apos;t find
                jeans that fit right, weren&apos;t made of polyester, and didn&apos;t cost
                a kidney. So we made them. Heavy. Loose. Honest.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Today we ship to 50+ cities across India. We don&apos;t do influencer
                campaigns. We don&apos;t restock. Each drop is small, made well, and
                gone before it can become a trend.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-border">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-20 md:py-28">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-primary" />
              Section 02 — Values
            </p>
          </Reveal>
          <h2 className="text-huge font-display mb-16">
            <RevealText text="What we" /> <RevealText text="actually" delay={0.1} className="text-primary italic" />{' '}
            <RevealText text="believe." delay={0.2} />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {VALUES.map((v) => (
              <div
                key={v.n}
                className="bg-background p-8 md:p-10 hover:bg-card transition-colors"
              >
                <div className="font-mono text-xs tracking-[0.2em] uppercase text-primary mb-4">
                  / {v.n}
                </div>
                <h3 className="font-display text-3xl md:text-4xl uppercase tracking-tight mb-4">
                  {v.t}
                </h3>
                <p className="text-base md:text-lg text-foreground/80 leading-snug max-w-md">
                  {v.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground border-b-2 border-foreground">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-20 md:py-28 text-center">
          <h2 className="text-huge font-display mb-8 leading-[0.9]">
            Join the trekk.
          </h2>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 bg-primary-foreground text-primary font-mono text-xs tracking-[0.2em] uppercase font-bold px-8 py-5 hover:bg-foreground transition-colors"
          >
            Shop the drop
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
