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
      <main className="flex min-h-screen items-center justify-center bg-[#f8f5ef] px-6">
        <div className="text-center">
          <h1 className="text-3xl font-black text-[#2d3a2f]">
            Confirming your payment...
          </h1>

          <p className="mt-4 text-[#667066]">
            Please wait while we confirm your order.
          </p>
        </div>
      </main>
    );
  }

  if (error || !orderCreated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f5ef] px-6">
        <div className="w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-black text-[#2d3a2f]">
            Payment received
          </h1>

          <p className="mt-4 text-[#667066]">
            Your payment was successful, but we are still confirming your order.
          </p>

          <Link
            to="/"
            className="mt-8 inline-block rounded-full bg-[#2d3a2f] px-7 py-4 font-semibold text-white"
          >
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f5ef] px-6">
      <div className="w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e5eee5] text-4xl">
          ✓
        </div>

        <h1 className="mt-8 text-4xl font-black text-[#2d3a2f]">
          Payment successful!
        </h1>

        <p className="mt-4 text-[#667066]">
          Thank you for your order. Your delicious pickles are on their way.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block rounded-full bg-[#2d3a2f] px-7 py-4 font-semibold text-white"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
