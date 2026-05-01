'use client';

import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="w-full bg-black text-white py-24 md:py-40 lg:py-48">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-pretty">
              DECIDE THE<br className="hidden sm:block" />FASHION
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto text-pretty leading-relaxed">
              Premium sustainable denim and streetwear for the modern generation. Authentic, timeless, and made to last.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link 
              href="/shop" 
              className="bg-white text-black px-8 md:px-10 py-4 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-gray-100 transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Shop Collection
            </Link>
            <Link 
              href="/about" 
              className="border-2 border-white text-white px-8 md:px-10 py-4 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-white hover:text-black transition-all duration-200 active:scale-95"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
