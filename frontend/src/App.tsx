import { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Success from "./pages/Success";

function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const previousPathname = useRef(pathname);

  // Runs on every navigation (keyed on `key`), so re-clicking the same nav
  // link still scrolls.
  useEffect(() => {
    const samePage = previousPathname.current === pathname;
    previousPathname.current = pathname;

    if (hash) {
      document
        .getElementById(hash.slice(1))
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // Glide to the top within a page; jump instantly when the page changes.
    window.scrollTo({ top: 0, behavior: samePage ? "smooth" : "instant" });
  }, [pathname, hash, key]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />

      <div className="flex min-h-screen flex-col">
        <Navbar />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
