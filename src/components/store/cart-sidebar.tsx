"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, updateQuantity, removeFromCart, clearCart, total, itemCount } =
    useCart();

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Dark overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full max-w-md",
          "bg-white/[0.05] backdrop-blur-2xl border-l border-white/[0.1]",
          "shadow-[-20px_0_60px_rgba(0,0,0,0.3)]",
          "flex flex-col",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-white">
              Cart
              {itemCount > 0 && (
                <span className="ml-2 text-sm font-normal text-white/50">
                  ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.1] hover:border-purple-500/50 transition-all duration-300"
            aria-label="Close cart"
          >
            <X className="h-5 w-5 text-white/80" />
          </button>
        </div>

        {/* Cart content */}
        {items.length === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
            <div className="p-6 rounded-full bg-white/[0.04] border border-white/[0.08]">
              <ShoppingBag className="h-12 w-12 text-white/20" />
            </div>
            <p className="text-white/40 text-base">Your cart is empty</p>
            <button
              onClick={onClose}
              className="glass-button-outline text-sm px-5 py-2"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-all duration-200 hover:bg-white/[0.05]"
                >
                  {/* Product image */}
                  <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-white/[0.02]">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Product details */}
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-medium text-white truncate">
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="flex-shrink-0 p-1 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
                        aria-label={`Remove ${item.product.name} from cart`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-semibold neon-text">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          className="p-1 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.1] hover:border-purple-500/40 transition-all duration-200"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5 text-white/70" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-white/90">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          className="p-1 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.1] hover:border-purple-500/40 transition-all duration-200"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5 text-white/70" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer with total and actions */}
            <div className="border-t border-white/[0.08] px-6 py-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Total</span>
                <span className="text-xl font-bold neon-text">
                  {formatPrice(total)}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="glass-button text-center text-sm"
                >
                  View Cart
                </Link>
                <button
                  onClick={clearCart}
                  className="glass-button-outline text-sm text-white/60 hover:text-red-400 hover:border-red-400/40"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
