import React from "react";
import ProductDetails from "../ProductDetails";
import Products from "@/app/Component/Products";
import ProductHero from "@/app/Component/ProductHero";
import Compare from "@/app/Component/Compare";
import BenefitsSection from "@/app/Component/BenefitsSection";
import Reviews from "@/app/Component/Reviews";

export default function page() {
  return (
    <div className="bg-[#F5EDDE]">
      <ProductDetails />
      <Products />
      <ProductHero/>
      <Compare/>
      <BenefitsSection/>
      <Reviews/>
    </div>
  );
}
