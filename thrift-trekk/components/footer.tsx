'use client'

import Link from 'next/link'
import { BRAND_NAME, BRAND_INFO, FOOTER_LINKS } from '@/lib/constants'
import { Instagram, MessageCircle, Twitter, ArrowUpRight } from 'lucide-react'
import { Marquee } from '@/components/effects/marquee'

export function Footer() {
  return (
    <footer className="w-full bg-background text-foreground border-t border-border">
      {/* Top tagline marquee */}
      <div className="border-y border-border py-4 md:py-6 bg-card overflow-hidden">
        <Marquee speed="slow">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-3xl md:text-5xl uppercase tracking-tight px-6 flex items-center gap-6"
            >
              Decide the fashion
              <span aria-hidden className="inline-block w-3 h-3 bg-primary rotate-45" />
              No restocks
              <span aria-hidden className="inline-block w-3 h-3 border-2 border-primary" />
              <span className="text-primary italic">Built loud</span>
              <span aria-hidden className="inline-block w-3 h-3 bg-primary rotate-45" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-5">
            <Link href="/" className="font-display text-3xl md:text-4xl uppercase leading-none flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-primary" />
              {BRAND_NAME}
            </Link>
            <p className="font-mono text-xs tracking-[0.18em] uppercase text-muted-foreground mt-3">
              [ {BRAND_INFO.tagline} ]
            </p>
            <p className="text-sm md:text-base text-foreground/70 mt-6 leading-relaxed max-w-sm text-pretty">
              {BRAND_INFO.description}. We make heavy denim for the kids who don&apos;t
              ask permission.
            </p>

            <div className="flex gap-2 mt-8">
              {[
                { Icon: Instagram, href: 'https://instagram.com/thrifttrekk', label: 'Instagram' },
                { Icon: MessageCircle, href: 'https://wa.me/917306790392', label: 'WhatsApp' },
                { Icon: Twitter, href: 'https://twitter.com/thrifttrekk', label: 'Twitter' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-border hover:border-primary hover:text-primary transition-colors"
                  aria-label={label}
                >
                  <Icon size={16} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {/* Customer service */}
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-5">
              [ Service ]
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.customer.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 hover:text-primary link-underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-5">
              [ Company ]
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 hover:text-primary link-underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-3">
            <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-5">
              [ Get at us ]
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${BRAND_INFO.email}`}
                  className="group flex items-start gap-2 text-foreground/85 hover:text-primary transition-colors"
                >
                  <span>{BRAND_INFO.email}</span>
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity mt-1"
                  />
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BRAND_INFO.phone}`}
                  className="group flex items-start gap-2 text-foreground/85 hover:text-primary transition-colors"
                >
                  <span>{BRAND_INFO.phone}</span>
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity mt-1"
                  />
                </a>
              </li>
              <li className="pt-2 text-xs text-muted-foreground leading-relaxed">
                {BRAND_INFO.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-8 border-t border-border font-mono text-[10px] md:text-xs tracking-[0.18em] uppercase text-muted-foreground">
          <p>© {new Date().getFullYear()} {BRAND_NAME} — All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/policies" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/policies" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/policies" className="hover:text-primary transition-colors">
              Returns
            </Link>
          </div>
          <p className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-primary animate-[blink_1.2s_steps(2)_infinite]" />
            Site v.04 — Built in IND
          </p>
        </div>
      </div>

      {/* Massive brand text */}
      <div className="border-t border-border overflow-hidden">
        <div
          className="font-display text-foreground/[0.06] uppercase select-none leading-none whitespace-nowrap text-center py-4 md:py-8"
          style={{ fontSize: 'clamp(5rem, 22vw, 22rem)', letterSpacing: '-0.04em' }}
        >
          {BRAND_NAME}
        </div>
      </div>
    </footer>
  )
}
