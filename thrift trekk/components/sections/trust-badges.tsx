'use client';

import { TRUST_BADGES } from '@/lib/constants';

export function TrustBadgesSection() {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TRUST_BADGES.map((badge) => (
            <div key={badge.title} className="text-center">
              <div className="text-4xl mb-3">{badge.icon}</div>
              <h3 className="font-bold text-sm md:text-base mb-1">{badge.title}</h3>
              <p className="text-xs md:text-sm text-gray-600">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
