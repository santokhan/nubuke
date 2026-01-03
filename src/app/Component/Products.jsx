"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Products() {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/cardData.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  const updateProgress = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const viewableRatio = clientWidth / scrollWidth;
      const scrollableRatio = scrollLeft / maxScroll;
      const startPoint = viewableRatio * 100;
      const currentProgress =
        startPoint +
        (isNaN(scrollableRatio) ? 0 : scrollableRatio * (100 - startPoint));
      setProgress(currentProgress);
    }
  };

  useEffect(() => {
    if (products.length > 0) setTimeout(updateProgress, 100);
  }, [products]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const offset = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", updateProgress);
      window.addEventListener("resize", updateProgress);
    }
    return () => {
      currentRef?.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [products]);

  return (
    <section className="bg-[#F5EDDE] py-12 xl:px-38 lg:px-12 md:px-8 px-4 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-3">
          <h2 className="text-[#39180F] text-3xl md:text-4xl font-medium uppercase tracking-tight italic">
            SHOP DATE-SWEETENED CHOCOLATE
          </h2>
          <h3 className="text-[#945947] font-semibold tracking-[0.2em] uppercase ">
            Our Collection
          </h3>
        </div>

        <Link
          href="/shop"
          className="group flex items-center gap-4 text-[#39180F] font-medium text-sm cursor-pointer"
        >
          <span className="relative text-nowrap">
            VIEW ALL
            <span className="absolute left-0 -bottom-1 w-full h-[1.5px] bg-[#39180F] origin-right scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left"></span>
          </span>

          <div className="flex items-center justify-center h-6 w-6 rounded-full border border-[#39180F]/10 transition-all duration-300 group-hover:bg-[#39180F] group-hover:text-white bg-[#ebdfca] group-hover:border-[#39180F] p-1">
            <svg
              className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Link>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto no-scrollbar pb-12 snap-x snap-mandatory scroll-smooth touch-pan-x"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((item, index) => (
          <div
            key={item.id}
            className="min-w-80 flex flex-col snap-start group bg-white rounded-lg cursor-pointer"
          >
            <div className="relative aspect-square overflow-hidden mb-6 bg-[#E5DAC6] rounded-t-lg">
              {index === 0 && (
                <div className="absolute top-0 left-0 w-full bg-[#39180F]/90 text-[#F5EDDE] py-2.5 text-center text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] z-20 ">
                  Pre-order now : will be deliver within 5-7 days
                </div>
              )}
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 300px, 400px"
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                priority={index < 2}
              />
            </div>

            <div className="flex flex-col gap-5 px-4 pb-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col space-y-4">
                  <h4 className="text-[#39180F] font-bold text-xl md:text-lg leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-[#945947] text-lg font-medium">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col items-end ">
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-[#39180F]">
                      <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-medium text-lg">{item.rating}</span>
                      <p className="text-lg text-[#39180F]/50 font-medium tracking-tighter">
                        ({item.reviews})
                      </p>
                    </div>
                  </div>
                  <div className="h-12 flex items-center overflow-hidden">
                    <button className="whitespace-nowrap bg-[#39180F] text-[#F5EDDE] py-2.5 px-6 text-xs tracking-[0.2em] font-bold rounded-full transition-all duration-500 ease-out opacity-100 translate-y-0 md:opacity-0 md:translate-y-full group-hover:opacity-100 group-hover:translate-y-0 hover:border hover:border-gray-300 hover:bg-transparent hover:text-black cursor-pointer ">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-12 mt-8">
        <div className="grow h-px bg-[#39180F]/20 relative">
          <div
            className="absolute top-0 left-0 h-0.5 bg-[#39180F] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="hidden md:flex gap-6">
          <button
            onClick={() => scroll("left")}
            className="group relative p-3 border border-[#39180F]/20 rounded-full text-[#39180F] transition-all duration-300 hover:bg-[#39180F] hover:text-[#F5EDDE] cursor-pointer"
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute left-[50%] translate-x-1 h-[1.5px] w-0 bg-current transition-all duration-300 group-hover:w-3 group-hover:translate-x-0"></span>
              <svg
                className="h-6 w-6 transition-transform duration-300 group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </div>
          </button>

          <button
            onClick={() => scroll("right")}
            className="group relative p-3 border border-[#39180F]/20 rounded-full text-[#39180F] transition-all duration-300 hover:bg-[#39180F] hover:text-[#F5EDDE] cursor-pointer"
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute right-[50%] -translate-x-1 h-[1.5px] w-0 bg-current transition-all duration-300 group-hover:w-3 group-hover:translate-x-0"></span>
              <svg
                className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}