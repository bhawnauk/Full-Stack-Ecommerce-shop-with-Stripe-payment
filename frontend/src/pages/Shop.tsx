import { useQuery } from "@apollo/client/react";
import ProductCard from "../components/ProductCard";
import { GET_PRODUCTS } from "../graphql/queries";
import type { Product } from "../types/product";

export default function Shop() {
  const { data, loading, error } = useQuery<{ products: Product[] }>(
    GET_PRODUCTS,
  );

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f5ef]">
        <p className="text-lg text-[#667066]">
          Loading products from GraphQL...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f5ef] px-6">
        <div className="text-center">
          <h1 className="text-3xl font-black text-[#2d3a2f]">
            GraphQL Error
          </h1>

          <p className="mt-4 text-[#667066]">
            {error.message}
          </p>
        </div>
      </main>
    );
  }

  const products = data?.products ?? [];

  return (
    <main className="min-h-screen bg-[#f8f5ef] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#9b6b43]">
            Shop the collection
          </p>

          <h1 className="text-5xl font-black text-[#2d3a2f]">
            Find your perfect jar.
          </h1>
        </div>

        

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}