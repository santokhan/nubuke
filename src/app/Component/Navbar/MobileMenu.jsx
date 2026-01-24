import React from "react";
import Link from "next/link";

export default function MobileMenu({
  isOpen,
  setIsOpen,
  socialLinks,
  NavLinks,
}) {
  return (
    <aside
      className={`fixed inset-0 z-200 transition-opacity duration-700 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div
        className="absolute inset-0 bg-black/40 cursor-[url('data:image/svg+xml;utf8,%3Csvg%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2216%22%20cy%3D%2216%22%20r%3D%2214%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M20%2012L12%2020M12%2012L20%2020%22%20stroke%3D%22%2339180F%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E'),_pointer]"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      <div className="absolute top-30 left-1/2 -translate-x-1/2 z-210 md:top-15 md:left-15 md:translate-x-0">
        <button
          onClick={() => setIsOpen(false)}
          className={`text-[#39180F] p-3 cursor-pointer md:border rounded-full bg-[#F5EDDE] border-[#39180F]/20 transition-all duration-700 ${isOpen ? "scale-100 rotate-0" : "scale-0 rotate-180"}`}
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
        className={`absolute bottom-0 left-0 right-0 md:bottom-auto md:top-0 md:left-0 md:right-auto md:w-96 mb-2 bg-[#F5EDDE] rounded-lg px-3 h-[70vh] md:pt-30 pb-10 mx-2 transition-transform duration-700 ease-in-out flex flex-col mt-5 md:h-[96vh] shadow-2xl ${isOpen ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-y-0 md:-translate-x-full"}`}
      >
        <div className="overflow-y-auto grow mb-8">
          <ul className="menu menu-vertical text-[#39180F] font-medium text-lg gap-2">
            <NavLinks />
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
  );
}
