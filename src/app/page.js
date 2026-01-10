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
import NubukeMarquee from "./Component/NubukeMarquee";
import Commitment from "./Component/Commitment";
import Faq from "./Component/Faq";

export default function Home() {
  return (
    <div className="bg-[#F5EDDE]">
    

      <Banner />
      <Products />
      <Mission />
      <ProductHero />
      <BenefitsSection />
      <ImageGallery/>
      <ExpertTestimonials/>
      <NubukeMarquee/>
      <Commitment/>
      <Faq/>
      
    </div>
  );
}
