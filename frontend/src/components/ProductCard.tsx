import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import ProductImage from "./ProductImage";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;

    const timeout = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(timeout);
  }, [added]);

  const productUrl = `/product/${product.id}`;

  return (
    <article
      style={{ animationDelay: `${index * 70}ms` }}
      className="group flex animate-fade-up flex-col overflow-hidden rounded-2xl border border-sand bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(31,46,35,0.45)]"
    >
      <Link
        to={productUrl}
        className="relative block aspect-[4/5] overflow-hidden bg-cream"
      >
        <ProductImage
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brine backdrop-blur">
          {product.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link to={productUrl}>
          <h3 className="font-display text-xl font-semibold leading-snug text-brine">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="text-lg font-semibold text-brine">
            £{product.price.toFixed(2)}
          </span>

          <button
            type="button"
            onClick={() => {
              addItem(product);
              setAdded(true);
            }}
            className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition ${
              added
                ? "bg-mustard text-brine"
                : "bg-brine text-paper hover:bg-brine-soft"
            }`}
          >
            {added ? "Added ✓" : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
