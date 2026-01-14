import React from "react";
import ProductDetails from "../ProductDetails";
import Products from "@/app/Component/Products";
import ProductHero from "@/app/Component/ProductHero";
import Compare from "@/app/Component/Compare";
import BenefitsSection from "@/app/Component/BenefitsSection";

export default function page() {
  return (
    <div>
      <ProductDetails />
      <Products />
      <ProductHero/>
      <Compare/>
      <BenefitsSection/>
    </div>
  );
}
