"use client";

import type { Product } from "@/types";
import ProductCard from "@/components/store/product-card";
import { useCart } from "@/lib/cart-context";

interface ProductCardWrapperClientProps {
  product: Product;
}

export function ProductCardWrapperClient({
  product,
}: ProductCardWrapperClientProps) {
  const { addToCart } = useCart();

  return <ProductCard product={product} onAddToCart={() => addToCart(product)} />;
}
