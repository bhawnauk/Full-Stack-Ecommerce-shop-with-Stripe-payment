import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export default function Navbar() {
  const items = useCartStore((state) => state.items);

  const cartItemCount = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <nav className="border-b border-[#e8dfd2] bg-[#f8f5ef]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          to="/"
          className="text-2xl font-black tracking-tight text-[#2d3a2f]"
        >
          PICKLE CO.
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-[#596256] md:flex">
          <Link to="/" className="transition hover:text-[#2d3a2f]">
            Home
          </Link>

          <Link to="/shop" className="transition hover:text-[#2d3a2f]">
            Shop
          </Link>

          <a href="/#about" className="transition hover:text-[#2d3a2f]">
            Our Story
          </a>
        </div>

        <Link
          id="nav-cart-link"
          to="/cart"
          className="rounded-full bg-[#2d3a2f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#435544]"
        >
          Cart ({cartItemCount})
        </Link>
      </div>
    </nav>
  );
}