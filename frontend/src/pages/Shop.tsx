import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import ProductCard from "../components/ProductCard";
import ProductGridSkeleton from "../components/ProductGridSkeleton";
import { GET_PRODUCTS } from "../graphql/queries";
import type { Product } from "../types/product";

const ALL = "All";

export default function Shop() {
  const { data, loading, error } = useQuery<{ products: Product[] }>(
    GET_PRODUCTS,
  );
  const [category, setCategory] = useState(ALL);

  const products = data?.products ?? [];
  const categories = [ALL, ...new Set(products.map((p) => p.category))];
  const visibleProducts =
    category === ALL
      ? products
      : products.filter((product) => product.category === category);

  return (
    <main className="bg-paper">
      <section className="border-b border-sand bg-cream">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-clay">
              The range
            </p>

            <h1 className="font-display text-5xl font-semibold text-brine md:text-6xl">
              Pickles for every plate.
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-8 text-muted">
              Small-batch jars for burgers, boards, sandwiches and the bar.
              Order as many as your kitchen needs.
            </p>
          </div>

          <Link
            to="/#restaurants"
            className="w-fit rounded-2xl border border-sand bg-paper px-5 py-4 text-sm text-muted transition hover:border-brine"
          >
            <span className="block font-semibold text-brine">
              Buying for a kitchen?
            </span>
            Trade &amp; regular supply →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        {loading && <ProductGridSkeleton count={8} />}

        {error && (
          <div className="rounded-2xl border border-sand bg-white p-10 text-center">
            <h2 className="font-display text-2xl font-semibold text-brine">
              We couldn't load the range
            </h2>
            <p className="mt-3 text-muted">
              Please refresh the page in a moment.
            </p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setCategory(name)}
                    className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition ${
                      category === name
                        ? "border-brine bg-brine text-paper"
                        : "border-sand bg-white text-muted hover:border-brine hover:text-brine"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>

              <p className="text-sm text-muted">
                {visibleProducts.length}{" "}
                {visibleProducts.length === 1 ? "product" : "products"}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {visibleProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
