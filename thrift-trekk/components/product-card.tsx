'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Heart, Check } from 'lucide-react'
import { Product } from '@/lib/products'
import { useCart } from '@/lib/cart-context'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [wishlist, setWishlist] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [hovered, setHovered] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      productId: product.id,
      quantity: 1,
      size: selectedSize,
      price: product.price,
      name: product.name,
      image: product.image,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 1800)
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col h-full border border-border bg-card hover:border-primary transition-colors"
    >
      <Link href={`/product/${product.id}`} className="flex flex-col">
        {/* Image container */}
        <div className="relative bg-secondary overflow-hidden aspect-[4/5]">
          <motion.div
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            />
          </motion.div>

          {/* Grid overlay on hover */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage:
                'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              opacity: hovered ? 0.08 : 0,
            }}
          />

          {/* Tag sticker */}
          {product.tag && (
            <span
              className="sticker top-4 left-4"
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
              {product.tag === 'Bestseller' ? '★ TOP SELLER' : product.tag === 'New' ? '✦ JUST IN' : '— SALE —'}
            </span>
          )}

          {/* Discount tag */}
          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-foreground text-background font-mono text-[10px] tracking-[0.15em] uppercase px-2.5 py-1.5 font-bold">
              -{discount}%
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setWishlist(!wishlist)
            }}
            className="absolute bottom-4 right-4 bg-background/90 backdrop-blur border border-border hover:border-primary p-2.5 transition-all duration-200 active:scale-90"
            aria-label="Wishlist"
          >
            <Heart
              size={16}
              fill={wishlist ? 'var(--primary)' : 'none'}
              className={wishlist ? 'text-primary' : 'text-foreground'}
              strokeWidth={2}
            />
          </button>

          {/* Slide-up size picker on hover */}
          <motion.div
            initial={false}
            animate={{ y: hovered ? 0 : '110%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-primary px-3 py-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                Size
              </span>
              <div className="flex gap-1">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={(e) => {
                      e.preventDefault()
                      setSelectedSize(s)
                    }}
                    className={`w-8 h-8 font-mono text-xs border transition-colors ${
                      selectedSize === s
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border text-foreground/70 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 md:p-5 flex flex-col gap-3 flex-1">
        <Link href={`/product/${product.id}`} className="flex flex-col gap-1.5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg md:text-xl uppercase leading-tight tracking-tight group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
            {product.fit} / {product.fabric.split(',')[0]}
          </p>
        </Link>

        <div className="flex items-end justify-between gap-3 mt-auto pt-2">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl md:text-3xl text-foreground">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="font-mono text-xs text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="relative flex items-center gap-2 bg-foreground text-background font-mono text-[11px] tracking-[0.18em] uppercase font-bold px-4 py-2.5 hover:bg-primary hover:text-primary-foreground transition-colors active:scale-95"
            aria-label="Add to bag"
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
                  <Check size={14} strokeWidth={3} /> Added
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <ShoppingBag size={14} strokeWidth={2.4} /> Cop
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
