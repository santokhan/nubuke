"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Faq() {
  const router = useRouter();
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    fetch("/faq.json")
      .then((res) => res.json())
      .then((data) => setFaqs(data.slice(0, 5)));
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="xl:max-w-5xl lg:max-w-3xl  mx-auto py-10 text-[#39180F] px-4 xl:px-50 lg:px-12 md:px-8 scroll-smooth">
      <h1 className="text-4xl mb-15 text-center italic">Frequently Asked Questions</h1>
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
                hoverIndex === index ? "bg-[#39180F] text-white" : "bg-[#39180F]/10"
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

      <div className="text-center pt-8">
        <button
          onClick={() => router.push("/faq")}
          className=" bg-transparent border-2 border-[#39180F] rounded-full text-[#39180F] py-3 px-5 font-bold uppercase cursor-pointer hover:bg-[#39180F] hover:text-[#F5EDDE]"
        >
          See More
        </button>
      </div>
    </div>
  );
}
