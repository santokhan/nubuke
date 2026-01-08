import Image from "next/image";
import PreHeader from "./Component/PreHeader";
import Navbar from "./Component/Navbar";
import Banner from "./Component/Banner";
import Products from "./Component/Products";
import Mission from "./Component/Mission";
import ProductHero from "./Component/ProductHero";
import BenefitsSection from "./Component/BenefitsSection";
import ImageGallery from "./Component/ImageGallery";
import ExpertTestimonials from "./Component/ExpertTestimonials";

export default function Home() {
  return (
    <div className="bg-[#F5EDDE]">
      <div className="sticky top-0 z-50">
        <PreHeader />
        <Navbar />
      </div>

      <Banner />
      <Products />
      <Mission />
      <ProductHero />
      <BenefitsSection />
      <ImageGallery/>
      <ExpertTestimonials/>
    </div>
  );
}
