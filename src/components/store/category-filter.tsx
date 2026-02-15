"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryClick = useCallback(
    (category: string | null) => {
      onCategoryChange(category);

      const params = new URLSearchParams(searchParams.toString());
      if (category) {
        params.set("category", category);
      } else {
        params.delete("category");
      }
      const paramString = params.toString();
      router.push(paramString ? `/?${paramString}` : "/");
    },
    [router, searchParams, onCategoryChange]
  );

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
      {/* All option */}
      <button
        onClick={() => handleCategoryClick(null)}
        className={cn(
          "flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
          activeCategory === null
            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.25)]"
            : "bg-white/[0.04] border border-white/[0.1] text-white/60 hover:bg-white/[0.08] hover:text-white hover:border-white/[0.2]"
        )}
      >
        All
      </button>

      {/* Category pills */}
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={cn(
            "flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 capitalize",
            activeCategory === category
              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.25)]"
              : "bg-white/[0.04] border border-white/[0.1] text-white/60 hover:bg-white/[0.08] hover:text-white hover:border-white/[0.2]"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
