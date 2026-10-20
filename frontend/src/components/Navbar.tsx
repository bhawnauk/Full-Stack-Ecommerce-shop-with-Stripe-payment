import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import Logo from "./Logo";

const navLinks = [
  { to: "/shop", label: "Shop" },
  { to: "/#restaurants", label: "For restaurants" },
  { to: "/#about", label: "Our story" },
];

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPath, setLastPath] = useState(location.key);

  // Close the mobile menu whenever the route changes.
  if (lastPath !== location.key) {
    setLastPath(location.key);
    setMenuOpen(false);
  }

  const cartItemCount = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <header className="sticky top-0 z-50 border-b border-sand/70 bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />

        <div className="hidden items-center gap-10 text-sm font-medium text-muted md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="transition hover:text-brine"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            id="nav-cart-link"
            to="/cart"
            className="flex items-center gap-2 rounded-full bg-brine px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-brine-soft"
          >
            Cart
            <span className="grid min-w-6 place-items-center rounded-full bg-mustard px-1.5 text-xs font-bold leading-6 text-brine">
              {cartItemCount}
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-sand md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-0.5 w-4 bg-brine transition ${
                  menuOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-4 bg-brine transition ${
                  menuOpen ? "top-1.5 -rotate-45" : "top-2.5"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-sand/70 px-6 pb-6 pt-2 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block border-b border-sand/60 py-4 font-display text-xl text-brine"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
