import { Link } from "react-router-dom";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-square overflow-hidden bg-[#e8e0d4]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#9b6b43]">
          {product.category}
        </p>

        <h3 className="text-xl font-bold text-[#2d3a2f]">
          {product.name}
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#6c746b]">
          {product.description}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-lg font-bold text-[#2d3a2f]">
            £{product.price.toFixed(2)}
          </span>

          <Link
            to={`/product/${product.id}`}
            className="rounded-full border border-[#2d3a2f] px-4 py-2 text-sm font-semibold text-[#2d3a2f] transition hover:bg-[#2d3a2f] hover:text-white"
          >
            View product
          </Link>
        </div>
      </div>
    </article>
  );
}