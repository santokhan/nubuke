"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowUpRight, Tag, Van, ZoomIn } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [cursor, setCursor] = useState({ show: false, side: null, x: 0, y: 0 });
  const [fullView, setFullView] = useState(false);
  const [hoverPlus, setHoverPlus] = useState(false);
  const [bundleCount, setBundleCount] = useState(1);
  const [bar, setBars] = useState([]);

  const [openIndex, setOpenIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    fetch("/cardData.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const found = data.find((p) => p.id === parseInt(id));
        setProduct(found);
      });
  }, [id]);

  useEffect(() => {
    fetch("/bar.json")
      .then((res) => res.json())
      .then((data) => setBars(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  const parseCount = (str) => {
    const num = parseInt(str);
    return isNaN(num) ? 1 : num;
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5EDDE] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const prevImage = () => {
    setSelectedImage((i) => (i === 0 ? product.images.length - 1 : i - 1));
  };

  const nextImage = () => {
    setSelectedImage((i) => (i === product.images.length - 1 ? 0 : i + 1));
  };

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#F5EDDE] py-10 px-4 md:px-12  xl:px-36 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
        <div className="w-full lg:w-3/5 flex flex-col xl:flex-row gap-6 lg:sticky top-10 self-start">
          <div className="w-full xl:w-30 order-2 xl:order-1 flex flex-row xl:flex-col gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-md border cursor-pointer ${
                  selectedImage === idx
                    ? "border-[#39180F]"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={img}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <div
            className="relative w-full order-1 xl:order-2 cursor-none"
            onMouseMove={(e) => {
              if (!hoverPlus && !fullView) {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                setCursor({
                  show: true,
                  side: x < rect.width / 2 ? "left" : "right",
                  x,
                  y,
                });
              }
            }}
            onMouseLeave={() =>
              setCursor({ show: false, side: null, x: 0, y: 0 })
            }
            onClick={() => {
              if (!hoverPlus && !fullView) {
                if (cursor.side === "left") prevImage();
                if (cursor.side === "right") nextImage();
              }
            }}
          >
            <div className="aspect-square w-[80%] h-[80%]">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="rounded-xl select-none"
              />
            </div>

            <button
              onMouseEnter={() => setHoverPlus(true)}
              onMouseLeave={() => setHoverPlus(false)}
              onClick={() => setFullView(true)}
              className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#39180F] text-[#F5EDDE] flex items-center justify-center"
            >
              <ZoomIn size={15} />
            </button>

            {cursor.show && !hoverPlus && !fullView && (
              <div
                className="absolute pointer-events-none"
                style={{
                  left: cursor.x,
                  top: cursor.y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-10 h-10 rounded-full bg-[#F5EDDE] flex items-center justify-center text-[#39180F]">
                  {cursor.side === "left" ? (
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-3 h-3"
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
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-2/5 max-h-[calc(100vh-5rem)] overflow-y-auto pr-2 flex flex-col justify-start space-y-6">
          <p className="text-sm tracking-[0.2em] uppercase text-[#39180F]/70">
            The Conscious Bar
          </p>

          <h1 className="text-[#39180F] text-2xl md:text-3xl  font-medium  uppercase">
            {product.name}
          </h1>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(product.rating)
                      ? "text-[#39180F]"
                      : "text-[#39180F]/20"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[#39180F] font-medium">
              {product.rating} ({product.reviews})
            </span>
          </div>

          <p className="text-lg md:text-xl text-[#39180F] ">
            ${product.price.toFixed(2)}
          </p>

          <p className="pb-4 border-b border-[#39180F]/20 text-[#39180F]/80">
            Ethically sourced, minimally processed, and crafted for conscious
            living.
          </p>

          <div className="space-y-3">
            <p className="uppercase tracking-[0.2em] text-sm text-[#39180F] font-medium">
              Flavor
            </p>

            <details className="mt-2 group">
              <summary className="flex justify-between items-center p-3 rounded-lg cursor-pointer text-[#39180F] list-none bg-[#E5DAC6]">
                <div className="flex items-center gap-3">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="rounded-lg w-15 h-15 object-cover"
                  />
                  <span>{product.name}</span>
                </div>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>

              <div className="mt-3 flex flex-col gap-2 max-h-80 overflow-y-auto pr-1 bg-[#2F130C10] rounded-lg">
                {products.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => (window.location.href = `/products/${p.id}`)}
                    className="flex items-center gap-3 p-2 rounded hover:bg-[#39180F]/5"
                  >
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      width={100}
                      height={100}
                      className="rounded-lg w-15 h-15 object-cover"
                    />
                    <span className="text-[#39180F]">{p.name}</span>
                  </button>
                ))}
              </div>
            </details>
          </div>

          <div className="space-y-4 pt-4">
            <p className="text-[#39180F] font-medium">
              Bundle and Save (Includes items in cart)
            </p>

            <div className="flex gap-3 justify-between text-nowrap">
              {bar.map((qty) => {
                const numericCount = parseCount(qty.count);
                return (
                  <button
                    key={qty.id}
                    onClick={() => setBundleCount(numericCount)}
                    className={` flex flex-col items-center justify-center rounded-lg font-medium w-full py-4 hover:bg-[#39180F]  cursor-pointer  hover:text-[#F5EDDE] ${
                      bundleCount === numericCount
                        ? " bg-[#39180F] text-[#F5EDDE]"
                        : " text-[#39180F] bg-[#E5DAC6]"
                    }`}
                  >
                    <span className="font-bold ">
                      {qty.count} {qty.name}
                    </span>
                    <div
                      className={`hover:text-[#39180F] bg-white px-1 rounded-full  ${
                        bundleCount === numericCount
                          ? " bg-[#39180F] text-[#39180F]/70 "
                          : " text-green-800/60 "
                      }`}
                    >
                      {qty.off && <span className="text-xs  ">{qty.off}</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4 border justify-center border-[#39180F]/10 w-37 p-1 rounded-full">
              <button
                onClick={() => setBundleCount(Math.max(1, bundleCount - 1))}
                disabled={bundleCount <= 1}
                className={`w-12 h-8 border-[#39180F]/10 border rounded-full text-xl flex items-center justify-center  ${
                  bundleCount <= 1
                    ? "border-[#39180F]/10 text-[#39180F]/40 cursor-not-allowed"
                    : "border-[#39180F]/10 text-[#39180F] hover:text-white hover:bg-[#39180F] cursor-pointer"
                }`}
                title={bundleCount <= 1 ? "Cannot reduce below 1" : ""}
              >
                −
              </button>

              <span className="text-xl font-medium text-[#39180F]">
                {bundleCount}
              </span>

              <button
                onClick={() => setBundleCount(bundleCount + 1)}
                className="w-12 h-8 border border-[#39180F]/10 rounded-full text-xl text-[#39180F] flex items-center hover:bg-[#39180F] hover:text-[#F5EDDE] justify-center cursor-pointer"
              >
                +
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <button className="font-bold py-4 rounded-full text-[#F5EDDE] bg-[#39180F] border-2 hover:bg-[#F5EDDE] hover:text-[#39180F] cursor-pointer">
                ADD TO CART
              </button>
              <button className="font-medium py-6 rounded-full border-2 text-[#F5EDDE] text-lg btn btn-primary">
                Buy with <span className="font-bold">shop</span>
              </button>
              <a className="text-[#39180F] text-center my-2" href="#">
                <span className="border-b">More payment options</span>
              </a>
            </div>
            <div className="bg-[linear-gradient(60deg,#39180F_0%,#5A2A1D_50%,#39180F_100%)] p-5 rounded-xl flex gap-5 items-center">
              <div className=" w-20 h-20 md:block hidden  shrink-0">
                <div className="relative w-full h-full">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 160px, (max-width: 1024px) 192px, 208px"
                    className="rounded-lg object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="text-[#F5EDDE] space-y-1 ">
                <h1 className="text-xl xl:text-2xl font-bold">
                  Subscribe and Save UP TO 30% OFF
                </h1>
                <p className="text-xs xl:text-sm">
                  We will send you chocolate every 2 to 4 weeks automatically.
                  Cancel anytime.
                </p>
                <button className="flex gap-1 border-b text-sm xl:text-lg">
                  Create your package <ArrowUpRight />
                </button>
              </div>
            </div>
            <div className=" space-y-5 text-[#628036]">
              <div className="bg-white p-4 rounded-lg ">
                <h2 className="text-lg font-bold  mb-4 flex gap-1 items-center">
                  <Tag size={20} />
                  <span>BUNDLE & SAVE</span>
                </h2>
                <ul className="list-disc pl-5 space-y-2 ">
                  <li>Buy 5 bars to get 5% off</li>
                  <li>Buy 10 bars to get 15% off</li>
                  <li>Buy 15 bars to get 20% off</li>
                  <li>Free shipping</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h2 className="text-lg font-bold  mb-4 flex items-center gap-1">
                  <Van size={20} />
                  <span>SHIPPING</span>
                </h2>
                <p className=" text-sm leading-relaxed">
                  All orders over <span className="font-semibold">$70</span> get
                  <span className="font-semibold"> FREE shipping</span>.
                  <br />
                  Standard shipping rate:{" "}
                  <span className="font-semibold">$9.99</span>.
                </p>
              </div>
            </div>

            <div className="mt-10 text-[#39180F]  scroll-smooth border-t  border-[#dacfcd]">
              {[
                { title: "Description", content: product.description },
                { title: "Ingredients", content: product.ingredients },
                { title: "Nutrition Label", content: product.nutrition },
              ].map((item, index) => (
                <div
                  key={index}
                  className="border-b border-[#dacfcd]"
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <div className="flex items-center justify-between py-4">
                    <p
                      className="md:text-lg font-bold cursor-pointer w-full"
                      onClick={() => toggle(index)}
                    >
                      {item.title}
                    </p>

                    <button
                      onClick={() => toggle(index)}
                      className={`w-6 h-6 flex items-center justify-center rounded-full transition ${
                        hoverIndex === index
                          ? "bg-[#39180F] text-white"
                          : "bg-[#39180F]/10"
                      }`}
                    >
                      <svg
                        className={`w-5 h-5 transition-transform ${
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
                    <div className="pb-4 pr-10 text-[#39180F]/80 leading-relaxed">
                      {Array.isArray(item.content) ? (
                        <ul className="list-disc pl-5 space-y-2">
                          {item.content.map((line, i) => (
                            <li key={i}>{line}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{item.content}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {fullView && (
        <div className="fixed inset-0 bg-[#F5EDDE] bg-opacity-80 flex items-center justify-center z-50">
          {" "}
          <Image
            src={product.images[selectedImage]}
            alt={product.name}
            width={2000}
            height={2000}
            className="max-h-full max-w-full object-contain"
          />{" "}
          <button
            onClick={() => setFullView(false)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white text-[#39180F] flex items-center justify-center text-2xl font-bold cursor-pointer"
          >
            {" "}
            ×{" "}
          </button>{" "}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-6 rounded-full bg-[#F5EDDE]">
            {" "}
            <button
              onClick={prevImage}
              className="group relative w-10 h-10 rounded-full bg-[#F5EDDE] text-[#39180F] flex items-center justify-center cursor-pointer overflow-hidden"
            >
              {" "}
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-1">
                {" "}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />{" "}
                </svg>{" "}
              </span>{" "}
            </button>{" "}
            <span className="text-[#39180F] font-bold">
              {" "}
              {selectedImage + 1} / {product.images.length}{" "}
            </span>{" "}
            <button
              onClick={nextImage}
              className="group relative w-10 h-10 rounded-full bg-[#F5EDDE] text-[#39180F] flex items-center justify-center cursor-pointer overflow-hidden"
            >
              {" "}
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                {" "}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />{" "}
                </svg>{" "}
              </span>{" "}
            </button>{" "}
          </div>{" "}
        </div>
      )}
    </div>
  );
}
