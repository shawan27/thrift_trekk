'use client';

import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/products';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function NewArrivalsSection() {
  const newArrivals = products.filter(p => p.tag === 'New').slice(0, 4);

  if (newArrivals.length === 0) return null;

  return (
    <section className="w-full bg-gray-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-14 md:mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 text-pretty leading-tight">
              ✨ New Arrivals
            </h2>
            <p className="text-base md:text-lg text-gray-600 text-pretty leading-relaxed">
              Fresh releases from our latest collection
            </p>
          </div>
          <Link 
            href="/shop" 
            className="hidden md:flex items-center gap-2 text-black hover:text-gray-700 font-bold text-lg transition-colors duration-200 group"
          >
            View All 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-10 md:hidden">
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-900 transition-all duration-200 active:scale-95"
          >
            View All New Arrivals 
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
