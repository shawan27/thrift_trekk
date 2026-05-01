'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { products, categories, colors, sizes } from '@/lib/products';
import { X } from 'lucide-react';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState('newest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedColor) {
      result = result.filter(p => p.colors.includes(selectedColor));
    }

    if (selectedSize) {
      result = result.filter(p => p.sizes.includes(selectedSize));
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.reverse();
    }

    return result;
  }, [selectedCategory, selectedColor, selectedSize, priceRange, sortBy]);

  const activeFilters = [selectedCategory, selectedColor, selectedSize].filter(Boolean).length;

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSelectedColor(null);
    setSelectedSize(null);
    setPriceRange([0, 5000]);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-10 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Shop</h1>
          <p className="text-gray-600 font-medium">{filteredProducts.length} products available</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
          {/* Filters - Desktop */}
          <div className="hidden md:block">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-7 sticky top-28">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-lg">Filters</h2>
                {activeFilters > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs font-bold text-red-600 hover:text-red-700 uppercase tracking-wide"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-gray-900">Fit Type</h3>
                <div className="space-y-3">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                        className="w-4 h-4 rounded border-2 border-gray-300 cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-black transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-gray-900">Color</h3>
                <div className="space-y-3">
                  {colors.map(color => (
                    <label key={color} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedColor === color}
                        onChange={() => setSelectedColor(selectedColor === color ? null : color)}
                        className="w-4 h-4 rounded border-2 border-gray-300 cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-black transition-colors">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-gray-900">Size</h3>
                <div className="space-y-3">
                  {sizes.map(size => (
                    <label key={size} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedSize === size}
                        onChange={() => setSelectedSize(selectedSize === size ? null : size)}
                        className="w-4 h-4 rounded border-2 border-gray-300 cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-black transition-colors">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-gray-900">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      max="5000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      min="0"
                      max="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Max"
                    />
                  </div>
                  <p className="text-xs text-gray-600 font-medium">₹{priceRange[0]} — ₹{priceRange[1]}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="md:col-span-3">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 md:mb-10">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="md:hidden bg-black text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-900 transition-colors w-full"
              >
                Filters {activeFilters > 0 && `(${activeFilters})`}
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="md:ml-auto border-2 border-gray-300 rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black w-full md:w-auto"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Mobile Filters */}
            {showMobileFilters && (
              <div className="md:hidden bg-gray-50 border-2 border-gray-200 rounded-lg p-6 mb-8 animate-in slide-in-from-top-2">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">Filters</h3>
                  <button 
                    onClick={() => setShowMobileFilters(false)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile Filter Options */}
                <div className="space-y-6 text-sm">
                  {/* Category */}
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider mb-3">Fit Type</h4>
                    {categories.map(cat => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer mb-2.5">
                        <input
                          type="checkbox"
                          checked={selectedCategory === cat}
                          onChange={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                          className="w-4 h-4 rounded border-2 border-gray-300"
                        />
                        <span className="text-gray-700">{cat}</span>
                      </label>
                    ))}
                  </div>

                  {/* Color */}
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider mb-3">Color</h4>
                    {colors.map(color => (
                      <label key={color} className="flex items-center gap-2 cursor-pointer mb-2.5">
                        <input
                          type="checkbox"
                          checked={selectedColor === color}
                          onChange={() => setSelectedColor(selectedColor === color ? null : color)}
                          className="w-4 h-4 rounded border-2 border-gray-300"
                        />
                        <span className="text-gray-700">{color}</span>
                      </label>
                    ))}
                  </div>

                  {/* Size */}
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider mb-3">Size</h4>
                    {sizes.map(size => (
                      <label key={size} className="flex items-center gap-2 cursor-pointer mb-2.5">
                        <input
                          type="checkbox"
                          checked={selectedSize === size}
                          onChange={() => setSelectedSize(selectedSize === size ? null : size)}
                          className="w-4 h-4 rounded border-2 border-gray-300"
                        />
                        <span className="text-gray-700">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full mt-6 bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-900 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 md:py-20">
                <p className="text-gray-600 text-lg font-medium mb-6">No products found matching your filters.</p>
                <button
                  onClick={handleResetFilters}
                  className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-900 transition-all duration-200 active:scale-95"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
