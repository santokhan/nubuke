import React from "react";

export default function page() {
  return (
    <section className="bg-[#F5EDDE] text-[#39180F] md:py-30 py-8   scroll-smooth ">
      <h1 className="xl:text-6xl md:text-5xl text-4xl mb-15 mb:mb-20 text-center tracking-tight">
        {" "}
        Shipping policy{" "}
      </h1>
      <div className="xl:max-w-5/12  mx-auto md:w-10/12 px-4 md:space-y-20 space-y-10">
        <div className="md:space-y-8 space-y-4">
          <h2 className="xl:text-5xl md:text-4xl text-3xl  font-semibold ">
            Shipping
          </h2>
          <p>
            Orders ship within 2-3 business days depending on the day the order
            was placed. We ship our orders Monday through Wednesday to ensure
            that you receive your order within the 2-3 days time frame hence
            avoiding the weekend for potential delays which will impact the
            quality of the products you&apos;ve ordered.{" "}
          </p>
        </div>
        <div className="md:space-y-8 space-y-4">
          <h2 className="xl:text-5xl md:text-4xl text-3xl  font-semibold ">
            Missed Deliveries
          </h2>
          <p>
            Once an item has left our warehouse, customers are encouraged to
            stay up to date with the delivery schedule. Deliveries that are
            unsuccessful will be taken to the closest USPS location for pickup.
            It is the responsibility of the customer to retrieve the package at
            the designated pickup location. TCB is not responsible for packages
            not retrieved.
          </p>
        </div>
        <div className="md:space-y-8 space-y-4">
          <h2 className="xl:text-5xl md:text-4xl text-3xl  font-semibold ">
            Damaged in Transit
          </h2>
          <p>
            For any packages damaged in transit, please get in touch with us as
            soon as possible at{" "}
            <a
              href="mailto:hello@mynubuke.com "
              className="transition-all cursor-pointer relative inline-block group text-[#39180F] font-medium"
            >
              hello@mynubuke.com
              <span className="absolute left-0 bottom-0 w-full h-px bg-[#39180F]/50 transition-all duration-500 ease-in-out group-hover:w-0"></span>
            </a>
            . Please take pictures of item damage and include in email along
            with expiry date (located on the side of individual bars). We will
            open a trace with the courier immediately. If the bars cannot be
            consumed, we will process a replacement once the trace is complete.
          </p>
        </div>
        <div className="md:space-y-8 space-y-4">
          <h2 className="xl:text-5xl md:text-4xl text-3xl  font-semibold ">
            Lost in Transit
          </h2>
          <p>
            For any packages lost in transit, please get in touch with us as
            soon as possible at{" "}
            <a
              href="mailto:hello@mynubuke.com "
              className="transition-all cursor-pointer relative inline-block group text-[#39180F] font-medium"
            >
              hello@mynubuke.com.
              <span className="absolute left-0 bottom-0 w-full h-px bg-[#39180F]/50 transition-all duration-500 ease-in-out group-hover:w-0"></span>
            </a>{" "}
            We will open a trace with the courier immediately. We will process a
            replacement as soon as the courier has completed their trace and
            deemed the package lost.
          </p>
        </div>
      </div>
    </section>
  );
}
