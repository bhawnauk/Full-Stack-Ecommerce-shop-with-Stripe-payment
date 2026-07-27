import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { prisma } from "./lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(
process.env.STRIPE_SECRET_KEY!,
);

const typeDefs = `#graphql
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

const resolvers = {
Query: {
products: () => prisma.product.findMany(),


product: (
  _: unknown,
  args: { id: string },
) =>
  prisma.product.findUnique({
    where: {
      id: args.id,
    },
  }),


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
    (product: (typeof products)[number]) =>
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

        metadata: {
          productId: product.id,
        },
      },

      unit_amount: Math.round(
        Number(product.price) * 100,
      ),
    },

    quantity: item.quantity,
  };
});

  const session =
    await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: lineItems,

      success_url:
        "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",

      cancel_url:
        "http://localhost:5173/cart",
    });

  return {
    id: session.id,
    url: session.url,
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
    session.payment_intent as string;

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
      {
        expand: [
          "data.price.product",
        ],
      },
    );

  const orderItems =
    await Promise.all(
      lineItems.data.map(
        async (lineItem) => {
          const stripeProduct =
            lineItem.price
              ?.product as Stripe.Product;

          const productId =
            stripeProduct.metadata
              .productId;

          const product =
            await prisma.product.findUnique({
              where: {
                id: productId,
              },
            });

          if (!product) {
            throw new Error(
              `Product not found: ${productId}`,
            );
          }

          return {
            productId: product.id,
            quantity:
              lineItem.quantity ?? 1,
            price:
              (lineItem.amount_total ?? 0) /
              100 /
              (lineItem.quantity ?? 1),
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

const server = new ApolloServer({
typeDefs,
resolvers,
});

async function startServer() {
const { url } =
await startStandaloneServer(server, {
listen: {
port: 4000,
},
});

console.log(
`🚀 GraphQL server running at ${url}`,
);
}

startServer();
