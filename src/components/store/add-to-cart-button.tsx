"use client";

import { useState, useCallback } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = useCallback(() => {
    if (added) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  }, [added, addToCart, product]);

  return (
    <button
      onClick={handleClick}
      disabled={!product.inStock}
      className={cn(
        "glass-button flex items-center justify-center gap-2 px-4 py-2 text-sm",
        !product.inStock && "opacity-50 cursor-not-allowed hover:shadow-none",
        added && "from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500"
      )}
    >
      <span
        className={cn(
          "inline-flex transition-transform duration-300",
          added ? "scale-110" : "scale-100"
        )}
      >
        {added ? (
          <Check className="h-4 w-4" />
        ) : (
          <ShoppingCart className="h-4 w-4" />
        )}
      </span>
      <span>{added ? "Added!" : "Add to Cart"}</span>
    </button>
  );
}
