export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  tag?: 'Bestseller' | 'New' | 'Sale';
  sizes: number[];
  colors: string[];
  fit: string;
  fabric: string;
  stretch: string;
  care: string;
  description: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Black Baggy Denim',
    category: 'Baggy',
    price: 2499,
    originalPrice: 3499,
    image: '/products/jeans6.jpg',
    tag: 'Bestseller',
    sizes: [28, 30, 32, 34, 36],
    colors: ['Black'],
    fit: 'Baggy',
    fabric: '100% Cotton Denim',
    stretch: 'Minimal',
    care: 'Wash separately, cold water',
    description: 'Premium black baggy jeans with a relaxed fit. Perfect for streetwear styling with wide leg silhouette.',
  },
  {
    id: '2',
    name: 'Wide Leg Dark Denim',
    category: 'Wide Leg',
    price: 2799,
    originalPrice: 3999,
    image: '/products/jeans11.jpg',
    tag: 'New',
    sizes: [28, 30, 32, 34, 36],
    colors: ['Dark Blue'],
    fit: 'Wide Leg',
    fabric: '98% Cotton, 2% Spandex',
    stretch: 'Maximum',
    care: 'Wash with similar colors',
    description: 'Extra wide leg dark denim with premium stretch. Modern baggy silhouette perfect for contemporary looks.',
  },
  {
    id: '3',
    name: 'Grey Wash Oversized Jeans',
    category: 'Baggy',
    price: 2599,
    originalPrice: 3699,
    image: '/products/jeans10.jpg',
    sizes: [28, 30, 32, 34, 36],
    colors: ['Grey'],
    fit: 'Oversized',
    fabric: '100% Cotton Denim',
    stretch: 'Medium',
    care: 'Wash inside out',
    description: 'Oversized grey wash denim with a relaxed, comfortable fit. Statement piece for your wardrobe.',
  },
  {
    id: '4',
    name: 'Light Wash Wide Leg Denim',
    category: 'Wide Leg',
    price: 2699,
    originalPrice: 3799,
    image: '/products/jeans19.jpg',
    tag: 'New',
    sizes: [28, 30, 32, 34, 36],
    colors: ['Light Blue'],
    fit: 'Wide Leg',
    fabric: '100% Cotton Denim',
    stretch: 'Minimal',
    care: 'Wash separately',
    description: 'Light wash wide leg denim with a vintage aesthetic. Perfect for casual, relaxed styling.',
  },
  {
    id: '5',
    name: 'Cargo Black Denim Pants',
    category: 'Cargo',
    price: 2899,
    originalPrice: 4099,
    image: '/products/jeans15.jpg',
    sizes: [28, 30, 32, 34, 36],
    colors: ['Black'],
    fit: 'Cargo',
    fabric: '100% Cotton Denim',
    stretch: 'Minimal',
    care: 'Cold water wash',
    description: 'Utility-inspired cargo denim with pockets and detailing. Bold and functional streetwear essential.',
  },
  {
    id: '6',
    name: 'Medium Wash Baggy Blue',
    category: 'Baggy',
    price: 2499,
    originalPrice: 3499,
    image: '/products/jeans13.jpg',
    tag: 'Bestseller',
    sizes: [28, 30, 32, 34, 36],
    colors: ['Medium Blue'],
    fit: 'Baggy',
    fabric: '98% Cotton, 2% Spandex',
    stretch: 'Medium',
    care: 'Gentle wash',
    description: 'Medium wash baggy denim with subtle stretch. Versatile piece for everyday wear.',
  },
  {
    id: '7',
    name: 'White Oversized Denim',
    category: 'Wide Leg',
    price: 2599,
    originalPrice: 3699,
    image: '/products/jeans16.jpg',
    sizes: [28, 30, 32, 34, 36],
    colors: ['White'],
    fit: 'Oversized',
    fabric: '100% Cotton Denim',
    stretch: 'Minimal',
    care: 'Wash separately, cold water',
    description: 'Clean white denim with oversized silhouette. Statement piece for bold styling.',
  },
  {
    id: '8',
    name: 'Dark Indigo Wide Leg',
    category: 'Wide Leg',
    price: 2799,
    originalPrice: 3999,
    image: '/products/jeans17.jpg',
    sizes: [28, 30, 32, 34, 36],
    colors: ['Indigo'],
    fit: 'Wide Leg',
    fabric: '100% Cotton Denim',
    stretch: 'Minimal',
    care: 'Wash inside out',
    description: 'Deep indigo wide leg jeans with authentic vintage appeal. Premium quality denim.',
  },
  {
    id: '9',
    name: 'Cream Baggy Denim',
    category: 'Baggy',
    price: 2699,
    originalPrice: 3799,
    image: '/products/jeans3.jpg',
    tag: 'Sale',
    sizes: [28, 30, 32, 34, 36],
    colors: ['Cream'],
    fit: 'Baggy',
    fabric: '100% Cotton Denim',
    stretch: 'Minimal',
    care: 'Gentle wash',
    description: 'Cream colored baggy denim for a vintage vibe. Perfect for summer styling.',
  },
  {
    id: '10',
    name: 'Black Slim Fit Denim',
    category: 'Slim Fit',
    price: 2399,
    originalPrice: 3299,
    image: '/products/jeans22.jpg',
    sizes: [28, 30, 32, 34],
    colors: ['Black'],
    fit: 'Slim Fit',
    fabric: '98% Cotton, 2% Spandex',
    stretch: 'Medium',
    care: 'Cold water wash',
    description: 'Classic black slim fit denim. Modern, versatile piece for any occasion.',
  },
];

export const categories = ['Baggy', 'Slim Fit', 'Wide Leg', 'Cargo', 'Straight'];
export const colors = ['Black', 'Blue', 'Light Blue', 'Medium Blue', 'Indigo', 'Grey', 'White', 'Cream'];
export const sizes = [28, 30, 32, 34, 36];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export function getProductsByColor(color: string): Product[] {
  return products.filter(p => p.colors.includes(color));
}

export function filterProducts(filters: {
  category?: string;
  color?: string;
  priceRange?: [number, number];
}): Product[] {
  return products.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.color && !product.colors.includes(filters.color)) return false;
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (product.price < min || product.price > max) return false;
    }
    return true;
  });
}
