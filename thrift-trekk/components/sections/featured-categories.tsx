'use client';

import Link from 'next/link';

const categories = [
  {
    name: 'Baggy Fit',
    description: 'Relaxed and oversized',
    icon: '👖',
  },
  {
    name: 'Slim Fit',
    description: 'Modern and sleek',
    icon: '👕',
  },
  {
    name: 'Wide Leg',
    description: 'Bold statement piece',
    icon: '🎩',
  },
  {
    name: 'Cargo Style',
    description: 'Utility inspired',
    icon: '🎒',
  },
  {
    name: 'Straight Cut',
    description: 'Classic and timeless',
    icon: '✂️',
  },
  {
    name: 'Custom Orders',
    description: 'Your design, your way',
    icon: '🎨',
  },
];

export function FeaturedCategoriesSection() {
  return (
    <section className="w-full bg-gray-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-14 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black text-pretty leading-tight">
            Explore Our Collections
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto text-pretty leading-relaxed">
            Discover our carefully curated denim collections, each designed for a unique style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href="/shop"
              className="group bg-white p-7 md:p-8 border-2 border-gray-200 rounded-xl hover:border-black hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-95"
            >
              <div className="text-5xl md:text-6xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                {category.icon}
              </div>
              <h3 className="font-bold text-lg md:text-xl mb-2 group-hover:text-black transition-colors duration-300">
                {category.name}
              </h3>
              <p className="text-sm md:text-base text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                {category.description}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100 text-xs font-bold text-gray-600 group-hover:text-black transition-colors duration-300">
                Explore →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
