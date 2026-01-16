"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

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
    localStorage.getItem("cartOrderNote") || ""
  );

  const availableBundleItems = useMemo(() => {
    return products.filter((p) => !cartItems.some((item) => item.id === p.id));
  }, [products, cartItems]);

  const nextBundle = () => {
    if (bundleIndex < availableBundleItems.length - 1) {
      setBundleIndex((prev) => prev + 1);
    }
  };

  const prevBundle = () => {
    if (bundleIndex > 0) {
      setBundleIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isCartOpen) toggleCart();
      if (isOpen) setIsOpen(false);
      if (isSearchOpen) setIsSearchOpen(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (isOpen || isSearchOpen || isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

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
    [router, closeSearch]
  );

  const handleSaveNote = () => {
    localStorage.setItem("cartOrderNote", orderNote);
    setIsNoteOpen(false);
  };

  const socialLinks = useMemo(
    () => [
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
    ],
    []
  );

  const links = (
    <>
      <li>
        <Link className="hover:text-[#945947] hover:bg-transparent" href="/">
          HOME
        </Link>
      </li>
      <li>
        <details className="hover:text-[#945947] hover:bg-transparent group">
          <summary className="hover:bg-[#F5EDDE] cursor-pointer list-none">
            SHOPE
          </summary>
          <ul className="p-2 bg-[#F5EDDE] w-40 z-10 flex flex-col gap-1 shadow-md">
            <li>
              <Link href="/sub1">Submenu 1</Link>
            </li>
            <li>
              <Link href="/sub2">Submenu 2</Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details className="hover:text-[#945947] hover:bg-transparent group">
          <summary className="hover:bg-[#F5EDDE] cursor-pointer list-none">
            ABOUT
          </summary>
          <ul className="p-2 bg-[#F5EDDE] w-40 flex flex-col gap-1 shadow-md">
            <li>
              <Link
                href="/sub1"
                className="relative text-[#39180F] font-bold after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-[#39180F] after:transition-all after:duration-300 hover:after:w-full"
              >
                Submenu 1
              </Link>
            </li>
            <li>
              <Link
                href="/sub2"
                className="relative text-[#39180F] font-bold after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-[#39180F] after:transition-all after:duration-300 hover:after:w-full"
              >
                Submenu 2
              </Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <Link
          className="hover:text-[#945947] hover:bg-transparent"
          href="/store"
        >
          STORE LOCATOR
        </Link>
      </li>
      <li>
        <Link
          className="hover:text-[#945947] hover:bg-transparent"
          href="/circle"
        >
          THE CIRCLE
        </Link>
      </li>
    </>
  );

  return (
    <header className="navbar bg-[#F5EDDE] xl:px-38 lg:px-12 md:px-8 sticky top-0 z-100 lg:py-5 shadow-sm">
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
              aria-label="Open search cursor-pointer  "
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

          <div className="hidden xl:flex ">
            <ul className="menu menu-horizontal px-1  gap-1 text-[#39180F] font-bold text-lg">
              {links}
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

        <div className="navbar-end gap-5 text-[#39180F] flex-1 justify-end">
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
            className="cursor-pointer"
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
                className="h-6 w-6"
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

      <aside
        className={`fixed inset-0 z-200 transition-opacity duration-500 ${
          isSearchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 cursor-[url('data:image/svg+xml;utf8,%3Csvg%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2216%22%20cy%3D%2216%22%20r%3D%2214%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M20%2012L12%2020M12%2012L20%2020%22%20stroke%3D%22%2339180F%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E'),_pointer]"
          onClick={closeSearch}
          aria-hidden="true"
        />
        <div
          className={`absolute top-0 right-0 rounded-lg md:max-w-xl w-11/12  mx-5 md:h-[97vh] bg-[#F5EDDE]  shadow-2xl transition-transform duration-500 ease-in-out p-6 my-3  md:mx-5 flex flex-col ${
            isSearchOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="relative flex items-center mt-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b-2 border-[#39180F] py-2 pr-20 text-[#39180F] focus:outline-none text-lg placeholder:text-[#39180F]/50"
              autoFocus={isSearchOpen}
            />
            <div className="absolute right-0 flex items-center gap-2">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 text-[#39180F]/50 rounded-full"
                >
                  Clear
                </button>
              )}
              <button
                onClick={closeSearch}
                className="p-1 text-[#39180F] rounded-full cursor-pointer"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-8 overflow-y-auto grow max-h-[70vh]">
            {filteredProducts.length > 0 ? (
              <div className="flex flex-col gap-4">
                {filteredProducts.map((product) => {
                  const productImage = Array.isArray(product.images)
                    ? product.images[0]
                    : product.images || product.image;
                  return (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="flex items-center gap-4 p-2 hover:bg-[#39180F]/5 rounded-lg cursor-pointer transition-colors"
                    >
                      <Image
                        src={productImage || "/placeholder.png"}
                        alt={product.name}
                        width={64}
                        height={64}
                        className="h-16 w-16 object-cover rounded-md"
                        unoptimized={productImage?.startsWith("http")}
                      />
                      <div>
                        <h3 className="font-bold text-[#39180F]">
                          {product.name}
                        </h3>
                        <p className="text-sm text-[#39180F]/70">
                          View Details
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : searchQuery.length > 0 ? (
              <p className="text-[#39180F]/60 text-center mt-10">
                No products found for `{searchQuery}`
              </p>
            ) : (
              <p className="text-[#39180F]/40 text-center mt-10 italic">
                Start typing to search...
              </p>
            )}
          </div>
        </div>
      </aside>

      <aside
        className={`fixed inset-0 z-200 transition-opacity duration-500 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 cursor-[url('data:image/svg+xml;utf8,%3Csvg%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2216%22%20cy%3D%2216%22%20r%3D%2214%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M20%2012L12%2020M12%2012L20%2020%22%20stroke%3D%22%2339180F%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E'),_pointer]"
          onClick={toggleCart}
          aria-hidden="true"
        />
        <div
          className={`absolute top-0 right-0 rounded-lg md:max-w-xl w-11/12 mx-5  h-[97vh] bg-[#F5EDDE] shadow-2xl transition-transform duration-500 ease-in-out p-6 my-3 flex flex-col ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center w-full pb-4 border-b border-[#39180F]/10">
            <h2 className="flex items-center  gap-1 ">
              <span className="font-bold text-[#39180F] text-3xl">Cart</span> <span className="bg-[#39180F] text-sm flex items-center justify-center  w-6 h-6 rounded-full text-[#F5EDDE] ">{cartCount}</span>
            </h2>
            <button
              onClick={toggleCart}
              className="p-1 text-[#39180F] rounded-full cursor-pointer hover:rotate-90 transition-transform"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="grow overflow-y-auto py-4 no-scrollbar">
            {cartItems.length > 0 ? (
              <div className="flex flex-col gap-6">
                <div className="w-full text-center space-y-2">
                  <p className="text-[#39180F] font-semibold mb-8 text-start">
                    Minimum order: $35.00 USD
                  </p>

                  <div className="flex flex-col items-center justify-center gap-2 text-[#39180F]">
                    <span className="text-xs font-medium ">Free Shipping</span>
                    {Number(cartTotal || 0) >= 35 ? (
                      <svg
                        className="w-7 h-7 p-1 bg-[#39180F]/10 rounded-full"
                        fill="none"
                        stroke="#39180F"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-7 h-7 p-1 bg-[#39180F]/10 rounded-full"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM17 12V9.5h2.5l1.97 2.5H17z" />
                      </svg>
                    )}
                  </div>

                  <div className="w-10/12 mx-auto bg-[#39180F]/10 h-2.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-[#39180F] h-full transition-all duration-500 ease-out"
                      style={{
                        width: `${Math.min(
                          (Number(cartTotal || 0) / 35) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>

                  <p className="text-sm text-[#39180F] font-semibold">
                    {Number(cartTotal || 0) >= 35
                      ? "You've earned free shipping!"
                      : `You're $${(35 - Number(cartTotal || 0)).toFixed(
                          2
                        )} away from free shipping`}
                  </p>
                </div>

                <div className="space-y-6 pt-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex md:gap-4 gap-2 items-center "
                    >
                      <div className="relative md:h-25 md:w-25 w-15 h-15 shrink-0 bg-white rounded-md overflow-hidden border border-[#39180F]/10">
                        <Image
                          src={item.images?.[0]}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <Link href={`/products/${item.id}`} className="block">
                            <h3 className="font-bold  text-[#39180F] md:text-xl text-lg  transition-all cursor-pointer relative inline-block group">
                              {item.name}
                              <span className="absolute left-0 bottom-0 w-0 h-px bg-[#39180F]/50 transition-all duration-500 ease-in-out group-hover:w-full"></span>
                            </h3>
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#39180F]/40 md:hidden cursor-pointer "
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="flex  items-center justify-between">
                          <p className=" text-[#39180F] mb-2 md:text-md text-sm ">
                            ${item.price}
                          </p>
                          <div className="  border rounded-full p-1  border-[#39180F]/10 md:hidden ">
                            <button
                              disabled={item.qty <= 1}
                              onClick={() => updateQty(item.id, -1)}
                              className={`text-[#39180F] border border-[#39180F]/10 bg-[#39180F]/10 rounded-full px-4 py-1 text-sm leading-none ${
                                item.qty <= 1
                                  ? "opacity-40 cursor-not-allowed"
                                  : "cursor-pointer hover:text-[#F5EDDE] hover:bg-[#39180F]"
                              }`}
                            >
                              –
                            </button>
                            <span className="px-3 text-sm font-bold min-w-6 text-center text-[#39180F]">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, 1)}
                              className="text-[#39180F]  border border-[#39180F]/10 bg-[#39180F]/10 rounded-full px-4 py-1 text-sm leading-none cursor-pointer hover:text-[#F5EDDE] hover:bg-[#39180F]"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="md:flex flex-col items-end justify-between gap-2 hidden md:block">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#39180F]/40  cursor-pointer "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>

                        <div className="  border rounded-full p-1  border-[#39180F]/10">
                          <button
                            disabled={item.qty <= 1}
                            onClick={() => updateQty(item.id, -1)}
                            className={`text-[#39180F] border border-[#39180F]/10 bg-[#39180F]/10 rounded-full px-4 py-1 text-lg leading-none ${
                              item.qty <= 1
                                ? "opacity-40 cursor-not-allowed"
                                : "cursor-pointer hover:text-[#F5EDDE] hover:bg-[#39180F]"
                            }`}
                          >
                            –
                          </button>
                          <span className="px-3 text-sm font-bold min-w-6 text-center text-[#39180F]">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="text-[#39180F]  border border-[#39180F]/10 bg-[#39180F]/10 rounded-full px-4 py-1 text-lg leading-none cursor-pointer hover:text-[#F5EDDE] hover:bg-[#39180F]"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {availableBundleItems.length > 0 && (
                  <div className="pt-6 border-t border-[#39180F]/10">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className=" text-[#39180F] text-xl tracking-tight uppercase">
                        Bundle & Save
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={prevBundle}
                          disabled={bundleIndex === 0}
                          className={`p-1 bg-[#39180F]/10 border border-[#39180F]/20 rounded-full text-[#39180F] ${
                            bundleIndex === 0
                              ? "opacity-50 "
                              : "hover:bg-[#39180F]  hover:text-white cursor-pointer"
                          }`}
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M15 19l-7-7 7-7" strokeWidth="2" />
                          </svg>
                        </button>
                        <button
                          onClick={nextBundle}
                          disabled={
                            bundleIndex === availableBundleItems.length - 1
                          }
                          className={`p-1 bg-[#39180F]/10 border border-[#39180F]/20 rounded-full text-[#39180F] ${
                            bundleIndex === availableBundleItems.length - 1
                              ? "opacity-30"
                              : "hover:bg-[#39180F] hover:text-white cursor-pointer"
                          }`}
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 5l7 7-7 7" strokeWidth="2" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div>
                      <h1 className="text-[#F5EDDE] bg-[linear-gradient(60deg,#39180F_0%,#5A2A1D_50%,#39180F_100%)] text-center rounded-xl py-2  mb-5">
                        5 BARS: 5% OFF | 10 BARS: 15% OFF | 15+ BARS: 20% OFF
                      </h1>
                    </div>

                    <div className="overflow-hidden">
                      <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{
                          transform: `translateX(-${bundleIndex * 100}%)`,
                        }}
                      >
                        {availableBundleItems.map((product) => (
                          <div
                            key={product.id}
                            className="shrink-0 w-full pr-2"
                          >
                            <div className="flex md:gap-4 gap-2  items-center bg-[#f5edd2] p-2 rounded-lg">
                              <div className="relative md:h-18 md:w-18 h-14 w-14 bg-white rounded border overflow-hidden">
                                <Image
                                  src={
                                    product.image ||
                                    product.images?.[0] ||
                                    "/placeholder.png"
                                  }
                                  alt={product.name}
                                  fill
                                  className="object-cover hover:scale-105 transition-transform duration-300"
                                />
                              </div>

                              <div className="flex-1 overflow-hidden">
                                <Link
                                  href={`/products/${product.id}`}
                                  className="block"
                                >
                                  <h4 className="text-lg font-semibold text-[#39180F] transition-all cursor-pointer relative inline-block group">
                                    {product.name}
                                    <span className="absolute left-0 bottom-0 w-0 h-px bg-[#39180F]/50 transition-all duration-500 ease-in-out group-hover:w-full"></span>
                                  </h4>
                                </Link>
                                <div className="flex items-center justify-between">
                                  <p className="text-[#39180F]/70 text-sm">
                                    ${product.price}
                                  </p>
                                  <button
                                    onClick={() => addToCart(product)}
                                    className="text-[#39180F] px-3 py-1 rounded-full text-sm font-semibold bg-[#39180F]/10 hover:border hover:border-[#39180F] transition-all sm:hidden cursor-pointer"
                                  >
                                    + Add
                                  </button>
                                </div>
                              </div>

                              <button
                                onClick={() => addToCart(product)}
                                className="text-[#39180F] px-4 py-1.5 rounded-full text-sm font-bold bg-[#39180F]/10 hover:border hover:border-[#39180F] transition-all cursor-pointer sm:block hidden"
                              >
                                + Add
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
                <div className="relative text-[#39180F]/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <p className="text-[#39180F]  text-xl font-medium">
                  Your cart is empty
                </p>
                <button
                  onClick={toggleCart}
                  className="bg-[#39180F] text-[#F5EDDE] px-8 py-4 border-2 border-[#39180F] hover:text-[#39180F] cursor-pointer rounded-full font-bold hover:bg-[#F5EDDE] transition-colors"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="relative pt-4 border-t border-[#39180F]/10 space-y-4 bg-[#F5EDDE]">
              <div
                className={`absolute bottom-full left-0 w-full bg-[#F5EDDE] border-t border-[#39180F]/10 p-4 transition-all duration-300 ease-in-out transform ${
                  isNoteOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0 pointer-events-none"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-bold text-[#39180F] uppercase tracking-wider">
                    Order Note
                  </label>
                  <button
                    onClick={() => setIsNoteOpen(false)}
                    className="text-xs underline"
                  >
                    Cancel
                  </button>
                </div>
                <textarea
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="Special instructions for your order..."
                  className="w-full h-24 p-3 text-sm bg-white border border-[#39180F]/20 rounded-lg focus:outline-none focus:border-[#39180F] resize-none"
                />
                <button
                  onClick={handleSaveNote}
                  className="w-full mt-2 bg-[#39180F] text-white py-2 rounded-full text-xs font-bold uppercase"
                >
                  Save Note
                </button>
              </div>

              <div className="flex justify-between items-center px-2">
                <h1 className="text-xl font-bold text-[#39180F]">Total</h1>
                <h1 className="text-lg font- text-[#39180F]">
                  ${cartTotal?.toFixed(2)}{" "} USD
                </h1>
              </div>

              <div className="px-2">
                <p className="text-[#39180F]/60 mb-2 text-sm">
                  Taxes and{" "}
                  <Link
                    href="/ShippingPolicy"
                    onClick={toggleCart}
                    className="relative inline-block hover:text-[#39180F] font-medium group"
                  >
                    shipping
                    <span className="absolute left-0 bottom-0 w-full h-px bg-[#39180F]/50 transition-all duration-500 ease-in-out group-hover:w-0 group-hover:right-full"></span>
                  </Link>{" "}
                  calculated at checkout
                </p>
                <button
                  onClick={() => setIsNoteOpen(!isNoteOpen)}
                  className="text-[#39180F]/60 text-xs font-bold transition-all cursor-pointer relative inline-block group"
                >
                  {orderNote ? "Edit order note" : "Add an order note"}
                  <span className="absolute left-0 bottom-0 w-full h-px bg-[#39180F]/50 transition-all duration-500 ease-in-out group-hover:w-0"></span>
                </button>
              </div>

              <div className="flex gap-2">
                <button className="w-full hover:border-[#39180F] bg-[#f5edd2] text-[#39180F]  border-2 border-[#f5edd2] py-4 rounded-full font-bold hover:bg-[#F5EDDE] transition-opacity sm:text-md text-sm  cursor-pointer">
                  View Cart
                </button>
                <button className="w-full bg-[#39180F] hover:border-[#39180F] text-[#F5EDDE] py-4 rounded-full border-2 border-[#f5edd2] font-bold hover:bg-[#F5EDDE] transition-opacity sm:text-md text-sm hover:text-[#39180F] tracking-widest cursor-pointer">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      <aside
        className={`fixed  inset-0 z-200 transition-opacity duration-700 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40  cursor-[url('data:image/svg+xml;utf8,%3Csvg%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2216%22%20cy%3D%2216%22%20r%3D%2214%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M20%2012L12%2020M12%2012L20%2020%22%20stroke%3D%22%2339180F%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E'),_pointer]"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
        <div className="absolute top-30 left-1/2 -translate-x-1/2 z-210 md:top-15 md:left-15 md:translate-x-0 ">
          <button
            onClick={() => setIsOpen(false)}
            className={`text-[#39180F]  p-3 cursor-pointer md:border rounded-full  bg-[#F5EDDE] border-[#39180F]/20 transition-all  duration-700 ${
              isOpen ? "scale-100 rotate-0" : "scale-0 rotate-180"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          className={`absolute bottom-0 left-0 right-0 md:bottom-auto md:top-0 md:left-0 md:right-auto md:w-96  mb-2 bg-[#F5EDDE] rounded-lg px-3 h-[70vh] md:pt-30 pb-10 mx-2 transition-transform duration-700 ease-in-out flex flex-col  mt-5 md:h-[96vh] shadow-2xl ${
            isOpen
              ? "translate-y-0 md:translate-x-0"
              : "translate-y-full md:translate-y-0 md:-translate-x-full"
          }`}
        >
          <div className="overflow-y-auto grow mb-8">
            <ul className="menu menu-vertical text-[#39180F] font-medium text-lg gap-2">
              {links}
            </ul>
          </div>
          <div className="w-full flex flex-col items-center">
            <div className="flex justify-center gap-8 mb-6 text-[#39180F]">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="hover:text-[#945947] transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
            <div className="w-full border-t border-[#39180F]/10 mb-6" />
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="text-[#39180F] font-bold tracking-widest text-sm hover:text-[#945947]"
            >
              ACCOUNT
            </Link>
          </div>
        </div>
      </aside>
    </header>
  );
}
