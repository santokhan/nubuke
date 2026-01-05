"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function Mission() {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    fetch("/logo.json")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setLogos(data))
      .catch((err) => console.error("Error loading logos:", err));
  }, []);

  return (
    <section className="bg-white py-12  overflow-hidden">
      <div className="  text-center px-4  xl:px-38 lg:px-12 md:px-8 space-y-3 ">
        <h2 className="text-[#39180F] text-3xl md:text-4xl font-medium uppercase italic tracking-tight leading-tight">
          The Future Of Chocolate Is Here
        </h2>
        <p className="text-[#945947] text-lg font-medium  mx-auto  leading-relaxed">
          Our mission is simple: Create <span className="italic">freakishly delicious chocolate</span> that&apos;s actually good for you.
        </p>
        
        <Link 
          href="/shop"
          className="inline-block bg-[#39180F] text-[#F5EDDE] px-10 py-4 rounded-full text-sm font-bold tracking-[0.2em] transition-all duration-300 hover:bg-transparent hover:text-[#39180F] border border-[#39180F]"
        >
          EXPLORE THE FLAVORS.
        </Link>
      </div>

      <div className="relative mt-8  border-[#39180F]/10 py-5 ">
        <Marquee 
          speed={100} 
          pauseOnHover={true} 
          gradient={false}
          play={logos.length > 0}
        >
          {logos.map((logo) => (
            <div 
              key={logo.id} 
              className="mx-12 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            >
              <Image
                src={logo.image}
                alt={logo.name}
                width={200}
                height={80}
                className="h-8  w-auto object-contain"
                unoptimized={logo.image.includes('placehold.co')}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}