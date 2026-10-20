import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { GET_PRODUCT } from "../graphql/queries";
import { useCartStore } from "../store/cartStore";
import ProductImage from "../components/ProductImage";
import { TRADE_MAILTO } from "../config";
import type { Product } from "../types/product";

const pairings: Record<string, string[]> = {
  Classic: ["Smash burgers", "Deli sandwiches", "Charcuterie boards"],
  Spicy: ["Fried chicken", "Tacos", "Bloody Marys"],
  Sweet: ["Pulled pork", "Cheese boards", "Grilled cheese"],
};

const defaultPairings = ["Burgers", "Sandwiches", "Sharing boards"];

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [addedCount, setAddedCount] = useState(0);

  const { data, loading, error } = useQuery<{
    product: Product | null;
  }>(GET_PRODUCT, {
    variables: {
      id,
    },
  });

  if (loading) {
    return (
      <main className="mx-auto grid max-w-7xl animate-pulse gap-12 px-6 py-12 lg:grid-cols-2">
        <div className="aspect-square rounded-[2rem] bg-cream" />
        <div className="space-y-5 py-8">
          <div className="h-4 w-24 rounded bg-cream" />
          <div className="h-12 w-3/4 rounded bg-cream" />
          <div className="h-5 w-full rounded bg-cream" />
          <div className="h-5 w-2/3 rounded bg-cream" />
        </div>
      </main>
    );
  }

  if (error || !data?.product) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display text-4xl font-semibold text-brine">
            Product not found
          </h1>

          <p className="mt-4 text-muted">We couldn't find this product.</p>

          <Link
            to="/shop"
            className="mt-8 inline-block rounded-full bg-brine px-7 py-4 font-semibold text-paper"
          >
            Back to the range
          </Link>
        </div>
      </main>
    );
  }

  const product = data.product;
  const productPairings = pairings[product.category] ?? defaultPairings;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedCount(quantity);
    setQuantity(1);
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 lg:py-14">
      <nav className="mb-8 text-sm text-muted" aria-label="Breadcrumb">
        <Link to="/shop" className="hover:text-brine">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="text-brine">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden rounded-[2rem] bg-cream">
          <ProductImage
            src={product.image}
            alt={product.name}
            className="aspect-square h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="w-fit rounded-full bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-clay">
            {product.category}
          </p>

          <h1 className="mt-5 font-display text-5xl font-semibold leading-tight text-brine md:text-6xl">
            {product.name}
          </h1>

          <p className="mt-4 text-2xl font-semibold text-brine">
            £{product.price.toFixed(2)}
            <span className="ml-2 text-base font-normal text-muted">
              per jar
            </span>
          </p>

          <p className="mt-6 text-lg leading-8 text-muted">
            {product.description}
          </p>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Works well with
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {productPairings.map((pairing) => (
                <li
                  key={pairing}
                  className="rounded-full border border-sand bg-white px-4 py-1.5 text-sm text-brine"
                >
                  {pairing}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-sand bg-white">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="h-14 w-12 cursor-pointer text-xl text-brine"
              >
                −
              </button>
              <span className="w-10 text-center text-lg font-semibold">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="h-14 w-12 cursor-pointer text-xl text-brine"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 cursor-pointer rounded-full bg-brine px-8 py-4 font-semibold text-paper transition hover:bg-brine-soft sm:flex-none"
            >
              Add to cart · £{(product.price * quantity).toFixed(2)}
            </button>
          </div>

          {addedCount > 0 && (
            <p
              role="status"
              className="mt-4 flex flex-wrap items-center gap-2 text-sm text-brine"
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-mustard text-[10px]">
                ✓
              </span>
              Added {addedCount} to your cart.
              <Link to="/cart" className="font-semibold underline underline-offset-4">
                View cart
              </Link>
            </p>
          )}

          <div className="mt-10 rounded-2xl border border-sand bg-cream p-6">
            <p className="font-semibold text-brine">Ordering for a kitchen?</p>
            <p className="mt-1 text-sm leading-6 text-muted">
              Talk to us about larger quantities and regular supply.{" "}
              <a
                href={TRADE_MAILTO}
                className="font-semibold text-brine underline underline-offset-4"
              >
                Make a trade enquiry
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
