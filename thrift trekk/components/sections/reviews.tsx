'use client';

import { REVIEWS } from '@/lib/constants';

export function ReviewsSection() {
  return (
    <section className="w-full bg-gray-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-14 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-pretty leading-tight">
            Loved By Our Community
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto text-pretty leading-relaxed">
            Discover why customers worldwide trust THRIFT TREKK for authentic, premium denim
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {REVIEWS.map((review) => (
            <div 
              key={review.id} 
              className="bg-white p-7 md:p-8 rounded-xl border-2 border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm md:text-base mb-6 leading-relaxed flex-1">
                &quot;{review.text}&quot;
              </p>
              <div className="pt-4 border-t border-gray-100">
                <p className="font-bold text-sm md:text-base text-gray-900">{review.name}</p>
                <p className="text-xs text-gray-500 mt-1">Verified Buyer</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
