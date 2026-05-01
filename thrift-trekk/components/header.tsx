'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { BRAND_NAME, NAVIGATION } from '@/lib/constants'
import { Marquee } from '@/components/effects/marquee'

const ANNOUNCEMENTS = [
  'FREE SHIPPING ABOVE ₹1499',
  'CODE: TREKK10 — 10% OFF',
  'NEW DROP EVERY FRIDAY',
  'MADE IN INDIA',
  'NO RESTOCKS. EVER.',
]

export function Header() {
  const { itemCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Announcement ticker */}
      <div className="w-full bg-primary text-primary-foreground py-2 border-b border-foreground/10">
        <Marquee speed="normal">
          {ANNOUNCEMENTS.concat(ANNOUNCEMENTS).map((text, i) => (
            <span
              key={i}
              className="font-mono text-[11px] tracking-[0.18em] uppercase font-bold px-8 flex items-center gap-8"
            >
              {text}
              <span aria-hidden className="inline-block w-1.5 h-1.5 bg-primary-foreground rotate-45" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
          scrolled
            ? 'bg-background/85 backdrop-blur-xl border-b border-border'
            : 'bg-background border-b border-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-xl md:text-2xl tracking-tight uppercase leading-none flex items-center gap-2 group"
          >
            <span className="inline-block w-2 h-2 bg-primary group-hover:rotate-180 transition-transform duration-500" />
            {BRAND_NAME}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-xs tracking-[0.2em] uppercase text-foreground/70 hover:text-foreground link-underline transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="relative group flex items-center gap-2 border border-foreground/20 hover:border-primary hover:text-primary px-3 md:px-4 py-2 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={16} strokeWidth={2.4} />
              <span className="hidden sm:inline font-mono text-[11px] tracking-[0.2em] uppercase">
                Bag
              </span>
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-mono font-bold rounded-none h-5 min-w-5 px-1 flex items-center justify-center border border-background"
                  >
                    {itemCount > 99 ? '99+' : itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 border border-foreground/20 hover:border-primary hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden border-t border-border bg-background overflow-hidden"
            >
              <div className="px-4 py-6 space-y-1">
                {NAVIGATION.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-3 px-2 font-display text-3xl uppercase tracking-tight border-b border-border hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
