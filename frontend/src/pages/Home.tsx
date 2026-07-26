import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function Home() {
  return (
    <main className="bg-[#f8f5ef]">
      {/* Hero Section */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        {/* Hero Content */}
        <div>
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.3em] text-[#9b6b43]">
            Small batch · Big crunch
          </p>

          <h1 className="max-w-xl text-5xl font-black leading-[1.05] tracking-tight text-[#2d3a2f] md:text-7xl">
            Pickles made for the main character.
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-8 text-[#667066]">
            Bold flavours, proper crunch and small-batch goodness. Meet your
            new favourite jar.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="rounded-full bg-[#2d3a2f] px-7 py-4 font-semibold text-white transition hover:bg-[#435544]"
            >
              Shop the collection
            </Link>

            <a
              href="#about"
              className="rounded-full border border-[#2d3a2f] px-7 py-4 font-semibold text-[#2d3a2f] transition hover:bg-[#2d3a2f] hover:text-white"
            >
              Our story
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative">
          <div className="overflow-hidden rounded-[3rem]">
            <img
              src="https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=1200&q=80"
              alt="Jar of pickles"
              className="h-[500px] w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -left-4 rounded-2xl bg-[#e4b45c] px-6 py-4 shadow-lg">
            <p className="text-sm font-bold text-[#2d3a2f]">
              Made in small batches
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
<section className="mx-auto max-w-7xl px-6 py-24">
  <div className="mb-12 flex items-end justify-between">
    <div>
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#9b6b43]">
        The good stuff
      </p>

      <h2 className="text-4xl font-black text-[#2d3a2f] md:text-5xl">
        Meet the jars.
      </h2>
    </div>

    <Link
      to="/shop"
      className="hidden font-semibold text-[#2d3a2f] underline underline-offset-4 md:block"
    >
      View all products →
    </Link>
  </div>

  <div className="grid gap-8 md:grid-cols-3">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
</section>

      {/* About Section */}
      <section id="about" className="bg-[#2d3a2f] px-6 py-24 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#e4b45c]">
            Our story
          </p>

          <h2 className="text-4xl font-black md:text-6xl">
            Good ingredients. Good crunch. No shortcuts.
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[#d6ddd4]">
            We make small-batch pickles with big flavour. Every jar is made
            with carefully selected ingredients and a whole lot of love for
            food that deserves to be remembered.
          </p>
        </div>
      </section>
    </main>
  );
}