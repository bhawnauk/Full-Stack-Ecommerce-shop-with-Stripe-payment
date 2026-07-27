# Pickle Co. Storefront

A small-batch pickle e-commerce storefront: a React/GraphQL frontend backed by an Apollo Server + Prisma + PostgreSQL API, with Stripe Checkout for payments.

## Tech stack

**Frontend** (`frontend/`)
- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Apollo Client (GraphQL)
- React Router v7
- Zustand (cart state, persisted to `localStorage`)

**Backend** (`backend/`)
- Apollo Server (GraphQL, standalone)
- Prisma ORM 7 + `@prisma/adapter-pg` on PostgreSQL
- Stripe Checkout (hosted payment flow)

## Project structure

```
frontend/
  src/
    pages/        Home, Shop, ProductDetails, Cart, Success
    components/    Navbar, ProductCard
    store/         cartStore (Zustand)
    graphql/        GraphQL queries/mutations
    lib/            Apollo Client setup

backend/
  src/
    server.ts       GraphQL schema + resolvers
    lib/prisma.ts    Prisma client instance
    generated/       Prisma client output (generated, not committed)
  prisma/
    schema.prisma    Data model
    migrations/      SQL migrations
    seed.ts          Sample product seed data
```

## Prerequisites

- Node.js 20+
- A PostgreSQL database (e.g. [Prisma Postgres](https://www.prisma.io/postgres), Supabase, or a local instance)
- A [Stripe](https://stripe.com) account (test mode is fine) for a secret API key

## Setup

### 1. Install dependencies

```bash
cd frontend && npm install
cd ../backend && npm install
```

Installing the backend also runs `prisma generate` automatically (via `postinstall`), which regenerates the Prisma client into `backend/src/generated/`.

### 2. Configure environment variables

Create `backend/.env` (see `backend/.env` for the expected keys):

```
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_test_...
```

### 3. Run database migrations

```bash
cd backend
npx prisma migrate dev
```

### 4. Seed sample products (optional)

```bash
cd backend
npx tsx prisma/seed.ts
```

### 5. Start the app

In two terminals:

```bash
# Terminal 1 — GraphQL API on http://localhost:4000
cd backend && npm run dev

# Terminal 2 — storefront on http://localhost:5173
cd frontend && npm run dev
```

The frontend's Apollo Client is currently hardcoded to `http://localhost:4000/` (see `frontend/src/lib/apollo.ts`), so the backend must be running on that port.

## Available scripts

**Frontend**

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run Oxlint |
| `npm run preview` | Preview the production build locally |

**Backend**

| Script | Description |
| --- | --- |
| `npm run dev` | Start the API with `tsx watch` (auto-restart) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start` | Run the compiled server from `dist/` |

## GraphQL API

Exposed at `http://localhost:4000/`.



## Checkout flow

1. The cart page (`/cart`) calls `createCheckoutSession`, then redirects the browser to the returned Stripe-hosted checkout URL.
2. On success, Stripe redirects back to `/success?session_id=...`.
3. The success page calls `createPaidOrder` with that session ID, which confirms payment with Stripe and persists the order (via `prisma.order.create`), then clears the local cart.
4. On cancellation, Stripe redirects back to `/cart`.

## Data model

- **Product** — name, description, price, image, category
- **Order** — Stripe payment intent ID, status (`PENDING` / `PAID` / `FAILED` / `CANCELLED`), total
- **OrderItem** — links an `Order` to a `Product` with quantity and price at time of purchase
