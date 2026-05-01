'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { products, categories, colors, sizes } from '@/lib/products'
import { Reveal, RevealText } from '@/components/effects/reveal'
import { Marquee } from '@/components/effects/marquee'
import { X, SlidersHorizontal } from 'lucide-react'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [sortBy, setSortBy] = useState('newest')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory)
    if (selectedColor) result = result.filter((p) => p.colors.includes(selectedColor))
    if (selectedSize) result = result.filter((p) => p.sizes.includes(selectedSize))
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price)
    else if (sortBy === 'newest') result.reverse()

    return result
  }, [selectedCategory, selectedColor, selectedSize, priceRange, sortBy])

  const activeFilters = [selectedCategory, selectedColor, selectedSize].filter(Boolean).length

  const handleResetFilters = () => {
    setSelectedCategory(null)
    setSelectedColor(null)
    setSelectedSize(null)
    setPriceRange([0, 5000])
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Page header */}
      <section className="border-b border-border">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-12 md:pt-20 pb-10 md:pb-16">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4 flex items-center gap-2">
              <span className="inline-block w-6 h-px bg-primary" />
              Index / Shop the catalog
            </p>
          </Reveal>
          <h1 className="text-huge font-display">
            <RevealText text="The" />{' '}
            <RevealText text="catalog." className="text-primary italic" delay={0.1} />
          </h1>
          <Reveal delay={0.25}>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mt-6">
              {filteredProducts.length} pieces in rotation
            </p>
          </Reveal>
        </div>

        {/* Marquee divider */}
        <div className="bg-primary text-primary-foreground py-3 border-y border-foreground">
          <Marquee speed="fast">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="font-mono text-[11px] tracking-[0.2em] uppercase font-bold px-6 flex items-center gap-6"
              >
                Drop 06 live
                <span aria-hidden className="inline-block w-1.5 h-1.5 bg-primary-foreground rotate-45" />
                Sizes 28–36
                <span aria-hidden className="inline-block w-1.5 h-1.5 bg-primary-foreground rotate-45" />
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          {/* Filters - desktop */}
          <aside className="hidden md:block md:col-span-3">
            <div className="border border-border bg-card p-6 sticky top-32">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-border">
                <h2 className="font-display text-xl uppercase tracking-tight">Filters</h2>
                {activeFilters > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary hover:text-foreground transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>

              <FilterGroup label="Fit Type">
                {categories.map((cat) => (
                  <FilterChip
                    key={cat}
                    active={selectedCategory === cat}
                    onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  >
                    {cat}
                  </FilterChip>
                ))}
              </FilterGroup>

              <FilterGroup label="Color">
                {colors.map((color) => (
                  <FilterChip
                    key={color}
                    active={selectedColor === color}
                    onClick={() => setSelectedColor(selectedColor === color ? null : color)}
                  >
                    {color}
                  </FilterChip>
                ))}
              </FilterGroup>

              <FilterGroup label="Size">
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                      className={`w-10 h-10 font-mono text-xs border transition-colors ${
                        selectedSize === size
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border hover:border-primary hover:text-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </FilterGroup>

              <div>
                <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                  Price (₹)
                </h3>
                <div className="flex gap-2 mb-2">
                  <input
                    type="number"
                    min={0}
                    max={5000}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full bg-input border border-border px-3 py-2 font-mono text-xs focus:outline-none focus:border-primary"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    min={0}
                    max={5000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full bg-input border border-border px-3 py-2 font-mono text-xs focus:outline-none focus:border-primary"
                    placeholder="Max"
                  />
                </div>
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                  ₹{priceRange[0]} — ₹{priceRange[1]}
                </p>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="md:col-span-9">
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 mb-8 md:mb-10">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="md:hidden flex items-center justify-center gap-2 bg-foreground text-background px-4 py-3 font-mono text-xs tracking-[0.2em] uppercase font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <SlidersHorizontal size={14} />
                Filters {activeFilters > 0 && `(${activeFilters})`}
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="md:ml-auto bg-card border border-border px-4 py-3 font-mono text-xs tracking-[0.18em] uppercase focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="newest">Sort: Newest</option>
                <option value="price-low">Sort: Low → High</option>
                <option value="price-high">Sort: High → Low</option>
              </select>
            </div>

            {/* Mobile filters drawer */}
            {showMobileFilters && (
              <div className="md:hidden bg-card border border-border p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-display text-xl uppercase">Filters</h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-1 hover:text-primary transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <FilterGroup label="Fit Type">
                  {categories.map((cat) => (
                    <FilterChip
                      key={cat}
                      active={selectedCategory === cat}
                      onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                    >
                      {cat}
                    </FilterChip>
                  ))}
                </FilterGroup>

                <FilterGroup label="Color">
                  {colors.map((color) => (
                    <FilterChip
                      key={color}
                      active={selectedColor === color}
                      onClick={() => setSelectedColor(selectedColor === color ? null : color)}
                    >
                      {color}
                    </FilterChip>
                  ))}
                </FilterGroup>

                <FilterGroup label="Size">
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                        className={`w-10 h-10 font-mono text-xs border transition-colors ${
                          selectedSize === size
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-border hover:border-primary hover:text-primary'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </FilterGroup>

                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full mt-4 bg-primary text-primary-foreground py-3 font-mono text-xs tracking-[0.2em] uppercase font-bold hover:bg-foreground hover:text-background transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            )}

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-border">
                <p className="font-display text-3xl uppercase mb-2">No matches.</p>
                <p className="font-mono text-xs tracking-[0.18em] uppercase text-muted-foreground mb-8">
                  Try loosening up the filters
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-primary text-primary-foreground px-7 py-3 font-mono text-xs tracking-[0.2em] uppercase font-bold hover:bg-foreground hover:text-background transition-colors"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 pb-6 border-b border-border last:border-0">
      <h3 className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
        {label}
      </h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 font-mono text-[11px] tracking-[0.15em] uppercase border transition-colors ${
        active
          ? 'bg-primary text-primary-foreground border-primary'
          : 'border-border text-foreground/80 hover:border-primary hover:text-primary'
      }`}
    >
      {children}
    </button>
  )
}
