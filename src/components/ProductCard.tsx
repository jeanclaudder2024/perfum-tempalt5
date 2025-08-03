import { Content, asImageSrc, asText } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { formatPrice } from "@/utils/formatters";
import { TransitionLink } from "@/components/TransitionLink";
import { AddToCartButton } from "@/components/AddToCartButton";
import { WishlistButton } from "@/components/WishlistButton";
import { HiStar } from "react-icons/hi2";

interface ProductCardProps {
  fragrance: Content.FragranceDocument;
}

export function ProductCard({ fragrance }: ProductCardProps) {
  const mockRating = 4.2 + Math.random() * 0.6; // Mock rating between 4.2-4.8
  const mockReviews = Math.floor(Math.random() * 500) + 100; // Mock reviews 100-600

  return (
    <div className="group bg-neutral-800/50 border border-neutral-700 rounded-lg overflow-hidden hover:border-neutral-500 transition-all duration-300">
      {/* Product Image */}
      <div className="relative aspect-square bg-gradient-to-br from-neutral-800 to-neutral-900 p-8">
        <TransitionLink href={`/fragrance/${fragrance.uid}`}>
          <PrismicNextImage
            field={fragrance.data.bottle_image}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            width={400}
            height={400}
          />
        </TransitionLink>
        
        {/* Wishlist Button */}
        <div className="absolute top-4 right-4">
          <WishlistButton
            product={{
              id: fragrance.id,
              uid: fragrance.uid || '',
              title: asText(fragrance.data.title) || 'Fragrance',
              price: fragrance.data.price || 0,
              image: asImageSrc(fragrance.data.bottle_image) || '',
            }}
            className="bg-black/50 backdrop-blur-sm hover:bg-black/70"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        <div>
          <TransitionLink href={`/fragrance/${fragrance.uid}`}>
            <h3 className="font-display text-xl text-white group-hover:text-neutral-300 transition-colors">
              <PrismicText field={fragrance.data.title} fallback="Fragrance" />
            </h3>
          </TransitionLink>
          
          <p className="text-sm text-neutral-400 mt-1">Eau de Parfum</p>
        </div>

        {/* Scent Profile */}
        <div className="flex items-center gap-2">
          <span className="text-xs bg-neutral-700 text-neutral-300 px-2 py-1 rounded-full capitalize">
            {fragrance.data.scent_profile}
          </span>
          <span className="text-xs bg-neutral-700 text-neutral-300 px-2 py-1 rounded-full capitalize">
            {fragrance.data.mood}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(4)].map((_, index) => (
              <HiStar className="w-4 h-4 text-yellow-400" key={index} />
            ))}
            <HiStar className="w-4 h-4 text-yellow-400/50" />
          </div>
          <span className="text-sm text-neutral-400">
            {mockRating.toFixed(1)} ({mockReviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-white">
              From {formatPrice(fragrance.data.price || 0)}
            </p>
            <p className="text-xs text-neutral-400">Multiple sizes available</p>
          </div>
        </div>

        {/* Add to Cart */}
        <AddToCartButton
          product={{
            id: fragrance.id,
            uid: fragrance.uid || '',
            title: asText(fragrance.data.title) || 'Fragrance',
            price: fragrance.data.price || 0,
            image: asImageSrc(fragrance.data.bottle_image) || '',
          }}
          className="mt-4"
        />
      </div>
    </div>
  );
}