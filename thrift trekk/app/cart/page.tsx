'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="max-w-7xl w-full mx-auto px-4 md:px-6 py-16 md:py-24 flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-12">Shopping Cart</h1>
          <div className="text-center py-16 md:py-20">
            <p className="text-gray-600 text-lg mb-8">Your cart is empty</p>
            <Link href="/shop" className="inline-block bg-black text-white px-8 py-4 rounded-lg font-bold hover:bg-gray-900 transition-all duration-200 active:scale-95">
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const whatsappMessage = `Hi, I'd like to order the following items:\n${items
    .map(item => `• ${item.name} (Size ${item.size}) x${item.quantity}`)
    .join('\n')}\n\nTotal: ₹${total}\n\nPlease confirm availability and proceed with payment.`;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="max-w-7xl w-full mx-auto px-4 md:px-6 py-8 md:py-12 flex-1">
        <h1 className="text-3xl md:text-4xl font-bold mb-10">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4 md:space-y-5">
              {items.map(item => (
                <div 
                  key={`${item.productId}-${item.size}`} 
                  className="border border-gray-200 rounded-lg p-5 md:p-6 flex gap-5 md:gap-6 hover:shadow-md transition-shadow duration-200"
                >
                  {/* Product Image */}
                  <div className="relative w-20 md:w-24 h-20 md:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base md:text-lg mb-1 truncate">{item.name}</h3>
                    <p className="text-xs md:text-sm text-gray-600 mb-4 font-medium">Size: {item.size}</p>

                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                      <div className="flex items-center gap-1 border-2 border-gray-300 rounded-lg w-fit">
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, Math.max(1, item.quantity - 1))}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-1 font-medium text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
                        <p className="text-xs md:text-sm text-gray-600">₹{item.price} each</p>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.productId, item.size)}
                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors duration-200 flex-shrink-0"
                    aria-label="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 md:mt-10">
              <Link href="/shop" className="text-black hover:text-gray-700 font-semibold text-sm md:text-base transition-colors duration-200">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border-2 border-gray-200 rounded-lg p-6 md:p-8 sticky top-24 bg-gray-50 shadow-sm">
              <h2 className="font-bold text-lg md:text-xl mb-8">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="text-black font-semibold">₹{total}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-700">Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-700">Tax (estimated)</span>
                  <span className="text-black font-semibold">₹0</span>
                </div>
              </div>

              <div className="border-t-2 border-gray-300 pt-6 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Total</span>
                  <span className="text-2xl font-bold text-black">₹{total}</span>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 md:py-4 rounded-lg font-bold text-center transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                >
                  📱 Order via WhatsApp
                </a>
                <Link 
                  href="/checkout" 
                  className="block w-full bg-black hover:bg-gray-900 text-white py-3 md:py-4 rounded-lg font-bold text-center transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full border-2 border-gray-300 hover:bg-gray-100 text-black py-3 md:py-4 rounded-lg font-bold transition-all duration-200"
                >
                  Clear Cart
                </button>
              </div>

              <p className="text-xs text-gray-600 mt-6 text-center leading-relaxed">
                You&apos;ll receive order confirmation via email/WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
