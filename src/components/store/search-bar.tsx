"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("q") ?? ""
  );
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Sync with external URL param changes
  useEffect(() => {
    setSearchValue(searchParams.get("q") ?? "");
    setIsSearching(false);
  }, [searchParams]);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchValue(value);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      if (value.trim()) {
        setIsSearching(true);
      }

      debounceRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (value.trim()) {
          params.set("q", value.trim());
        } else {
          params.delete("q");
        }
        router.push(`/?${params.toString()}`);
        // isSearching will be cleared when searchParams update triggers the effect above
      }, 300);
    },
    [router, searchParams]
  );

  const clearSearch = useCallback(() => {
    setSearchValue("");
    setIsSearching(false);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    const paramString = params.toString();
    router.push(paramString ? `/?${paramString}` : "/");
  }, [router, searchParams]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div
        className={cn(
          "relative flex items-center",
          "bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] rounded-2xl",
          "transition-all duration-300",
          "focus-within:border-purple-500/50 focus-within:ring-2 focus-within:ring-purple-500/20",
          "focus-within:shadow-[0_0_40px_rgba(168,85,247,0.15)]"
        )}
      >
        <div className="pl-5 flex items-center">
          {isSearching ? (
            <Loader2 className="h-5 w-5 text-purple-400 animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-white/40" />
          )}
        </div>

        <input
          type="text"
          placeholder="Search for products..."
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          className={cn(
            "flex-1 bg-transparent border-none px-4 py-4 text-base text-white",
            "placeholder-white/40 focus:outline-none"
          )}
        />

        {searchValue && (
          <button
            onClick={clearSearch}
            className={cn(
              "mr-3 p-1.5 rounded-lg",
              "bg-white/[0.08] hover:bg-white/[0.15]",
              "text-white/40 hover:text-white",
              "transition-all duration-200"
            )}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
