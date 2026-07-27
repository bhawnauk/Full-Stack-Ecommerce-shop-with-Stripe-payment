import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { GET_PRODUCT } from "../graphql/queries";
import { useCartStore } from "../store/cartStore";
import type { Product } from "../types/product";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const addItem = useCartStore((state) => state.addItem);

  const { data, loading, error } = useQuery<{
    product: Product | null;
  }>(GET_PRODUCT, {
    variables: {
      id,
    },
  });

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f5ef]">
        <p className="text-lg text-[#667066]">
          Loading product...
        </p>
      </main>
    );
  }

  if (error || !data?.product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f5ef]">
        <div className="text-center">
          <h1 className="text-3xl font-black text-[#2d3a2f]">
            Product not found
          </h1>

          <p className="mt-4 text-[#667066]">
            We couldn't find this product.
          </p>
        </div>
      </main>
    );
  }

  const product = data.product;

  return (
    <main className="min-h-screen bg-[#f8f5ef] px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl">
          <img
            src={product.image}
            alt={product.name}
            className="h-full min-h-[500px] w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#9b6b43]">
            {product.category}
          </p>

          <h1 className="mt-4 text-5xl font-black text-[#2d3a2f]">
            {product.name}
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#667066]">
            {product.description}
          </p>

          <p className="mt-8 text-3xl font-black text-[#2d3a2f]">
            £{product.price.toFixed(2)}
          </p>

          <button
            onClick={() => addItem(product)}
            className="mt-8 w-full rounded-full bg-[#2d3a2f] px-8 py-4 font-semibold text-white transition hover:bg-[#435544] md:w-fit"
          >
            Add to cart
          </button>
        </div>
      </div>
    </main>
  );
}