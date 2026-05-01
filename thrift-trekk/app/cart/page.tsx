'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useCart } from '@/lib/cart-context'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'
import { Reveal, RevealText } from '@/components/effects/reveal'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <div className="max-w-[1600px] w-full mx-auto px-4 md:px-8 py-20 md:py-28 flex-1">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-primary" />
              Your bag
            </p>
          </Reveal>
          <h1 className="text-huge font-display mb-12">
            <RevealText text="The bag" /> <RevealText text="is empty." className="text-primary italic" delay={0.1} />
          </h1>
          <div className="flex items-center gap-3">
            <ShoppingBag size={32} className="text-muted-foreground" />
            <p className="text-lg text-muted-foreground">Time to fix that.</p>
          </div>
          <Link
            href="/shop"
            className="mt-10 inline-flex items-center gap-3 bg-primary text-primary-foreground font-mono text-xs tracking-[0.2em] uppercase font-bold px-8 py-5 hover:bg-foreground hover:text-background transition-colors"
          >
            Browse the catalog
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const whatsappMessage = `Hi, I'd like to order:\n${items
    .map((item) => `• ${item.name} (Size ${item.size}) x${item.quantity}`)
    .join('\n')}\n\nTotal: ₹${total}\n\nPlease confirm availability.`

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="max-w-[1600px] w-full mx-auto px-4 md:px-8 py-12 md:py-16 flex-1">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 flex items-center gap-2">
            <span className="inline-block w-6 h-px bg-primary" />
            Your bag — {items.length} {items.length === 1 ? 'piece' : 'pieces'}
          </p>
        </Reveal>
        <h1 className="text-huge font-display mb-12 md:mb-16">
          <RevealText text="The" /> <RevealText text="bag." className="text-primary italic" delay={0.1} />
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="border border-border bg-card hover:border-primary transition-colors p-4 md:p-5 flex gap-4 md:gap-6"
              >
                <div className="relative w-20 md:w-28 h-24 md:h-32 bg-secondary overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display text-lg md:text-xl uppercase tracking-tight leading-tight">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeItem(item.productId, item.size)}
                      className="p-2 hover:text-primary transition-colors flex-shrink-0"
                      aria-label="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-4">
                    Size {item.size}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div className="flex items-center border border-border w-fit">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.size, Math.max(1, item.quantity - 1))
                        }
                        className="p-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-4 font-mono text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                        className="p-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label="Increase"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-display text-2xl text-foreground">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                      <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                        ₹{item.price.toLocaleString('en-IN')} ea.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-6">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase font-bold border-b border-foreground/30 hover:border-primary hover:text-primary pb-1 transition-colors"
              >
                <ArrowLeft
                  size={14}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Keep shopping
              </Link>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="border border-border bg-card p-6 md:p-7 sticky top-32">
              <h2 className="font-display text-2xl uppercase tracking-tight mb-6 pb-4 border-b border-border">
                Summary
              </h2>

              <div className="space-y-3 mb-6 font-mono text-xs tracking-[0.15em] uppercase">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-primary">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>₹0</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground">
                    Total
                  </span>
                  <span className="font-display text-4xl">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href="/checkout"
                  className="block w-full bg-primary text-primary-foreground py-4 font-mono text-xs tracking-[0.2em] uppercase font-bold text-center hover:bg-foreground hover:text-background transition-colors"
                >
                  Checkout →
                </Link>
                <a
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border border-border py-4 font-mono text-xs tracking-[0.2em] uppercase font-bold text-center hover:border-primary hover:text-primary transition-colors"
                >
                  Order via WhatsApp
                </a>
                <button
                  onClick={clearCart}
                  className="block w-full font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-destructive transition-colors mt-3"
                >
                  Clear bag
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
