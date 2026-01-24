"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import CartOverlay from "./CartOverlay";
import SearchOverlay from "./SearchOverlay";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
        <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.792 5 15.298 5H18V0h-3.712C10.506 0 9 1.583 9 4.615V8z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg className="h-6 w-6 fill-current" viewBox="0 0 448 512">
        <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
      </svg>
    ),
  },
];


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [bundleIndex, setBundleIndex] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  const {
    cartItems,
    cartCount,
    cartTotal,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateQty,
    addToCart,
  } = useCart();

  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [orderNote, setOrderNote] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("cartOrderNote") || ""
      : "",
  );

  const availableBundleItems = useMemo(() => {
    return products.filter((p) => !cartItems.some((item) => item.id === p.id));
  }, [products, cartItems]);

  const nextBundle = useCallback(() => {
    if (bundleIndex < availableBundleItems.length - 1) {
      setBundleIndex((prev) => prev + 1);
    }
  }, [bundleIndex, availableBundleItems.length]);

  const prevBundle = useCallback(() => {
    if (bundleIndex > 0) {
      setBundleIndex((prev) => prev - 1);
    }
  }, [bundleIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isCartOpen) toggleCart();
      if (isOpen) setIsOpen(false);
      if (isSearchOpen) setIsSearchOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    const hasOverlay = isOpen || isSearchOpen || isCartOpen;
    document.body.style.overflow = hasOverlay ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isSearchOpen, isCartOpen]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/cardData.json");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return products.filter((p) => p.name.toLowerCase().includes(query));
  }, [searchQuery, products]);

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setSearchQuery("");
  }, []);

  const handleProductClick = useCallback(
    (id) => {
      router.push(`/products/${id}`);
      closeSearch();
    },
    [router, closeSearch],
  );

  const handleSaveNote = useCallback(() => {
    localStorage.setItem("cartOrderNote", orderNote);
    setIsNoteOpen(false);
  }, [orderNote]);

  const handleViewCart = () => {
    toggleCart();
    router.push("/cart");
  };

  return (
    <header className="navbar bg-[#F5EDDE] xl:px-38 lg:px-12 md:px-8 sticky top-0 z-100 lg:py-5 shadow-sm px-4">
      <nav className="w-full flex items-center justify-between">
        <div className="navbar-start flex-1">
          <div className="flex items-center gap-4 xl:hidden">
            <button onClick={() => setIsOpen(true)} aria-label="Open menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#39180F"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <button
              className="md:hidden cursor-pointer"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 p-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#39180F"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          <div className="hidden xl:flex">
            <ul className="menu menu-horizontal px-1 gap-1 text-[#39180F] font-bold text-lg">
              <NavLinks />
            </ul>
          </div>
        </div>

        <div className="navbar-center">
          <Link
            href="/"
            className="text-4xl md:text-5xl font-bold text-[#39180F]"
          >
            <h1 className="m-0">Nubuke</h1>
          </Link>
        </div>

        <div className="navbar-end gap-5 text-[#39180F] flex-1 justify-end ">
          <button
            className="hidden md:block cursor-pointer"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <Link href="/login" className="hidden md:block" aria-label="Login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </Link>
          <button
            onClick={toggleCart}
            className="cursor-pointer h-full text-center flex"
            aria-label="Cart"
          >
            <div className="indicator">
              {cartItems.length > 0 && (
                <span className="indicator-item badge badge-xs w-5 h-5 bg-[#39180F] text-[#F5EDDE] rounded-full border-none scale-80 translate-x-2 -translate-y-2">
                  {cartItems.length}
                </span>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </button>
        </div>
      </nav>

      <SearchOverlay
        isSearchOpen={isSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredProducts={filteredProducts}
        closeSearch={closeSearch}
        handleProductClick={handleProductClick}
      />

      <CartOverlay
        isCartOpen={isCartOpen}
        toggleCart={toggleCart}
        cartItems={cartItems}
        cartCount={cartCount}
        cartTotal={cartTotal}
        removeFromCart={removeFromCart}
        updateQty={updateQty}
        addToCart={addToCart}
        availableBundleItems={availableBundleItems}
        bundleIndex={bundleIndex}
        nextBundle={nextBundle}
        prevBundle={prevBundle}
        isNoteOpen={isNoteOpen}
        setIsNoteOpen={setIsNoteOpen}
        orderNote={orderNote}
        setOrderNote={setOrderNote}
        handleSaveNote={handleSaveNote}
        handleViewCart={handleViewCart}
      />

      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        socialLinks={socialLinks}
        NavLinks={NavLinks}
      />
    </header>
  );
}
