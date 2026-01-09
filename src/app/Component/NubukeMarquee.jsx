"use client";

import Marquee from "react-fast-marquee";

const NubukeMarquee = () => {
  const brandText = "We're not just \"any\" chocolate brand.";

  return (
    <section className="w-full bg-[#39180F] border-[#3d2b1f] py-6 font-serif">
      <Marquee speed={60} gradient={false} autoFill={true}>
        <div className="flex items-center">
          <span className="text-[#F5EDDE]  font-medium text-xl tracking-widest mx-12">
            {brandText}
          </span>
          
        </div>
      </Marquee>
    </section>
  );
};

export default NubukeMarquee;