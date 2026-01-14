"use client";
import React from "react";
import Image from "next/image";

export default function ProductHero() {
  return (
    <section className="bg-[#F5EDDE] xl:px-38 lg:px-12 md:px-8 py-10  px-4">
      <div className=" space-y-5 flex flex-col items-center">
        <h1 className="font-quincy text-[#39180F] text-5xl md:text-8xl font-medium italic leading-tight ">
          Why Fonio?
        </h1>

        <div className="relative w-full aspect-12/4 rounded-2xl overflow-hidden  ">
          <Image
            src="/top-view-millet-grains.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
