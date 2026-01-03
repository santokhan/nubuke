import Image from "next/image";
import PreHeader from "./Component/PreHeader";
import Navbar from "./Component/Navbar";
import Banner from "./Component/Banner";
import Products from "./Component/Products";

export default function Home() {
  return (
   <div>
    <PreHeader/>
    <Navbar/>
    <Banner/>
    <Products/>
   </div>
  );
}
