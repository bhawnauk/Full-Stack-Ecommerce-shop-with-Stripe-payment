import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useMutation } from "@apollo/client/react";
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

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const [createCheckoutSession, { loading }] =
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
      <main className="flex min-h-screen items-center justify-center bg-[#f8f5ef] px-6">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#2d3a2f]">
            Your cart is empty
          </h1>

          <p className="mt-4 text-[#667066]">
            Looks like you haven't added any pickles yet.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-block rounded-full bg-[#2d3a2f] px-7 py-4 font-semibold text-white"
          >
            Start shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f5ef] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-black text-[#2d3a2f]">Your cart</h1>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_360px]">
          {/* Cart Items */}
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 rounded-3xl bg-white p-5 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-32 w-32 rounded-2xl object-cover"
                />

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-[#2d3a2f]">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-sm text-[#667066]">
                        £{item.price.toFixed(2)} each
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm font-semibold text-[#9b6b43] hover:underline"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d8d0c5]"
                      >
                        −
                      </button>

                      <span className="w-6 text-center font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#d8d0c5]"
                      >
                        +
                      </button>
                    </div>

                    <p className="font-bold text-[#2d3a2f]">
                      £{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <aside className="h-fit rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-[#2d3a2f]">
              Order summary
            </h2>

            <div className="mt-8 flex justify-between border-b border-[#e8dfd2] pb-5">
              <span className="text-[#667066]">Subtotal</span>

              <span className="font-bold text-[#2d3a2f]">
                £{subtotal.toFixed(2)}
              </span>
            </div>

            <div className="mt-5 flex justify-between text-lg">
              <span className="font-bold text-[#2d3a2f]">Total</span>

              <span className="font-black text-[#2d3a2f]">
                £{subtotal.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading || items.length === 0}
              className="mt-8 w-full rounded-full bg-[#2d3a2f] px-6 py-4 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Redirecting..." : "Proceed to checkout"}
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
