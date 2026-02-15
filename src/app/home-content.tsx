"use client";

import type { Product } from "@/types";
import { useCart } from "@/lib/cart-context";
import ProductCard from "@/components/store/product-card";
import CategoryFilter from "@/components/store/category-filter";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { PackageSearch } from "lucide-react";
import Link from "next/link";

interface HomeContentProps {
  products: Product[];
  categories: string[];
  currentQuery: string;
  currentCategory: string;
}

export default function HomeContent({
  products,
  categories,
  currentQuery,
  currentCategory,
}: HomeContentProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = useCallback(
    (category: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (category) {
        params.set("category", category);
      } else {
        params.delete("category");
      }
      router.push(`/?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleAddToCart = useCallback(
    (product: Product) => {
      addToCart(product);
    },
    [addToCart]
  );

  const hasActiveFilters = currentQuery || currentCategory;

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-8">
        <CategoryFilter
          categories={categories}
          activeCategory={currentCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Results count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-white/50">
          Showing{" "}
          <span className="text-white/80 font-medium">{products.length}</span>{" "}
          {products.length === 1 ? "product" : "products"}
          {currentQuery && (
            <span>
              {" "}
              for &ldquo;
              <span className="text-purple-400">{currentQuery}</span>&rdquo;
            </span>
          )}
          {currentCategory && (
            <span>
              {" "}
              in{" "}
              <span className="text-purple-400">{currentCategory}</span>
            </span>
          )}
        </p>
        {hasActiveFilters && (
          <Link
            href="/"
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            Clear filters
          </Link>
        )}
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
      ) : (
        <div className="glass-card p-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center">
              <PackageSearch className="w-10 h-10 text-white/40" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-white/80 mb-3">
            No products found
          </h3>
          <p className="text-white/50 mb-6 max-w-md mx-auto">
            We couldn&apos;t find any products matching your criteria. Try
            adjusting your search or clearing the filters.
          </p>
          <Link
            href="/"
            className="glass-button inline-block"
          >
            View all products
          </Link>
        </div>
      )}
    </div>
  );
}
