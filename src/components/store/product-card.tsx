"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div
      className={cn(
        "glass-card group animate-fade-in overflow-hidden",
        "transition-all duration-300",
        "hover:scale-[1.02] hover:border-purple-500/30",
        "hover:shadow-[0_0_40px_rgba(168,85,247,0.1)]"
      )}
    >
      {/* Product image */}
      <div className="relative aspect-square w-full overflow-hidden bg-white/[0.02]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-full bg-white/[0.1] backdrop-blur-md border border-white/[0.15] px-3 py-1 text-xs font-medium text-white/80">
            {product.category}
          </span>
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-white truncate">
            {product.name}
          </h3>
          <p className="text-sm text-white/50 line-clamp-2 min-h-[2.5rem]">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <span className="text-lg font-bold neon-text">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className={cn(
              "glass-button flex items-center gap-2 px-4 py-2 text-sm",
              !product.inStock && "opacity-50 cursor-not-allowed hover:shadow-none"
            )}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
