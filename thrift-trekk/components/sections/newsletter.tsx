'use client';

import { useState } from 'react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <section className="w-full bg-black text-white py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        <div className="mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-pretty leading-tight">
            Stay Connected
          </h2>
          <p className="text-base md:text-lg text-gray-300 text-pretty leading-relaxed">
            Subscribe to our newsletter for new releases, exclusive offers, and styling tips delivered straight to your inbox.
          </p>
        </div>

        <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-5 md:px-6 py-3.5 md:py-4 rounded-lg bg-white text-black placeholder-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-all"
          />
          <button
            type="submit"
            className={`px-8 md:px-10 py-3.5 md:py-4 font-bold rounded-lg transition-all duration-300 whitespace-nowrap active:scale-95 ${
              subscribed
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-black hover:bg-gray-100 shadow-md hover:shadow-lg'
            }`}
          >
            {subscribed ? '✓ Subscribed!' : 'Subscribe'}
          </button>
        </form>

        <p className="text-xs md:text-sm text-gray-400 font-medium">
          We&apos;ll never spam you. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
