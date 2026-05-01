'use client';

import Link from 'next/link';
import { BRAND_NAME, BRAND_INFO, FOOTER_LINKS } from '@/lib/constants';
import { Instagram, MessageCircle, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <h3 className="font-bold text-lg md:text-xl mb-4">{BRAND_NAME}</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">{BRAND_INFO.description}</p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/thrifttrekk" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all duration-200 hover:scale-110"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://wa.me/917306790392" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all duration-200 hover:scale-110"
              >
                <MessageCircle size={18} />
              </a>
              <a 
                href="https://twitter.com/thrifttrekk" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 bg-gray-900 rounded-lg hover:bg-gray-800 transition-all duration-200 hover:scale-110"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-lg mb-5">Customer Service</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.customer.map(link => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-5">Company</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map(link => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-5">Contact</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <p className="flex items-center gap-2">
                <span className="text-gray-500">📞</span>
                <a href={`tel:${BRAND_INFO.phone}`} className="hover:text-white transition-colors duration-200">
                  {BRAND_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-gray-500">✉️</span>
                <a href={`mailto:${BRAND_INFO.email}`} className="hover:text-white transition-colors duration-200">
                  {BRAND_INFO.email}
                </a>
              </p>
              <p className="text-xs leading-relaxed pt-2">{BRAND_INFO.address}</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 md:pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs md:text-sm text-gray-500">
            <p>&copy; 2024 {BRAND_NAME}. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/policies" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/policies" className="hover:text-white transition-colors duration-200">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
