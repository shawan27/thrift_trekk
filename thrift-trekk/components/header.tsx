'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { BRAND_NAME, NAVIGATION } from '@/lib/constants';

export function Header() {
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="w-full bg-black text-white text-center py-2.5 text-xs md:text-sm font-medium tracking-wide">
        Free Shipping Above ₹1499 | Use Code TREKK10 for 10% Off
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-40 w-full bg-white transition-all duration-300 ${
        scrolled ? 'border-b border-gray-200 shadow-sm' : 'border-b border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="font-bold text-lg md:text-xl text-black hover:opacity-80 transition"
          >
            {BRAND_NAME}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAVIGATION.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link 
              href="/cart" 
              className="relative p-2 md:p-2.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ShoppingCart size={20} className="text-black" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-gray-100 bg-white animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-4 space-y-3">
              {NAVIGATION.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2.5 px-3 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
