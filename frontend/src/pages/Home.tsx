import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import ProductCard from "../components/ProductCard";
import ProductGridSkeleton from "../components/ProductGridSkeleton";
import ProductImage from "../components/ProductImage";
import { GET_PRODUCTS } from "../graphql/queries";
import { TRADE_MAILTO } from "../config";
import type { Product } from "../types/product";

const menuUses = [
  "Smash burgers",
  "Deli sandwiches",
  "Charcuterie boards",
  "Fried chicken",
  "Brunch plates",
  "Picklebacks",
];

const kitchenReasons = [
  {
    title: "Crunch that holds up",
    body: "Firm, snappy pickles that keep their bite on hot builds and through a full service.",
  },
  {
    title: "Consistent, batch to batch",
    body: "Same brine, same cut, same flavour, so your dish tastes the way you designed it every time.",
  },
  {
    title: "A range for every plate",
    body: "Classic dill, chilli heat and sweet bread & butter cover burgers, boards, bowls and bar snacks.",
  },
  {
    title: "Simple to order",
    body: "Order online in the quantities you need and check out securely. No account, no minimums.",
  },
];

const tradeSteps = [
  {
    step: "01",
    title: "Taste the range",
    body: "Pick a few jars and put them through their paces on your menu.",
  },
  {
    step: "02",
    title: "Order what you need",
    body: "Set the quantity per jar and check out in a couple of minutes.",
  },
  {
    step: "03",
    title: "Talk to us about supply",
    body: "Going through jars fast? Get in touch about larger and regular orders.",
  },
];

export default function Home() {
  const { data, loading, error } = useQuery<{
    products: Product[];
  }>(GET_PRODUCTS);

  const products = data?.products ?? [];
  const heroProduct = products[0];

  return (
    <main className="bg-paper">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-14 lg:grid-cols-2 lg:pb-28 lg:pt-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-sand bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-clay sm:text-xs sm:tracking-[0.2em]">
              <span className="h-1.5 w-1.5 rounded-full bg-clay" />
              Small-batch pickles for kitchens
            </p>

            <h1 className="mt-8 max-w-xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-brine sm:text-6xl lg:text-7xl">
              The pickle your menu has been{" "}
              <em className="font-medium text-clay">missing.</em>
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-8 text-muted">
              Hand-packed, properly crunchy pickles made for restaurants, cafés
              and bars that care about every component on the plate.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="rounded-full bg-brine px-7 py-4 font-semibold text-paper transition hover:bg-brine-soft"
              >
                Shop the range
              </Link>

              <Link
                to="/#restaurants"
                className="rounded-full border border-brine/20 bg-white px-7 py-4 font-semibold text-brine transition hover:border-brine"
              >
                For restaurants →
              </Link>
            </div>

            <ul className="mt-12 grid max-w-lg gap-3 text-sm text-muted sm:grid-cols-3">
              {["Made in small batches", "Good ingredients", "Secure checkout"].map(
                (point) => (
                  <li key={point} className="flex items-center gap-2">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brine text-[10px] text-mustard">
                      ✓
                    </span>
                    {point}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-mustard/25 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_-40px_rgba(31,46,35,0.6)]">
              {heroProduct ? (
                <ProductImage
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  className="h-[420px] w-full object-cover sm:h-[540px]"
                />
              ) : (
                <div className="h-[420px] w-full animate-pulse bg-cream sm:h-[540px]" />
              )}
            </div>

            <div className="absolute -bottom-6 left-4 max-w-[260px] rounded-2xl bg-white p-5 shadow-xl sm:-left-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">
                On the pass
              </p>
              <p className="mt-2 font-display text-lg leading-snug text-brine">
                Built for burgers, boards &amp; brunch.
              </p>
            </div>

            <div className="absolute -top-5 right-6 grid h-24 w-24 rotate-12 place-items-center rounded-full bg-mustard text-center font-display text-sm font-semibold leading-tight text-brine shadow-lg">
              Small
              <br />
              batch
            </div>
          </div>
        </div>
      </section>

      {/* Menu uses strip */}
      <section className="border-y border-brine bg-brine py-6 text-paper">
        <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 font-display text-lg italic sm:text-xl">
          {menuUses.map((use, index) => (
            <li key={use} className="flex items-center gap-8">
              {index > 0 && (
                <span className="text-mustard not-italic" aria-hidden="true">
                  ✦
                </span>
              )}
              {use}
            </li>
          ))}
        </ul>
      </section>

      {/* The range */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-clay">
              The range
            </p>

            <h2 className="font-display text-4xl font-semibold text-brine md:text-5xl">
              A jar for every plate.
            </h2>
          </div>

          <Link
            to="/shop"
            className="font-semibold text-brine underline decoration-mustard decoration-2 underline-offset-8 transition hover:decoration-brine"
          >
            View the full range →
          </Link>
        </div>

        {loading && <ProductGridSkeleton />}

        {error && (
          <p className="rounded-2xl border border-sand bg-white p-6 text-muted">
            We couldn't load the range just now. Please refresh in a moment.
          </p>
        )}

        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* For restaurants */}
      <section id="restaurants" className="scroll-mt-20 bg-cream py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-clay">
                For restaurants
              </p>

              <h2 className="font-display text-4xl font-semibold leading-tight text-brine md:text-5xl">
                Built for busy kitchens.
              </h2>

              <p className="mt-6 max-w-md text-lg leading-8 text-muted">
                A great pickle is a small detail guests remember. We make ours
                so they're one less thing you have to worry about.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {kitchenReasons.map((reason) => (
                <div
                  key={reason.title}
                  className="rounded-2xl border border-sand bg-paper p-7"
                >
                  <h3 className="font-display text-xl font-semibold text-brine">
                    {reason.title}
                  </h3>
                  <p className="mt-3 leading-7 text-muted">{reason.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 grid gap-10 border-t border-sand pt-14 md:grid-cols-3">
            {tradeSteps.map((item) => (
              <div key={item.step}>
                <p className="font-display text-5xl font-semibold text-mustard">
                  {item.step}
                </p>
                <h3 className="mt-4 text-lg font-semibold text-brine">
                  {item.title}
                </h3>
                <p className="mt-2 leading-7 text-muted">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 flex flex-col items-start justify-between gap-8 rounded-[2rem] bg-brine p-10 text-paper md:flex-row md:items-center md:p-14">
            <div className="max-w-xl">
              <h3 className="font-display text-3xl font-semibold md:text-4xl">
                Ordering for a restaurant, café or bar?
              </h3>
              <p className="mt-4 leading-7 text-paper/70">
                Tell us about your kitchen and how many jars you get through.
                We'll come back to you about larger orders and regular supply.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={TRADE_MAILTO}
                className="rounded-full bg-mustard px-7 py-4 font-semibold text-brine transition hover:bg-paper"
              >
                Make a trade enquiry
              </a>
              <Link
                to="/shop"
                className="rounded-full border border-paper/30 px-7 py-4 font-semibold text-paper transition hover:border-paper"
              >
                Order online
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our story */}
      <section id="about" className="scroll-mt-20 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-clay">
              Our story
            </p>

            <h2 className="font-display text-4xl font-semibold leading-tight text-brine md:text-6xl">
              Good ingredients. Good crunch.{" "}
              <em className="font-medium text-clay">No shortcuts.</em>
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-muted">
              We make small-batch pickles with big flavour. Every jar is made
              with carefully selected ingredients and a whole lot of love for
              food that deserves to be remembered.
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-sand pt-8">
              {[
                ["Small", "batch made"],
                ["Hand", "packed jars"],
                ["Real", "brine, real crunch"],
              ].map(([term, detail]) => (
                <div key={term}>
                  <dt className="font-display text-2xl font-semibold text-brine">
                    {term}
                  </dt>
                  <dd className="mt-1 text-sm text-muted">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}
