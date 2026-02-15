import { Suspense } from "react";
import { db } from "@/lib/db";
import SearchBar from "@/components/store/search-bar";
import HomeContent from "./home-content";

export const dynamic = "force-dynamic";

interface HomePageProps {
  searchParams: {
    q?: string;
    category?: string;
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const query = searchParams.q || "";
  const category = searchParams.category || "";

  // Build the Prisma where clause
  const where: Record<string, unknown> = {};

  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }

  if (category) {
    where.category = category;
  }

  // Fetch products and categories in parallel
  const [products, categoryRecords] = await Promise.all([
    db.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    }),
    db.product.findMany({
      distinct: ["category"],
      select: { category: true },
      orderBy: { category: "asc" },
    }),
  ]);

  const categories = categoryRecords.map((r) => r.category);

  // Serialize dates for client components
  const serializedProducts = products.map((product) => ({
    ...product,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  }));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 right-1/4 w-[250px] h-[200px] bg-cyan-600/[0.08] rounded-full blur-[80px]" />
        </div>

        <div className="container-default relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="neon-text">Discover Premium</span>
              <br />
              <span className="text-white">Products</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/60 mb-10 max-w-2xl mx-auto text-balance">
              Explore our curated collection of premium products. From the
              latest tech to timeless essentials, find exactly what you need.
            </p>
            <div className="max-w-xl mx-auto">
              <Suspense>
                <SearchBar />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="pb-24">
        <div className="container-default">
          <Suspense>
            <HomeContent
              products={serializedProducts}
              categories={categories}
              currentQuery={query}
              currentCategory={category}
            />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
