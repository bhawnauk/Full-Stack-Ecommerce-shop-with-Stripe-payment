import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation } from "@apollo/client/react";
import { useCartStore } from "../store/cartStore";
import { CREATE_PAID_ORDER } from "../graphql/queries";

interface CreatePaidOrderData {
  createPaidOrder: {
    id: string;
    status: string;
    total: number;
  };
}

export default function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const clearCart = useCartStore((state) => state.clearCart);

  const [createPaidOrder, { loading, error }] =
    useMutation<CreatePaidOrderData>(CREATE_PAID_ORDER);

  const [orderCreated, setOrderCreated] = useState(false);

  useEffect(() => {
    const createOrder = async () => {
      if (!sessionId) {
        console.error("No Stripe session ID found");
        return;
      }

      try {
        const { data } = await createPaidOrder({
          variables: { sessionId },
        });

        console.log("Paid order created:", data);

        clearCart();
        setOrderCreated(true);
      } catch (error) {
        console.error("Failed to create paid order:", error);
      }
    };

    createOrder();
  }, [sessionId, createPaidOrder, clearCart]);

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-6 py-20">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-sand border-t-brine" />

          <h1 className="mt-8 font-display text-3xl font-semibold text-brine">
            Confirming your payment...
          </h1>

          <p className="mt-4 text-muted">
            Please wait while we confirm your order.
          </p>
        </div>
      </main>
    );
  }

  if (error || !orderCreated) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-6 py-20">
        <div className="w-full max-w-xl rounded-[2rem] border border-sand bg-white p-10 text-center">
          <h1 className="font-display text-3xl font-semibold text-brine">
            Payment received
          </h1>

          <p className="mt-4 leading-7 text-muted">
            Your payment was successful, but we are still confirming your order.
          </p>

          <Link
            to="/"
            className="mt-8 inline-block rounded-full bg-brine px-7 py-4 font-semibold text-paper"
          >
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6 py-20">
      <div className="w-full max-w-xl rounded-[2rem] border border-sand bg-white p-10 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-mustard text-3xl text-brine">
          ✓
        </div>

        <h1 className="mt-8 font-display text-4xl font-semibold text-brine">
          Order confirmed
        </h1>

        <p className="mt-4 leading-7 text-muted">
          Thank you for your order. Your pickles are on their way to your
          kitchen.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/shop"
            className="rounded-full bg-brine px-7 py-4 font-semibold text-paper transition hover:bg-brine-soft"
          >
            Keep shopping
          </Link>
          <Link
            to="/"
            className="rounded-full border border-sand px-7 py-4 font-semibold text-brine transition hover:border-brine"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
