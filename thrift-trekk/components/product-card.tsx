'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/lib/products';
import { useCart } from '@/lib/cart-context';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
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

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="group flex flex-col h-full">
      <Link href={`/product/${product.id}`} className="flex-1 flex flex-col">
        {/* Image Container */}
        <div className="relative bg-gray-100 overflow-hidden rounded-xl h-80 md:h-96 mb-5 flex-shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Tag Badge */}
          {product.tag && (
            <div className={`absolute top-4 right-4 px-3 py-1.5 text-xs font-bold text-white rounded-full backdrop-blur-sm ${
              product.tag === 'Bestseller' ? 'bg-red-600' :
              product.tag === 'New' ? 'bg-green-600' :
              'bg-orange-600'
            }`}>
              {product.tag === 'Bestseller' ? '★ Bestseller' : 
               product.tag === 'New' ? '✨ New' : 
               '🔥 Sale'}
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setWishlist(!wishlist);
            }}
            className="absolute top-4 left-4 bg-white rounded-full p-2.5 hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg active:scale-90"
            aria-label="Add to wishlist"
          >
            <Heart 
              size={18} 
              fill={wishlist ? 'currentColor' : 'none'} 
              color={wishlist ? '#ef4444' : '#9ca3af'}
              className="transition-colors"
            />
          </button>

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute bottom-4 left-4 bg-red-600 text-white px-3 py-1.5 text-xs font-bold rounded-lg">
              -{discount}%
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-sm md:text-base font-bold text-black mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>

          <p className="text-xs text-gray-500 mb-4 font-medium">{product.fit} • {product.fabric}</p>

          {/* Pricing */}
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-lg md:text-xl font-bold text-black">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through font-medium">₹{product.originalPrice}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Size and Cart Section */}
      <div className="space-y-3 mt-auto pt-2 border-t border-gray-100">
        <div className="relative">
          <label className="text-xs font-bold text-gray-700 block mb-2 uppercase tracking-wide">Size</label>
          <button
            onClick={() => setShowSizeDropdown(!showSizeDropdown)}
            className="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium text-left hover:border-black transition-colors duration-200 flex justify-between items-center"
          >
            <span>{selectedSize}</span>
            <span className="text-xs">▼</span>
          </button>
          
          {showSizeDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-10">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setShowSizeDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors ${
                    selectedSize === size ? 'bg-black text-white' : 'text-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-3 px-4 rounded-lg font-bold text-sm md:text-base transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 ${
            addedToCart
              ? 'bg-green-600 text-white shadow-md'
              : 'bg-black text-white hover:bg-gray-900 shadow-sm hover:shadow-md'
          }`}
        >
          <ShoppingCart size={18} />
          {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
