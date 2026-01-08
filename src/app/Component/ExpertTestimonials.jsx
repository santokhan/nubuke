"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function ExpertTestimonials() {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [experts, setExperts] = useState([]);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    fetch("/expertInfo.json")
      .then((res) => res.json())
      .then((data) => setExperts(data))
      .catch((err) => console.error(err));
  }, []);

  const updateProgress = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const canScroll = scrollWidth > clientWidth;
      setIsScrollable(canScroll);

      if (canScroll) {
        const maxScroll = scrollWidth - clientWidth;
        const viewableRatio = clientWidth / scrollWidth;
        const scrollableRatio = scrollLeft / maxScroll;
        const startPoint = viewableRatio * 100;
        setProgress(startPoint + (isNaN(scrollableRatio) ? 0 : scrollableRatio * (100 - startPoint)));
      }
    }
  };

  useEffect(() => {
    if (experts.length > 0) setTimeout(updateProgress, 100);
    const currentRef = scrollRef.current;
    currentRef?.addEventListener("scroll", updateProgress);
    window.addEventListener("resize", updateProgress);
    return () => {
      currentRef?.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [experts]);

  return (
    <section className="bg-[#F5EDDE] py-20 xl:px-38 lg:px-12 md:px-8 px-4 ">
      <h1 className="text-3xl md:text-4xl font-medium text-[#39180F] mb-10">
        What experts are saying:
      </h1>

      <div
        ref={scrollRef}
        className="flex flex-row gap-6 items-start overflow-x-auto snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {experts.map((expert) => (
          <div
            key={expert.id}
            className="bg-[#9926090d] p-8 rounded  flex flex-col min-w-[85vw] md:min-w-100 lg:flex-1 "
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="relative w-14 h-14 shrink-0">
                <Image
                  src={expert.image}
                  alt={expert.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex gap-0.5 mb-1">
                  {[...Array(expert.stars)].map((_, i) => (
                    <span key={i} className="text-[#39180F] text-lg">★</span>
                  ))}
                </div>
                <div className="flex items-center text-[#634841] whitespace-nowrap ">
                  <p>{expert.name}</p>
                  <span className="mx-1 h-4 w-px bg-black opacity-20"></span>
                  <p>{expert.bio}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-[#39180F] leading-relaxed">
                &ldquo;{expert.comment}&rdquo;
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-10 w-full transition-opacity duration-500 ${isScrollable ? "opacity-100" : "opacity-0"}`}>
        <div className="h-px bg-[#39180F]/20 relative">
          <div
            className="absolute top-0 left-0 h-0.5 bg-[#39180F] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
}