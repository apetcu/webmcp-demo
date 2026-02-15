"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/lib/cart-context";
import { initPolyfill } from "@adipetcu/webmcp-polyfill";
import type { ModelContext, ToolResponse } from "@adipetcu/webmcp-polyfill";

function ok(data: unknown): ToolResponse {
  return { content: [{ type: "text", text: JSON.stringify(data) }] };
}

function err(message: string): ToolResponse {
  return {
    content: [{ type: "text", text: JSON.stringify({ error: message }) }],
    isError: true,
  };
}

export function WebMCPProvider() {
  const cart = useCart();
  const cartRef = useRef(cart);
  cartRef.current = cart;

  useEffect(() => {
    initPolyfill();

    const mc = (navigator as unknown as Record<string, unknown>).modelContext as ModelContext | undefined;
    if (!mc) return;

    const toolNames: string[] = [];

    function register(
      ...args: Parameters<ModelContext["registerTool"]>
    ) {
      mc!.registerTool(args[0]);
      toolNames.push(args[0].name);
    }

    register({
      name: "search_products",
      description:
        "Search products by keyword and/or category. Returns matching products.",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search keyword" },
          category: { type: "string", description: "Category filter" },
        },
      },
      annotations: { readOnlyHint: true },
      execute: async (input) => {
        const params = new URLSearchParams();
        if (input.query) params.set("q", String(input.query));
        if (input.category) params.set("category", String(input.category));
        const res = await fetch(`/api/products?${params}`);
        if (!res.ok) return err("Failed to search products");
        return ok(await res.json());
      },
    });

    register({
      name: "get_categories",
      description: "List all product categories.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      execute: async () => {
        const res = await fetch("/api/products/categories");
        if (!res.ok) return err("Failed to fetch categories");
        return ok(await res.json());
      },
    });

    register({
      name: "get_product_details",
      description: "Get a product's full details by ID.",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string", description: "Product ID" },
        },
        required: ["id"],
      },
      annotations: { readOnlyHint: true },
      execute: async (input) => {
        const res = await fetch(`/api/products/${input.id}`);
        if (!res.ok) return err("Product not found");
        return ok(await res.json());
      },
    });

    register({
      name: "add_to_cart",
      description: "Add a product to cart by ID. Fetches the product first, then adds it.",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string", description: "Product ID" },
        },
        required: ["id"],
      },
      execute: async (input) => {
        const res = await fetch(`/api/products/${input.id}`);
        if (!res.ok) return err("Product not found");
        const product = await res.json();
        cartRef.current.addToCart(product);
        return ok({ success: true, product: product.name });
      },
    });

    register({
      name: "remove_from_cart",
      description: "Remove a product from cart by product ID.",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string", description: "Product ID to remove" },
        },
        required: ["id"],
      },
      execute: async (input) => {
        cartRef.current.removeFromCart(String(input.id));
        return ok({ success: true });
      },
    });

    register({
      name: "get_cart",
      description: "Get current cart contents, total, and item count.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      execute: async () => {
        const { items, total, itemCount } = cartRef.current;
        return ok({ items, total, itemCount });
      },
    });

    register({
      name: "clear_cart",
      description: "Clear the entire cart.",
      inputSchema: { type: "object", properties: {} },
      execute: async () => {
        cartRef.current.clearCart();
        return ok({ success: true });
      },
    });

    return () => {
      for (const name of toolNames) {
        try {
          mc.unregisterTool(name);
        } catch {
          // Tool may already have been unregistered
        }
      }
    };
  }, []);

  return null;
}
