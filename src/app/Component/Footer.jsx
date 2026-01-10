"use client";
import React from "react";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaTiktok,
  FaChevronRight,
} from "react-icons/fa";

export default function Footer() {
  const companyLogos = [
    {
      name: "Apple",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
      name: "Amazon",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
      name: "Nike",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    },
    {
      name: "Starbucks",
      image:
        "https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg",
    },
    {
      name: "Tesla",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
    },
  ];

  return (
    <footer className="bg-[#39180F]   xl:px-38 lg:px-12 md:px-8 px-4 flex flex-col justify-center gap-20 py-15">
      <div className="flex justify-between gap-10 flex-wrap">
        <form>
          <h6 className="text-2xl font-serif italic text-[#E5DAC6] mb-4">
            Sign up to our newsletter
          </h6>
          <fieldset className="w-80 relative border border-[#E5DAC6]/30 rounded-lg">
            <input
              type="text"
              id="newsletter-email"
              placeholder=" "
              className="peer py-3 px-3 pr-12 w-full bg-transparent outline-0 text-[#E5DAC6] placeholder-transparent"
            />
            <label
              htmlFor="newsletter-email"
              className="absolute left-3 top-3  text-[#E5DAC6]/60 text-base transition-all duration-300 pointer-events-none 
      peer-focus:-top-0.5 peer-focus:left-0 peer-focus:text-xs p-1 peer-focus:text-[#E5DAC6] 
      peer-[:not(:placeholder-shown)]:-top-0.5 peer-[:not(:placeholder-shown)]:left-0 peer-[:not(:placeholder-shown)]:text-xs"
            >
              E-mail
            </label>
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-400/10 hover:bg-white hover:text-[#39180F] cursor-pointer transition-colors"
            >
              <FaChevronRight size={12} />
            </button>
          </fieldset>
        </form>

        <div className="flex gap-20 flex-wrap">
          <nav className="flex flex-col gap-5">
            <h6 className="font-bold text-[#E5DAC6]">Pages</h6>
            <a className="cursor-pointer hover:text-white text-[#E5DAC6] ">
              Home
            </a>
            <a className="cursor-pointer hover:text-white text-[#E5DAC6]">
              Shop All Chocolates
            </a>
            <a className="cursor-pointer hover:text-white text-[#E5DAC6]">
              Subscribe & Save
            </a>
            <a className="cursor-pointer hover:text-white text-[#E5DAC6]">
              Our Story
            </a>
            <a className="cursor-pointer hover:text-white text-[#E5DAC6]">
              Sustainability
            </a>
            <a className="cursor-pointer hover:text-white text-[#E5DAC6]">
              Sourcing
            </a>
            <a className="cursor-pointer hover:text-white text-[#E5DAC6]">
              Wholesale
            </a>
          </nav>

          <nav className="flex flex-col gap-5">
            <h6 className="font-bold text-[#E5DAC6]">Others</h6>
            <a className="cursor-pointer hover:text-white text-[#E5DAC6]">
              FAQ
            </a>
            <a className="cursor-pointer hover:text-white text-[#E5DAC6]">
              Refund Policy
            </a>
            <a className="cursor-pointer hover:text-white text-[#E5DAC6]">
              Terms of Service
            </a>
            <a className="cursor-pointer hover:text-white text-[#E5DAC6]">
              Privacy Policy
            </a>
            <a className="cursor-pointer hover:text-white text-[#E5DAC6]">
              Affiliate Program
            </a>
          </nav>
          <nav className="flex flex-col gap-5">
            <h6 className="font-bold text-[#E5DAC6]">Support</h6>
            <a className="cursor-pointer hover:text-white text-[#E5DAC6]">
              Contact
            </a>
            <a className="cursor-pointer hover:text-white text-[#E5DAC6]">
              support@theconsciousbar.co
            </a>
          </nav>
        </div>
      </div>

      <div className=" py-6 flex flex-col md:flex-row md:justify-between gap-10">
        <div className="flex flex-col md:gap-10 gap-5">
          <div className="flex md:gap-9 gap-5">
            <FaFacebook size={28} />
            <FaInstagram size={28} />
            <FaYoutube size={28} />
            <FaLinkedin size={28} />
            <FaTiktok size={28} />
          </div>
           <p className="mt-2 md:mt-0 text-sm  md:block hidden">
            Follow us on social media for the latest updates
          </p>
        </div>
        <div className="space-y-5">
          <div className="flex gap-2 h-full flex-wrap md:justify-end md:items-end ">
            {companyLogos.map((logo, index) => (
              <div key={index} className="w-12 h-8 relative">
                <Image
                  src={logo.image}
                  alt={logo.name}
                  fill
                  className="object-contain bg-white p-1 rounded-lg"
                />
              </div>
            ))}
          </div>

          <p className="mt-2 md:mt-0 text-sm md:hidden ">
            Follow us on social media for the latest updates
          </p>
        </div>
      </div>
    </footer>
  );
}
