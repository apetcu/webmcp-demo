"use client";

import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/types";

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemCardProps) {
  const { product, quantity } = item;
  const subtotal = product.price * quantity;

  return (
    <div
      className={cn(
        "glass-card p-4 animate-fade-in",
        "flex flex-col sm:flex-row gap-4"
      )}
    >
      {/* Product image */}
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-white/[0.02]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      {/* Product details */}
      <div className="flex flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1 min-w-0">
          <h3 className="text-base font-semibold text-white truncate">
            {product.name}
          </h3>
          <p className="text-sm text-white/50">
            {formatPrice(product.price)} each
          </p>
        </div>

        {/* Quantity controls */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                onUpdateQuantity(product.id, Math.max(1, quantity - 1))
              }
              disabled={quantity <= 1}
              className={cn(
                "glass-button-outline flex h-8 w-8 items-center justify-center rounded-lg px-0 py-0",
                quantity <= 1 && "opacity-40 cursor-not-allowed"
              )}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-medium text-white tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
              className="glass-button-outline flex h-8 w-8 items-center justify-center rounded-lg px-0 py-0"
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Subtotal */}
          <span className="min-w-[5rem] text-right text-base font-bold neon-text">
            {formatPrice(subtotal)}
          </span>

          {/* Remove button */}
          <button
            onClick={() => onRemove(product.id)}
            className={cn(
              "p-2 rounded-lg transition-all duration-200",
              "text-white/40 hover:text-red-400",
              "bg-white/[0.04] hover:bg-red-500/10 border border-transparent hover:border-red-500/30"
            )}
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
