"use client";
import React from 'react';
import Link from 'next/link';

export default function Banner() {
  return (
    <section className="relative w-full h-160 md:h-95 lg:h-110 xl:h-170 flex flex-col md:flex-row items-center justify-center md:justify-start overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('./banner.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 container xl:px-38 lg:px-12 md:px-8 px-6 flex flex-col h-full md:h-auto justify-between md:justify-center py-16 md:py-0 ">
        <div className=" text-[#E5DAC6] text-center md:text-left order-1">
          <p className="text-lg md:text-xl mb-4 md:mb-8 drop-shadow-sm">
            Discover our curated collection of premium essentials designed for the modern <br /> lifestyle. Quality meets comfort in every piece.
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">
            Elevate Your Style
          </h1>
        </div>

        <div className="md:mt-0 mt-auto flex justify-center md:justify-start order-2">
          <Link 
            href="/shop"
            className="inline-block md:bg-[#39180F]  md:text-white md:px-30 md:py-4 px-15 py-3  text-lg rounded-full font-medium hover:bg-transparent border-2 md:border-[#39180F]  hover:text-[#39180F]  transition-all duration-300 bg-white text-[#39180F] border-white hover:border-[#39180F]"
          >
            SHOPE NOW
          </Link>
        </div>
      </div>
    </section>
  );
}