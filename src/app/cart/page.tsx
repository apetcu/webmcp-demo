"use client";

import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
} from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total, itemCount } =
    useCart();

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container-default">
        {/* Back navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Continue shopping</span>
        </Link>

        {/* Page Title */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-10">
          <span className="neon-text">Shopping Cart</span>
        </h1>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="glass-card p-16 text-center max-w-lg mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-2xl glass flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-white/30" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-white/80 mb-3">
              Your cart is empty
            </h2>
            <p className="text-white/50 mb-8 max-w-sm mx-auto">
              Looks like you haven&apos;t added anything to your cart yet.
              Browse our collection and find something you love.
            </p>
            <Link href="/" className="glass-button inline-block">
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Cart Content */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - 2/3 width on desktop */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="glass-card p-4 sm:p-6 flex gap-4 sm:gap-6 items-center"
                >
                  {/* Product Image */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-white/[0.03] flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-contain p-2"
                      sizes="96px"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-white truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-white/50 mt-1">
                      {formatPrice(item.product.price)} each
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, Math.max(0, item.quantity - 1))
                        }
                        className="w-8 h-8 rounded-lg glass glass-hover flex items-center justify-center text-white/70 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-medium text-white w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-lg glass glass-hover flex items-center justify-center text-white/70 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Item Subtotal & Remove */}
                  <div className="flex flex-col items-end gap-3">
                    <span className="text-base sm:text-lg font-semibold text-white">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="w-8 h-8 rounded-lg glass glass-hover flex items-center justify-center text-red-400/70 hover:text-red-400 hover:bg-red-500/10"
                      aria-label={`Remove ${item.product.name} from cart`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary - 1/3 width on desktop */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 sm:p-8 sticky top-28">
                <h2 className="text-xl font-semibold text-white mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-white/60">
                    <span>Subtotal</span>
                    <span className="text-white/80">
                      {formatPrice(total)}
                    </span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Items</span>
                    <span className="text-white/80">{itemCount}</span>
                  </div>
                  <div className="border-t border-white/[0.08] pt-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-lg font-medium text-white">
                        Total
                      </span>
                      <span className="text-2xl font-bold neon-text">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <div className="relative group">
                  <button
                    disabled
                    className="w-full glass-button opacity-60 cursor-not-allowed"
                  >
                    Checkout
                  </button>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 glass px-3 py-1.5 rounded-lg text-xs text-white/70 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Coming soon
                  </div>
                </div>

                {/* Continue Shopping */}
                <Link
                  href="/"
                  className="block text-center text-sm text-white/40 hover:text-white/70 transition-colors mt-4"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
