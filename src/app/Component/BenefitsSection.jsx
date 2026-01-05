"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function BenefitsScroll() {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    fetch("/benefits.json")
      .then((res) => res.json())
      .then((val) => setData(val))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(parseInt(entry.target.getAttribute("data-index")));
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [data]);

  if (data.length === 0) return null;

  return (
    <section className="bg-[#F5EDDE] relative xl:px-38 lg:px-12 md:px-8 px-4 pt-20 ">
     <div>
         <h1 className="text-[#39180F] text-5xl md:text-7xl italic md:text-center mb-10">
        The Benefits Of Nubuke{" "}
      </h1>
     </div>
      <div className="hidden md:flex  flex-row items-start ">
        <div className="w-[50%]  ">
          {data.map((item, index) => (
            <div
              key={item.id}
              data-index={index}
              ref={(el) => (sectionRefs.current[index] = el)}
              className=" flex h-screen flex-col justify-center mb-32 last:mb-0 "
            >
              <div className="flex scroll-smooth  items-center gap-4 mb-6 text-[#39180F] font-bold">
                <span className="w-12 h-0.5 bg-[#39180F]"></span>
                <span className="text-xl tracking-widest">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h2 className="font-quincy text-[#39180F] text-4xl lg:text-4xl xl:text-5xl md:text-4xl font-medium mb-8 leading-tight">
                {item.title}
              </h2>
              <p className="text-[#945947] text-xl md:text-xl leading-relaxed max-w-md">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className=" w-[50%]  sticky top-60 flex items-center overflow-hidden">
          <div className="relative w-full h-full flex items-center">
            <div className="relative w-full md:h-[60vh] xl:h-[70vh] rounded-lg overflow-hidden bg-[#39180F]">
              {data.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    zIndex: data.length - index,
                    clipPath:
                      activeIndex > index
                        ? "inset(0 0 100% 0)"
                        : "inset(0 0 0% 0)",
                    transition:
                      "clip-path 0.6s cubic-bezier(0.77, 0, 0.175, 1)",
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-1000 ${
                      activeIndex === index ? "scale-100" : "scale-110"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-[#39180F]/10" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden overflow-x-auto snap-x snap-mandatory flex gap-6 no-scrollbar scroll-smooth">
        {data.map((item, index) => (
          <div
            key={item.id}
            className="min-w-[75vw] snap-center rounded-md overflow-hidden"
          >
            <div className="relative w-full h-100 ">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover rounded-md"
                unoptimized
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6 text-[#39180F] font-bold">
                <span className="w-12 h-0.5 bg-[#39180F]"></span>
                <span className="text-xl tracking-widest">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className=" text-[#39180F] text-3xl font-medium mb-4">
                {item.title}
              </h3>
              <p className="text-[#945947] text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}