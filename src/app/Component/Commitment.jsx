"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Commitment() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/commitment.json");
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error loading JSON:", error);
      }
    };
    fetchData();
  }, []);

  if (!data) return null;

  return (
    <section className="xl:px-38 lg:px-12 md:px-8 py-20 px-4 overflow-hidden">
      <div className="text-[#2D1B14] text-center">
        <div className="max-w-3xl mb-20 text-center mx-auto">
          <h1 
            className="text-[#2D1B14] text-3xl font-serif font-medium mb-6"
            dangerouslySetInnerHTML={{ __html: data.heading }}
          />
          <p 
            className="text-[#2D1B14] text-md"
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </div>

        <div className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
          justify-start lg:justify-between">
          
          {data.cards.map((card, idx) => (
            <div 
              key={idx} 
              className="flex flex-col shrink snap-center group w-[75vw] sm:w-[45vw] lg:w-[35%] min-w-70 lg:min-w-0"
            >
              <div className="relative aspect-6/6  w-full mb-6 overflow-hidden rounded-2xl">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex flex-col grow text-left">
                <h2 className="text-xl text-[#2D1B14] md:text-2xl font-serif font-medium mb-4 tracking-tight text-center">
                  {card.title}
                </h2>
                
                <p 
                  className="text-sm text-[#2D1B14] md:text-base leading-relaxed mb-6 grow"
                  dangerouslySetInnerHTML={{ __html: card.text }}
                />
                
                <div className="text-center w-full">
                  <Link
                    href={card.link}
                    className="inline-block w-fit text-xs md:text-sm font-bold uppercase tracking-widest border-2 border-[#2D1B14] py-3 px-4 rounded-full transition-all duration-300 hover:bg-[#2D1B14] hover:text-[#F5EDDE]"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}