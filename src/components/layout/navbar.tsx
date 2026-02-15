"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(
    searchParams.get("q") ?? ""
  );
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Keep searchValue in sync when URL params change externally
  useEffect(() => {
    setSearchValue(searchParams.get("q") ?? "");
  }, [searchParams]);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchValue(value);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (value.trim()) {
          params.set("q", value.trim());
        } else {
          params.delete("q");
        }
        router.push(`/?${params.toString()}`);
      }, 300);
    },
    [router, searchParams]
  );

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const { itemCount: cartItemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/[0.08]">
      <nav className="container-default">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="neon-text text-2xl font-bold tracking-wider">
              LUMINA
            </span>
          </Link>

          {/* Desktop search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                className="glass-input w-full pl-10 pr-4 py-2 text-sm"
              />
              {searchValue && (
                <button
                  onClick={() => handleSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/cart"
              className={cn(
                "relative p-2 rounded-xl transition-all duration-300",
                "bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] hover:border-purple-500/50"
              )}
            >
              <ShoppingCart className="h-5 w-5 text-white/80" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-[10px] font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile right actions */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/cart"
              className={cn(
                "relative p-2 rounded-xl transition-all duration-300",
                "bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08]"
              )}
            >
              <ShoppingCart className="h-5 w-5 text-white/80" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-[10px] font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-2 rounded-xl transition-all duration-300",
                "bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08]"
              )}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-white/80" />
              ) : (
                <Menu className="h-5 w-5 text-white/80" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-slide-up">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                className="glass-input w-full pl-10 pr-10 py-2.5 text-sm"
              />
              {searchValue && (
                <button
                  onClick={() => handleSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
