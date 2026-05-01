'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { getProductById, products } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import { WHATSAPP_URL } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Share2 } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProductById(productId);
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || 28);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <p className="text-center text-gray-600">Product not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      quantity,
      size: selectedSize,
      price: product.price,
      name: product.name,
      image: product.image,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const whatsappMessage = `Hi, I'm interested in: ${product.name} (Size ${selectedSize}) x${quantity}. Price: ₹${product.price * quantity}. Please confirm availability.`;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link href="/" className="text-gray-600 hover:text-black">Home</Link>
          <span className="text-gray-400">/</span>
          <Link href="/shop" className="text-gray-600 hover:text-black">Shop</Link>
          <span className="text-gray-400">/</span>
          <span className="text-black">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="sticky top-20 h-fit">
            <div className="relative bg-gray-100 rounded-lg h-96 md:h-[600px] overflow-hidden mb-4">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.tag && (
                <div className={`absolute top-4 right-4 px-3 py-1 text-xs font-bold text-white rounded-full ${
                  product.tag === 'Bestseller' ? 'bg-red-500' :
                  product.tag === 'New' ? 'bg-green-500' :
                  'bg-orange-500'
                }`}>
                  {product.tag === 'Bestseller' ? '⭐ Bestseller' :
                   product.tag === 'New' ? '🆕 New' :
                   '💰 Sale'}
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{product.name}</h1>

            {/* Pricing */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-black">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">{discount}% OFF</span>
                </>
              )}
            </div>

            <p className="text-gray-600 mb-8 text-pretty">{product.description}</p>

            {/* Product Details */}
            <div className="border-t border-gray-200 py-6 mb-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Fit</p>
                  <p className="font-semibold">{product.fit}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Fabric</p>
                  <p className="font-semibold">{product.fabric}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Stretch</p>
                  <p className="font-semibold">{product.stretch}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Care</p>
                  <p className="font-semibold text-sm">{product.care}</p>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-bold mb-3">Select Size</label>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border rounded font-semibold transition ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'border-gray-300 text-black hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-8">
              <label className="block text-sm font-bold mb-3">Quantity</label>
              <div className="flex items-center gap-3 border border-gray-300 rounded w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-6 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded font-bold text-lg transition ${
                  addedToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-black hover:bg-gray-800 text-white'
                }`}
              >
                {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
              </button>

              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded font-bold text-center transition"
              >
                Order via WhatsApp
              </a>

              <button className="w-full border-2 border-gray-300 hover:bg-gray-50 py-4 rounded font-bold transition flex items-center justify-center gap-2">
                <Share2 size={18} />
                Share
              </button>
            </div>

            {/* Trust Section */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex items-start gap-3">
                <Check size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">30-Day Returns</p>
                  <p className="text-sm text-gray-600">Not satisfied? Easy returns</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Free Shipping</p>
                  <p className="text-sm text-gray-600">On orders above ₹1499</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check size={20} className="text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Secure Checkout</p>
                  <p className="text-sm text-gray-600">100% safe and encrypted</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-16">
            <h2 className="text-3xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
