"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
      name: 'Instagram', 
      href: 'https://instagram.com', 
      icon: <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> 
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

  const links = (
    <>
      <li>
        <Link className="hover:text-[#945947] hover:bg-transparent" href="/">
          HOME
        </Link>
      </li>
      <li>
        <details className="hover:text-[#945947] hover:bg-transparent">
          <summary className="hover:bg-[#F5EDDE]">SHOPE</summary>
          <ul className="p-2 hover:bg-[#F5EDDE] w-40 z-10 flex flex-col gap-1">
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
        <details className="hover:text-[#945947] hover:bg-transparent">
          <summary className="hover:bg-[#F5EDDE]">ABOUT</summary>
          <ul className="p-2 bg-[#F5EDDE] w-40 flex flex-col gap-1">
            <li>
              <Link
                href="/sub1"
                className="relative text-[#39180F] font-bold after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-[#39180F] after:transition-all after:duration-300 hover:after:w-full hover:bg-[#F5EDDE]"
              >
                Submenu 1
              </Link>
            </li>
            <li>
              <Link
                href="/sub2"
                className="relative text-[#39180F] font-bold after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-[#39180F] after:transition-all after:duration-300 hover:after:w-full hover:bg-[#F5EDDE]"
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
          href="/item3"
        >
          STORE LOCATOR
        </Link>
      </li>
      <li>
        <Link
          className="hover:text-[#945947] hover:bg-transparent"
          href="/item3"
        >
          THE CIRCLE
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-[#F5EDDE]  xl:px-38 lg:px-12 md:px-8 relative lg:py-5 ">
      <div className="navbar-start">
        <div className="flex items-center gap-4 lg:hidden">
          <button onClick={() => setIsOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
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
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
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
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1 text-[#39180F] font-bold text-lg">
            {links}
          </ul>
        </div>
      </div>

      <div className="navbar-center">
        <Link
          href="/"
          className="text-4xl md:text-5xl font-bold text-[#39180F]"
        >
         <h1> Nubuke</h1>
        </Link>
      </div>

      <div className="navbar-end gap-5 text-[#39180F]">
        <button className="hidden lg:block">
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
        <Link href="/account" className="hidden lg:block">
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
        <Link href="/cart">
          <div className="indicator">
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
        </Link>
      </div>

      <div
        className={`fixed inset-0 z-100 transition-opacity duration-700 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } `}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm " />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-110 ">
          <button
            onClick={() => setIsOpen(false)}
            className={`bg-[#39180F] text-white p-3 rounded-full shadow-lg transition-all duration-700 ease-in-out ${
              isOpen
                ? "scale-100 rotate-0 translate-y-0"
                : "scale-0 rotate-180 -translate-y-10"
            }`}
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
        <div
          className={`absolute bottom-0 left-0 right-0 bg-[#F5EDDE] rounded-xl px-6 pt-12 pb-10 transition-transform duration-700 ease-in-out flex flex-col max-h-[85vh] shadow-2xl h-screen ${
            isOpen ? "translate-y-0" : "translate-y-full"
          } mx-2 my-2`}
        >
          <div className="overflow-y-auto grow mb-8">
            <ul className="menu menu-vertical text-[#39180F] font-medium text-lg gap-2 ">
              {links}
            </ul>
          </div>
          <div className="w-full flex flex-col ">
            <div className="flex justify-center gap-10 mb-6 text-[#39180F]">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="hover:text-[#945947] transition-colors"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
            <div className="w-full border-t border-[#39180F]/10 mb-6" />
            <Link
              href="/account"
              onClick={() => setIsOpen(false)}
              className="text-[#39180F] font-medium tracking-widest text-sm hover:text-[#945947]"
            >
              ACCOUNT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
