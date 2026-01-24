"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Tag, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import Products from "../Component/Products";
import EstimateShipping from "../Component/EstimateShipping";

const QuantityControls = ({ item, updateQty, mobile = false }) => {
  const displayQty = item.quantity || item.qty || 0;

  return (
    <div className="flex items-center gap-2 border rounded-full p-1 border-[#39180F]/10 ">
      <button
        type="button"
        disabled={displayQty <= 1}
        onClick={() => updateQty(item.id, -1)}
        className={`text-[#39180F] border border-[#39180F]/10 bg-[#39180F]/10 rounded-full ${
          mobile ? "px-4 py-1 text-sm" : "px-4 py-1 text-lg"
        } leading-none ${
          displayQty <= 1
            ? "opacity-40 cursor-not-allowed"
            : "cursor-pointer hover:text-[#F5EDDE] hover:bg-[#39180F]"
        }`}
      >
        –
      </button>
      <span className="px-3 text-sm font-bold min-w-6 text-center text-[#39180F] ">
        {displayQty}
      </span>
      <button
        type="button"
        onClick={() => updateQty(item.id, 1)}
        className={`text-[#39180F] border border-[#39180F]/10 bg-[#39180F]/10 rounded-full ${
          mobile ? "px-4 py-1 text-xs" : "px-4 py-1 text-lg"
        } leading-none cursor-pointer hover:text-[#F5EDDE] hover:bg-[#39180F]`}
      >
        +
      </button>
    </div>
  );
};

export default function CartPage() {
  const {
    cartItems,
    cartTotal,
    removeFromCart,
    updateQty,
    orderNote,
    setOrderNote,
  } = useCart();
  const [logos, setLogos] = useState([]);

  const shippingThreshold = 70;
  const currentTotal = Number(cartTotal) || 0;
  const amountToFreeShipping = Math.max(0, shippingThreshold - currentTotal);
  const progressPercentage = Math.min(
    100,
    (currentTotal / shippingThreshold) * 100,
  );

  useEffect(() => {
    fetch("/companyLogos.json")
      .then((res) => res.json())
      .then((data) => setLogos(data))
      .catch((err) => console.error("Error loading logos:", err));
  }, []);

  return (
    <div className="bg-[#F5EDDE] min-h-screen text-[#39180F]">
      <div className="xl:max-w-10/12 mx-auto px-4 md:px-8 lg:px-24 py-12 ">
        {!cartItems || cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative mb-6">
              <div className="p-6 rounded-full ">
                <ShoppingCart size={60} strokeWidth={1} />
              </div>
              <div className="absolute top-4 right-4 bg-[#39180F] text-[#F5EDDE] text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center border-2 border-[#F5EDDE]">
                0
              </div>
            </div>
            <h1 className="text-xl font-serif mb-6">Your cart is empty</h1>
            <Link
              href="/shop"
              className="bg-[#39180F] text-[#F5EDDE] px-8 py-4 rounded-full font-semibold border-2 border-[#39180F] hover:bg-transparent hover:text-[#39180F] transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center md:mb-12">
              <h1 className="md:text-4xl text-3xl font-serif mb-4">Cart</h1>
              <p className="md:text-lg">
                {amountToFreeShipping > 0 ? (
                  <>
                    You&apos;re close...{" "}
                    <span className="font-bold">
                      ${amountToFreeShipping.toFixed(2)}
                    </span>{" "}
                    until FREE shipping!
                  </>
                ) : (
                  <span className="">You qualify for FREE shipping!</span>
                )}
              </p>
              <div className="w-full max-w-md mx-auto bg-[#39180F]/10 h-1.5 mt-4 rounded-full overflow-hidden">
                <div
                  className="bg-[#39180F] h-full transition-all duration-700 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex-2">
                <div className="md:grid grid-cols-6 border-b border-[#39180F]/10 pb-4 font-bold hidden md:block tracking-tight">
                  <div className="col-span-3">Product</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-1 text-right">Total</div>
                </div>

                {cartItems.map((item) => {
                  const itemQty = Number(item.quantity || item.qty || 0);
                  const itemPrice = Number(item.price || 0);
                  return (
                    <div
                      key={item.id}
                      className="md:grid grid-cols-6 items-center py-8 "
                    >
                      <div className="col-span-3 flex gap-4">
                        <div className="relative md:h-24 md:w-24 w-20 h-20 shrink-0 bg-white rounded-md overflow-hidden border border-[#39180F]/10">
                          <Image
                            src={
                              item.images?.[0] ||
                              item.image ||
                              "/placeholder.png"
                            }
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col justify-center w-full">
                          <div className="flex justify-between items-center gap-2">
                            <h3 className="font-bold md:text-xl">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[#39180F]/60 md:hidden "
                            >
                              <X size={15} />
                            </button>
                          </div>
                          <p className="text-[#39180F]/60 md:text-lg text-sm">
                            ${itemPrice.toFixed(2)}
                          </p>
                          <div className="w-35 md:hidden">
                            <QuantityControls
                              item={item}
                              updateQty={updateQty}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 md:flex flex-col items-center gap-2 hidden md:block">
                        <QuantityControls item={item} updateQty={updateQty} />
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-[#39180F]/60  font-medium hover:text-[#39180F] relative inline-block group cursor-pointer"
                        >
                          Remove
                          <span className="absolute left-0 bottom-0 w-full h-px bg-[#39180F]/50 transition-all duration-500 ease-in-out group-hover:w-0 group-hover:right-full"></span>
                        </button>
                      </div>
                      <div className="col-span-1 text-right lg:text-xl   hidden md:block font-medium ">
                        ${(itemPrice * itemQty).toFixed(2)}
                      </div>
                    </div>
                  );
                })}

                <div>
                  <EstimateShipping />
                </div>
              </div>

              <div className="flex-1">
                <div>
                  <div className="border  border-[#D9CEB8] rounded-xl md:p-8 p-4 sticky top-32 ">
                    <div className="space-y-2 mb-5 bg-[#2F130C0D] p-5 rounded md:text-nowrap">
                      <h3 className="text-[#39180F] tracking-tight uppercase flex items-center gap-1 font-bold">
                        <Tag size={20} />
                        <span>Bundle & Save</span>
                      </h3>
                      <p className="text-sm">ORDER 5+ BARS & GET 10% OFF</p>
                    </div>
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-[#39180F]/60">
                        <span>Subtotal</span>
                        <span>${currentTotal.toFixed(2)}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-baseline">
                          <span className="font-serif ">Total</span>
                          <span className="">
                            ${currentTotal.toFixed(2)} USD
                          </span>
                        </div>
                        <p className="text-[#39180F]/60  text-sm">
                          After all applied coupons & promotions
                        </p>
                        <p className="text-[#39180F]/60  text-sm">
                          Taxes and{" "}
                          <Link
                            href="/ShippingPolicy"
                            className="relative inline-block group hover:text-[#39180F] font-medium "
                          >
                            shipping
                            <span className="absolute left-0 bottom-0 w-full h-px bg-[#39180F]/50 transition-all duration-500 ease-in-out group-hover:w-0 group-hover:right-full"></span>
                          </Link>{" "}
                          calculated at checkout
                        </p>
                      </div>
                    </div>
                    <div className="mb-6 relative">
                      <textarea
                        id="orderNote"
                        value={orderNote}
                        onChange={(e) => setOrderNote(e.target.value)}
                        placeholder=" "
                        className="peer w-full bg-transparent border border-[#39180F]/10 rounded-lg p-4 pt-6 h-32 focus:outline-none focus:ring-1 focus:ring-[#39180F] resize-none"
                      />
                      <label className="absolute left-4 top-4 transition-all duration-200 text-[#39180F]/60 pointer-events-none peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-xs">
                        Order note
                      </label>
                    </div>
                    {currentTotal < 50 && (
                      <p className=" text-[#39180F]/60 mt-2 text-sm mb-1 font-medium">
                        Must have at least $50 total.
                      </p>
                    )}
                    <button
                      disabled={currentTotal < 50}
                      className={`w-full py-4 rounded-full md:font-semibold md:text-lg border-2 transition-all ${
                        currentTotal < 50
                          ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed opacity-70"
                          : "bg-[#39180F] text-[#F5EDDE] border-[#39180F] hover:bg-transparent hover:text-[#39180F] cursor-pointer"
                      }`}
                    >
                      {currentTotal < 50 ? "Checkout" : "Checkout"}
                    </button>
                  </div>
                </div>

                <div className="text-center mt-5 space-y-3">
                  <p className="text-xs text-[#39180F]/60">We accept</p>
                  <div className="flex gap-2 h-full flex-wrap justify-center ">
                    {logos.map((logo, index) => (
                      <div key={index} className="w-10 h-6 relative">
                        <Image
                          src={logo.image}
                          alt={logo.name}
                          fill
                          className="object-contain bg-white p-1 rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="w-full">
        <Products />
      </div>
    </div>
  );
}
