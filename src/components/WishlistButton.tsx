'use client';

import { useWishlist } from '@/contexts/WishlistContext';
import { HiHeart } from 'react-icons/hi2';
import { HiOutlineHeart } from 'react-icons/hi2';

interface WishlistButtonProps {
  product: {
    id: string;
    uid: string;
    title: string;
    price: number;
    image: string;
  };
  className?: string;
}

export function WishlistButton({ product, className = "" }: WishlistButtonProps) {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleToggle = () => {
    if (inWishlist) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-full transition-all duration-200 ${
        inWishlist
          ? 'text-red-500 hover:text-red-600'
          : 'text-neutral-400 hover:text-white'
      } ${className}`}
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {inWishlist ? (
        <HiHeart className="w-6 h-6" />
      ) : (
        <HiOutlineHeart className="w-6 h-6" />
      )}
    </button>
  );
}