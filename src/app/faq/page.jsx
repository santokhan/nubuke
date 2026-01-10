"use client";
import { useEffect, useState } from "react";

export default function FaqPage() {
  const [faqs, setFaqs] = useState([]);

  const [openIndex, setOpenIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    fetch("/faq.json")
      .then((res) => res.json())
      .then((data) => setFaqs(data));
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="bg-[#F5EDDE] xl:px-50 lg:px-12 md:px-8 px-4">
      <div className="">
        <h1 className="text-4xl mb-15 text-[#39180F]  text-center italic">
          Frequently Asked Questions
        </h1>
        <div className="
        xl:max-w-5xl lg:max-w-3xl bg-[#c7bca715]  mx-auto py-10 text-[#39180F] px-4 md:px-15 rounded-2xl">
            {faqs.map((item, index) => (
          <div
            key={index}
            className="border-b border-[#dacfcd] "
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div className="flex items-center justify-between py-4">
              <p
                className="md:text-lg font-bold cursor-pointer w-full"
                onClick={() => toggle(index)}
              >
                {item.question}
              </p>

              <button
                onClick={() => toggle(index)}
                className={`w-6 h-6 flex items-center justify-center rounded-full transition cursor-pointer  ${
                  hoverIndex === index
                    ? "bg-[#39180F] text-white"
                    : "bg-[#39180F]/10"
                }`}
              >
                <svg
                  className={`w-5 h-5 py-1 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {openIndex === index && (
              <div className="pb-4 pr-10">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
        </div>
        <div className="text-center mt-15">
        <p>Our customer support is available Monday to Friday: 8am-8:30pm.</p>
        <p className="opacity-70">Average answer time: 24h</p>
      </div>
      </div>
      
    </div>
  );
}
