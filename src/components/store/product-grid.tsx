import type { Product } from "@/types";
import { PackageSearch } from "lucide-react";
import { ProductCardWrapperClient } from "./product-grid-client-wrapper";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="glass-card flex flex-col items-center justify-center gap-4 p-12 text-center">
        <PackageSearch className="h-12 w-12 text-white/30" />
        <div>
          <h3 className="text-lg font-semibold text-white/70">
            No products found
          </h3>
          <p className="mt-1 text-sm text-white/40">
            Try adjusting your search or filter to find what you are looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCardWrapperClient key={product.id} product={product} />
      ))}
    </div>
  );
}
