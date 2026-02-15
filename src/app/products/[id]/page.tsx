import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/store/add-to-cart-button";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await db.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    notFound();
  }

  const serializedProduct = {
    ...product,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container-default">
        {/* Back navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to shop</span>
        </Link>

        {/* Product Detail Card */}
        <div className="glass-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative">
              {/* Background glow behind image */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-purple-600/10 rounded-full blur-[80px]" />
                <div className="absolute top-1/3 right-1/4 w-[40%] h-[40%] bg-blue-600/8 rounded-full blur-[60px]" />
              </div>

              <div className="relative aspect-square lg:aspect-auto lg:h-full min-h-[400px] p-8 flex items-center justify-center bg-white/[0.02]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block glass px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase text-purple-300">
                  {product.category}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl sm:text-4xl font-bold neon-text">
                  {formatPrice(product.price)}
                </span>
              </div>

              {/* Description */}
              <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="mb-8">
                {product.inStock ? (
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">In Stock</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-400">
                    <XCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Add to Cart */}
              <div className="mb-6">
                <AddToCartButton product={serializedProduct} />
              </div>

              {/* Back Link (secondary) */}
              <Link
                href="/"
                className="text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
