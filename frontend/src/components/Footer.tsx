import { Link } from "react-router-dom";
import { TRADE_EMAIL, TRADE_MAILTO } from "../config";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-brine text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Logo inverted />

          <p className="mt-5 max-w-sm leading-7 text-paper/70">
            Small-batch pickles for independent restaurants, cafés, bars and
            anyone who takes the details on the plate seriously.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-mustard">
            Shop
          </p>

          <ul className="mt-5 space-y-3 text-paper/80">
            <li>
              <Link to="/shop" className="hover:text-paper">
                The full range
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-paper">
                Your cart
              </Link>
            </li>
            <li>
              <Link to="/#about" className="hover:text-paper">
                Our story
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-mustard">
            Trade
          </p>

          <ul className="mt-5 space-y-3 text-paper/80">
            <li>
              <Link to="/#restaurants" className="hover:text-paper">
                For restaurants
              </Link>
            </li>
            <li>
              <a href={TRADE_MAILTO} className="break-all hover:text-paper">
                {TRADE_EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-sm text-paper/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Pickle Co. All rights reserved.</p>
          <p>Secure payments by Stripe</p>
        </div>
      </div>
    </footer>
  );
}
