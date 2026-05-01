'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { getProductById, products } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import { WHATSAPP_URL } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import { Check, Share2, ShoppingBag, Truck, RotateCcw, ShieldCheck, ChevronRight } from 'lucide-react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '@/components/effects/reveal'
import { Magnetic } from '@/components/effects/magnetic'

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = getProductById(productId)
  const { addItem } = useCart()

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || 28)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="max-w-[1600px] mx-auto px-4 py-28 text-center">
          <h1 className="text-huge font-display mb-6">Not found.</h1>
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-mono text-xs tracking-[0.2em] uppercase font-bold px-7 py-4 hover:bg-foreground hover:text-background transition-colors"
          >
            Back to shop
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  )

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      quantity,
      size: selectedSize,
      price: product.price,
      name: product.name,
      image: product.image,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 1800)
  }

  const whatsappMessage = `Hi, I'm interested in: ${product.name} (Size ${selectedSize}) x${quantity}. Price: ₹${product.price * quantity}.`

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-10">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-20">
          {/* Image */}
          <div className="md:sticky md:top-32 md:self-start">
            <div className="relative bg-card border border-border aspect-[4/5] overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.tag && (
                <span
                  className="sticker top-5 left-5"
                  style={{
                    background:
                      product.tag === 'Bestseller'
                        ? 'var(--primary)'
                        : product.tag === 'New'
                        ? 'var(--foreground)'
                        : '#ff3939',
                    color:
                      product.tag === 'New' ? 'var(--background)' : 'var(--primary-foreground)',
                  }}
                >
                  {product.tag === 'Bestseller'
                    ? '★ TOP SELLER'
                    : product.tag === 'New'
                    ? '✦ JUST IN'
                    : '— SALE —'}
                </span>
              )}
              {discount > 0 && (
                <div className="absolute top-5 right-5 bg-foreground text-background font-mono text-[10px] tracking-[0.15em] uppercase px-2.5 py-1.5 font-bold">
                  -{discount}%
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div>
            <Reveal>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                {product.category} / Drop 06
              </p>
            </Reveal>
            <h1 className="text-big font-display mb-6 leading-[0.95]">{product.name}</h1>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-display text-5xl">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="font-mono text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p className="text-base md:text-lg text-foreground/85 leading-snug mb-10 max-w-lg text-pretty">
              {product.description}
            </p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-px bg-border border border-border mb-10">
              {[
                { l: 'Fit', v: product.fit },
                { l: 'Fabric', v: product.fabric },
                { l: 'Stretch', v: product.stretch },
                { l: 'Care', v: product.care },
              ].map((s) => (
                <div key={s.l} className="bg-background p-4">
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                    {s.l}
                  </p>
                  <p className="font-mono text-sm">{s.v}</p>
                </div>
              ))}
            </div>

            {/* Size */}
            <div className="mb-8">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                Pick a size
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 font-mono text-sm border transition-colors ${
                      selectedSize === size
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border text-foreground hover:border-primary hover:text-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-10">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                Quantity
              </p>
              <div className="flex items-center border border-border w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  −
                </button>
                <span className="px-6 font-mono text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 mb-10">
              <Magnetic strength={0.15}>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-primary text-primary-foreground py-5 font-mono text-xs tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-3 hover:bg-foreground hover:text-background transition-colors"
                >
                  <AnimatePresence mode="wait">
                    {addedToCart ? (
                      <motion.span
                        key="added"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Check size={16} strokeWidth={3} /> Added to bag
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingBag size={16} strokeWidth={2.4} /> Add to bag — ₹
                        {(product.price * quantity).toLocaleString('en-IN')}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </Magnetic>
              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center border border-foreground/40 py-5 font-mono text-xs tracking-[0.2em] uppercase font-bold hover:border-primary hover:text-primary transition-colors"
              >
                Order via WhatsApp
              </a>
              <button className="w-full border border-border py-4 font-mono text-xs tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors">
                <Share2 size={14} />
                Share
              </button>
            </div>

            {/* Trust */}
            <div className="border-t border-border pt-8 space-y-4">
              {[
                { I: Truck, t: 'Free shipping on orders ₹1499+' },
                { I: RotateCcw, t: '30-day easy returns' },
                { I: ShieldCheck, t: 'Razorpay-secured checkout' },
              ].map(({ I, t }) => (
                <div key={t} className="flex items-center gap-3">
                  <I size={16} className="text-primary flex-shrink-0" strokeWidth={2} />
                  <p className="font-mono text-xs tracking-[0.15em] uppercase text-foreground/85">
                    {t}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-border pt-16 md:pt-20">
            <h2 className="text-huge font-display mb-12">
              You might <span className="text-primary italic">also dig.</span>
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((prod, i) => (
                <ProductCard key={prod.id} product={prod} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
