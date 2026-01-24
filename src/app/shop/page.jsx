"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { Star } from "lucide-react";

export default function ShopPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("/cardData.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  return (
    <div className="bg-[#F5EDDE] xl:px-38 lg:px-12 md:px-8 px-4 min-h-screen text-[#39180F] py-15">
      <h1 className="lg:text-5xl font-semibold tracking-tight text-center py-5 text-4xl lg:mb-10">
        The Tiny Grain with Mighty Benefits
      </h1>
      <div className="bg-[linear-gradient(60deg,#39180F_0%,#5A2A1D_50%,#39180F_100%)] text-[#F5EDDE] max-w-4xl mx-auto rounded-lg md:py-10 py-5 px-4">
        <div className=" flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center">
          <div className="flex flex-col items-center md:items-start text-nowrap  text-[#E5DAC6]">
            <span className="font-bold uppercase tracking-normal lg:text-md text-sm">
              Bundle and Save
            </span>
            <span className=" opacity-70 font-light lg:text-md text-sm">
              mix and match flavors
            </span>
          </div>
          <div className="w-1 h-6 hidden md:block bg-[#E5DAC6]"></div>
          <div className="w-full  block md:hidden bg-[#F5EDDE]/20"></div>
          <div className="md:flex w-full items-center gap-6 md:gap-8 font-medium">
            <div className="flex md:flex-col justify-between flex-row  w-full items-center text-[#E5DAC6]">
              <span className="font-bold lg:text-md text-sm ">
                5 Bars: 5% OFF
              </span>
              <span className="opacity-80 lg:text-md text-sm ">
                $9.50 / bar
              </span>
            </div>
            <div className="w-3 h-6 hidden md:block  bg-[#E5DAC6]"></div>
            <div className="w-full  border my-2 md:hidden  border-[#E5DAC6]"></div>
            <div className="flex md:flex-col justify-between flex-row  w-full items-center ">
              <span className="font-bold lg:text-md text-sm text-[#E5DAC6]">
                10 Bars: 15% OFF
              </span>
              <span className=" opacity-80 lg:text-md text-sm ">
                $8.50 / bar
              </span>
            </div>
            <div className="w-3 h-6 hidden md:block bg-[#F5EDDE]/20"></div>
              <div className="w-full  border my-2 md:hidden  border-[#E5DAC6]"></div>
            <div className="flex md:flex-col justify-between flex-row  w-full items-center ">
              <span className="font-bold lg:text-md text-sm text-[#E5DAC6]">
                15+ Bars: 20% OFF
              </span>
              <span className=" opacity-80 lg:text-md text-sm ">$8 / bar</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16  mt-15">
        {products.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col cursor-pointer bg-white rounded-lg "
            onClick={() => router.push(`/products/${item.id}`)}
          >
            <div className="relative aspect-square overflow-hidden rounded-t-lg ">
              <Image
                src={item.images[0]}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-0"
              />

              {item.images[1] && (
                <Image
                  src={item.images[1]}
                  alt={`${item.name} alternate`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100"
                />
              )}

              <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                  className="w-full bg-[#39180F] text-[#F5EDDE] py-3 rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-[#945947] cursor-pointer"
                >
                  Add to Cart +
                </button>
              </div>
            </div>

            <div className="flex flex-col flex-1 space-y-2 p-8">
              <div className="flex justify-between items-start gap-4">
                <h3 className="font-bold text-lg md:text-xl tracking-tight leading-tight min-h-12 line-clamp-2">
                  {item.name}
                </h3>
                <div className="flex flex-col items-end shrink-0">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-[#39180F] text-[#39180F]" />
                    <span className="text-sm font-bold">{item.rating}</span>
                    <span className="text-xs opacity-60">({item.reviews})</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-2 flex justify-between items-center border-t border-[#39180F]/5">
                <span className="  text-[#39180F]/60">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
