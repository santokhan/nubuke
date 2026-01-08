import Image from "next/image";

export default function ImageGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 h-full xl:px-38 lg:px-12 md:px-8 px-4 bg-[#F5EDDE] my-15">
      <div className="relative h-44 lg:h-60 md:h-40 overflow-hidden rounded-box shadow-md group">
        <Image
          src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
          alt="Nubuke 1"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="md:order-0 md:row-span-2 relative h-64 sm:h-74 md:h-full overflow-hidden rounded-box shadow-md group">
        <Image
          src="https://img.freepik.com/free-photo/close-up-chocolate-arrangement_23-2148349283.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Nubuke 2"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
          <h1 className="text-[#F5EDDE] text-4xl lg:text-5xl font-medium mb-4 italic">
            Build Your own <br /> bundle and save
          </h1>
          <button className="px-10 py-3 bg-[#F5EDDE] text-[#39180F] hover:bg-transparent font-semibold rounded-full border-2 border-[#F5EDDE] hover:text-[#F5EDDE] cursor-pointer pointer-events-auto transition-colors duration-300">
            SAVE NOW
          </button>
        </div>
      </div>

      <div className="relative h-44 lg:h-60 md:h-40 overflow-hidden rounded-box shadow-md group">
        <Image
          src="https://images.unsplash.com/photo-1504639725590-34d0984388bd"
          alt="Nubuke 3"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}