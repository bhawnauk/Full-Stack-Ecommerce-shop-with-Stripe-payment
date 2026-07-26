import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#f8f5ef] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-12">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#9b6b43]">
            Shop the collection
          </p>

          <h1 className="text-5xl font-black text-[#2d3a2f]">
            Find your perfect jar.
          </h1>

          <p className="mt-4 max-w-xl text-lg text-[#667066]">
            From classic dill to fiery jalapeño, there is a pickle for every
            kind of craving.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                selectedCategory === category
                  ? "bg-[#2d3a2f] text-white"
                  : "border border-[#d8d0c5] text-[#596256] hover:bg-[#e9e3d9]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}