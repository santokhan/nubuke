import React from "react";
import Image from "next/image";

const Compare = () => {
  return (
    <section className="bg-[#F5EDDE] xl:px-38 lg:px-12 md:px-8 py-10  px-4 ">
         <div className=" space-y-2 flex flex-col items-center ">
           <h1 className=" text-[#39180F] text-4xl md:text-5xl font-medium italic leading-tight ">
             Why Fonio Wins Every Time
           </h1>
           <p className="text-[#39180F] text-center text-lg">See how this ancient supergrain stacks up against modern staples. <br />
            More protein, fewer carbs, and a lower glycemic index.</p>
   
           <div className="relative w-full aspect-12/4 rounded-2xl overflow-hidden  mt-5">
             <Image
               src="https://images.squarespace-cdn.com/content/v1/630794f644226751ab3703a3/d9647f1d-702b-4497-a60c-cc07128c6664/fonio_seed_comparison_table.png"
               alt=""
               fill
               className="object-cover"
               priority
             />
           </div>
         </div>
       </section>
  );
};

export default Compare;
