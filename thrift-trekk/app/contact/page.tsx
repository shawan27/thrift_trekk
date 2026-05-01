'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BRAND_INFO, WHATSAPP_URL } from '@/lib/constants'
import { Mail, Phone, MapPin, MessageCircle, ArrowRight, Check } from 'lucide-react'
import { Reveal, RevealText } from '@/components/effects/reveal'
import { Magnetic } from '@/components/effects/magnetic'

const FAQS = [
  { q: 'How long does shipping take?', a: 'Shipped in 2–3 business days. Standard delivery 5–7 business days. Express options in select cities.' },
  { q: 'What is your return policy?', a: '30-day returns on unworn, untagged items. Easy and judgement-free.' },
  { q: 'Do you offer exchanges?', a: 'Yes — free size/color exchanges within 30 days. Just hit us up on WhatsApp.' },
  { q: 'Payment methods?', a: 'COD, all major cards, UPI, and WhatsApp orders. Razorpay-secured checkout.' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="border-b border-border">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-12 md:pb-20">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-primary" />
              Contact
            </p>
          </Reveal>
          <h1 className="text-huge font-display leading-[0.9]">
            <RevealText text="Slide" /> <RevealText text="into" delay={0.08} />
            <br />
            <RevealText text="our DMs." className="text-primary italic" delay={0.16} />
          </h1>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Form */}
          <div>
            <Reveal>
              <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight mb-2">
                Send a message.
              </h2>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8">
                We reply in &lt; 24 hrs
              </p>
            </Reveal>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-input border border-border px-5 py-4 font-mono text-sm focus:outline-none focus:border-primary placeholder:text-muted-foreground"
              />
              <input
                name="email"
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-input border border-border px-5 py-4 font-mono text-sm focus:outline-none focus:border-primary placeholder:text-muted-foreground"
              />
              <input
                name="subject"
                placeholder="Subject line"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-input border border-border px-5 py-4 font-mono text-sm focus:outline-none focus:border-primary placeholder:text-muted-foreground"
              />
              <textarea
                name="message"
                placeholder="What's on your mind?"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-input border border-border px-5 py-4 font-mono text-sm focus:outline-none focus:border-primary resize-none placeholder:text-muted-foreground"
              />
              <Magnetic strength={0.2}>
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-3 w-full bg-primary text-primary-foreground py-5 font-mono text-xs tracking-[0.2em] uppercase font-bold hover:bg-foreground hover:text-background transition-colors"
                >
                  {submitted ? (
                    <span className="flex items-center gap-2">
                      <Check size={14} strokeWidth={3} /> Sent
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send it
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                  )}
                </button>
              </Magnetic>
            </form>
          </div>

          {/* Info */}
          <div>
            <Reveal>
              <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight mb-8">
                Or just reach out.
              </h2>
            </Reveal>

            <div className="space-y-px bg-border border border-border">
              {[
                { I: Phone, t: 'Phone', v: BRAND_INFO.phone, href: `tel:${BRAND_INFO.phone}` },
                { I: Mail, t: 'Email', v: BRAND_INFO.email, href: `mailto:${BRAND_INFO.email}` },
                { I: MessageCircle, t: 'WhatsApp', v: 'Chat with us live', href: WHATSAPP_URL },
                { I: MapPin, t: 'Studio', v: BRAND_INFO.address, href: '#' },
              ].map(({ I, t, v, href }) => (
                <a
                  key={t}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 bg-background hover:bg-card transition-colors p-5"
                >
                  <div className="p-2.5 border border-border group-hover:border-primary group-hover:text-primary transition-colors">
                    <I size={16} strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                      {t}
                    </p>
                    <p className="font-display text-lg uppercase tracking-tight leading-tight group-hover:text-primary transition-colors">
                      {v}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mt-2"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-border">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-16 md:py-20">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-primary" />
              FAQ
            </p>
          </Reveal>
          <h2 className="text-huge font-display mb-12">
            <RevealText text="Common" /> <RevealText text="questions." delay={0.1} className="text-primary italic" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {FAQS.map((f, i) => (
              <div key={i} className="bg-background p-6 md:p-8 hover:bg-card transition-colors">
                <h3 className="font-display text-2xl uppercase tracking-tight mb-3">{f.q}</h3>
                <p className="text-foreground/80 leading-snug">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
