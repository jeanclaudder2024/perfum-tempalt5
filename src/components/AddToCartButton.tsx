'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { HiCheck } from 'react-icons/hi2';

interface AddToCartButtonProps {
  product: {
    id: string;
    uid: string;
    title: string;
    price: number;
    image?: string;
  };
  className?: string;
}

export function AddToCartButton({ product, className = "" }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState('50ml');

  const sizes = [
    { value: '30ml', label: '30ml', priceMultiplier: 0.8 },
    { value: '50ml', label: '50ml', priceMultiplier: 1 },
    { value: '100ml', label: '100ml', priceMultiplier: 1.6 },
  ];

  const currentSize = sizes.find(size => size.value === selectedSize);
  const finalPrice = Math.round(product.price * (currentSize?.priceMultiplier || 1));

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedSize}`,
      uid: product.uid,
      title: `${product.title} (${selectedSize})`,
      price: finalPrice,
      image: product.image || '',
      size: selectedSize,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Size Selection */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Size
        </label>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <button
              key={size.value}
              onClick={() => setSelectedSize(size.value)}
              className={`p-3 border text-center transition-all duration-200 ${
                selectedSize === size.value
                  ? 'border-white bg-white text-black'
                  : 'border-neutral-600 text-white hover:border-neutral-400'
              }`}
            >
              <div className="font-medium">{size.label}</div>
              <div className="text-xs opacity-75">
                ${Math.round(product.price * size.priceMultiplier / 100)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAdded}
        className={`w-full py-3 font-medium uppercase transition-all duration-200 flex items-center justify-center gap-2 ${
          isAdded
            ? 'bg-green-600 text-white'
            : 'bg-white text-black hover:bg-neutral-200'
        }`}
      >
        {isAdded ? (
          <>
            <HiCheck className="w-5 h-5" />
            Added to Bag
          </>
        ) : (
          'Add to Bag'
        )}
      </button>
    </div>
  );
}