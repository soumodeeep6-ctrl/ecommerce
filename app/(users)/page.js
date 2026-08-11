import React from "react";
import Hero from "../components/Hero";
import LatestProduct from "../components/LatestProduct";

const page = () => {
  return (
    <div>
      <Hero />
      <section className="bg-[#2d2924] text-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 text-center sm:text-left">
          <div><p className="eyebrow text-[#f7a18d]">01 / Carefully chosen</p><p className="text-sm text-white/75 mt-1">Products with a point of view.</p></div>
          <div><p className="eyebrow text-[#f7a18d]">02 / Easy returns</p><p className="text-sm text-white/75 mt-1">30 days to change your mind.</p></div>
          <div><p className="eyebrow text-[#f7a18d]">03 / Secure checkout</p><p className="text-sm text-white/75 mt-1">Simple, safe, and stress-free.</p></div>
        </div>
      </section>
      <LatestProduct />
    </div>
  );
};

export default page;
