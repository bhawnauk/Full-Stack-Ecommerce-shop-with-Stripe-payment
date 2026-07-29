import Stripe from "stripe";
import { prisma } from "../lib/prisma.js";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!,
);

export const typeDefs = `#graphql
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    image: String!
    category: String!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }

  type CheckoutSession {
    id: ID!
    url: String!
  }

  type Order {
    id: ID!
    status: OrderStatus!
    total: Float!
  }

  enum OrderStatus {
    PENDING
    PAID
    FAILED
    CANCELLED
  }

  type Mutation {
    createCheckoutSession(
      items: [CheckoutItemInput!]!
    ): CheckoutSession!

    createPaidOrder(
      sessionId: ID!
    ): Order!
  }

  input CheckoutItemInput {
    productId: ID!
    quantity: Int!
  }
`;

export const resolvers = {
  Query: {
    products: () => {
      return prisma.product.findMany();
    },

    product: (
      _: unknown,
      args: { id: string },
    ) => {
      return prisma.product.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },

  Mutation: {
    createCheckoutSession: async (
      _: unknown,
      args: {
        items: {
          productId: string;
          quantity: number;
        }[];
      },
    ) => {
      const products =
        await prisma.product.findMany({
          where: {
            id: {
              in: args.items.map(
                (item) => item.productId,
              ),
            },
          },
        });

      const lineItems = args.items.map((item) => {
        const product = products.find(
          (product: { id: string }) =>
            product.id === item.productId,
        );

        if (!product) {
          throw new Error(
            `Product not found: ${item.productId}`,
          );
        }

        return {
          price_data: {
            currency: "gbp",

            product_data: {
              name: product.name,
              images: [product.image],
            },

            unit_amount: Math.round(
              Number(product.price) * 100,
            ),
          },

          quantity: item.quantity,
        };
      });

      const frontendUrl =
        process.env.FRONTEND_URL ||
        "http://localhost:5173"; 

      const session =
        await stripe.checkout.sessions.create({
          mode: "payment",

          line_items: lineItems,

          success_url:
            `${frontendUrl}/success?session_id={CHECKOUT_SESSION_ID}`,

          cancel_url:
            `${frontendUrl}/cart`,
        });

      return {
        id: session.id,
        url: session.url!,
      };
    },

    createPaidOrder: async (
      _: unknown,
      args: { sessionId: string },
    ) => {
      const session =
        await stripe.checkout.sessions.retrieve(
          args.sessionId,
        );

      if (
        session.payment_status !== "paid"
      ) {
        throw new Error(
          "Payment has not been completed",
        );
      }

      const paymentIntentId =
        typeof session.payment_intent ===
        "string"
          ? session.payment_intent
          : session.payment_intent?.id;

      if (!paymentIntentId) {
        throw new Error(
          "Payment intent not found",
        );
      }

      const existingOrder =
        await prisma.order.findUnique({
          where: {
            stripePaymentIntentId:
              paymentIntentId,
          },
        });

      if (existingOrder) {
        return existingOrder;
      }

      const lineItems =
        await stripe.checkout.sessions.listLineItems(
          args.sessionId,
        );

      const orderItems =
        await Promise.all(
          lineItems.data.map(
            async (lineItem) => {
              const productName =
                lineItem.description;

              if (!productName) {
                throw new Error(
                  "Stripe line item does not contain a product name",
                );
              }

              const product =
                await prisma.product.findFirst({
                  where: {
                    name: productName,
                  },
                });

              if (!product) {
                throw new Error(
                  `Product not found: ${productName}`,
                );
              }

              const quantity =
                lineItem.quantity ?? 1;

              return {
                productId: product.id,
                quantity,
                price:
                  (lineItem.amount_total ?? 0) /
                  100 /
                  quantity,
              };
            },
          ),
        );

      const order =
        await prisma.order.create({
          data: {
            stripePaymentIntentId:
              paymentIntentId,

            status: "PAID",

            total:
              (session.amount_total ?? 0) /
              100,

            items: {
              create: orderItems,
            },
          },
        });

      return order;
    },
  },
};