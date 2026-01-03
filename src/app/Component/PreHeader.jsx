"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const slides = [
  "HAPPY NEW YEAR! LIVE NOW: BUY 10 BARS GET 5 FREE!",
  "FREE SHIPPING ON ALL ORDERS OVER $70",
  "LIMITED TIME OFFER – SHOP NOW",
  "SUBSCRIBE & SAVE UP TO 30%",
];

export default function PreHeader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full px-4 py-2 flex items-center justify-center bg-[#39180F] gap-6 text-sm font-medium text-[#E5DAC6]">
      <button
        onClick={() =>
          setIndex((prev) => (prev - 1 + slides.length) % slides.length)
        }
        className="text-xl shrink-0"
      >
        ❮
      </button>

      <div className="relative h-5 w-105 overflow-hidden text-center ">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {slides[index]}
          </motion.span>
        </AnimatePresence>
      </div>

      <button
        onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
        className="text-xl shrink-0"
      >
        ❯
      </button>
    </div>
  );
}
