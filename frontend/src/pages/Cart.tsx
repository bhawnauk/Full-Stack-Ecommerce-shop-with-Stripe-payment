import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useMutation } from "@apollo/client/react";
import ProductImage from "../components/ProductImage";
import { CREATE_CHECKOUT_SESSION } from "../graphql/queries";

interface CheckoutSession {
  id: string;
  url: string;
}

interface CreateCheckoutSessionData {
  createCheckoutSession: CheckoutSession;
}

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const [createCheckoutSession, { loading, error }] =
    useMutation<CreateCheckoutSessionData>(CREATE_CHECKOUT_SESSION);

  const handleCheckout = async () => {
    try {
      const { data } = await createCheckoutSession({
        variables: {
          items: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        },
      });

      const checkoutUrl = data?.createCheckoutSession?.url;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  if (items.length === 0) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-6 py-20">
        <div className="max-w-md text-center">
          <h1 className="font-display text-4xl font-semibold text-brine">
            Your cart is empty
          </h1>

          <p className="mt-4 leading-7 text-muted">
            Nothing in the jar yet. Browse the range and stock up for your
            kitchen.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-block rounded-full bg-brine px-7 py-4 font-semibold text-paper transition hover:bg-brine-soft"
          >
            Shop the range
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-5xl font-semibold text-brine">
            Your cart
          </h1>
          <p className="mt-2 text-muted">
            {itemCount} {itemCount === 1 ? "jar" : "jars"}
          </p>
        </div>

        <Link
          to="/shop"
          className="font-semibold text-brine underline decoration-mustard decoration-2 underline-offset-8"
        >
          ← Continue shopping
        </Link>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* Cart Items */}
        <ul className="divide-y divide-sand rounded-2xl border border-sand bg-white">
          {items.map((item) => (
            <li key={item.id} className="flex gap-5 p-5 sm:gap-6">
              <Link
                to={`/product/${item.id}`}
                className="shrink-0 overflow-hidden rounded-xl bg-cream"
              >
                <ProductImage
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 object-cover sm:h-28 sm:w-28"
                />
              </Link>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">
                      {item.category}
                    </p>
                    <h2 className="mt-1 font-display text-xl font-semibold text-brine">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      £{item.price.toFixed(2)} per jar
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="cursor-pointer text-sm text-muted underline-offset-4 hover:text-clay hover:underline"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-sand">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                      aria-label={`Decrease ${item.name} quantity`}
                      className="h-9 w-9 cursor-pointer text-brine"
                    >
                      −
                    </button>

                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                      aria-label={`Increase ${item.name} quantity`}
                      className="h-9 w-9 cursor-pointer text-brine"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-semibold text-brine">
                    £{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Order Summary */}
        <aside className="h-fit rounded-2xl bg-brine p-8 text-paper lg:sticky lg:top-24">
          <h2 className="font-display text-2xl font-semibold">Order summary</h2>

          <div className="mt-8 flex justify-between border-b border-paper/15 pb-5">
            <span className="text-paper/70">
              Subtotal ({itemCount} {itemCount === 1 ? "jar" : "jars"})
            </span>

            <span className="font-semibold">£{subtotal.toFixed(2)}</span>
          </div>

          <div className="mt-5 flex justify-between text-lg">
            <span className="font-semibold">Total</span>

            <span className="font-display text-2xl font-semibold">
              £{subtotal.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            disabled={loading || items.length === 0}
            aria-busy={loading}
            className="mt-8 w-full cursor-pointer rounded-full bg-mustard px-6 py-4 font-semibold text-brine transition hover:bg-paper disabled:cursor-not-allowed disabled:opacity-60 aria-busy:cursor-wait aria-busy:opacity-100"
          >
            {loading ? (
              <span className="inline-flex items-center justify-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-5 w-5 animate-spin rounded-full border-[3px] border-brine/25 border-t-brine"
                />
                Packing your jars
                <span aria-hidden="true" className="inline-flex gap-1">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-brine"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </span>
              </span>
            ) : (
              "Proceed to checkout"
            )}
          </button>

          {error && (
            <p role="alert" className="mt-4 text-sm text-mustard">
              We couldn't start checkout. Please try again.
            </p>
          )}

          <p className="mt-5 text-center text-xs text-paper/60">
            Secure payment powered by Stripe
          </p>
        </aside>
      </div>
    </main>
  );
}
