"use client";

import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SafeImage from "./SafeImage";

export default function LatestProductSlider({ products }) {
  return (
    <section className="py-20 lg:py-28 bg-[#fbf8f2]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow text-[#e96546] mb-3">Curated for you</p>
            <h2 className="display-type text-4xl md:text-5xl text-[#2d2924] font-bold">New in store</h2>
          </div>
          <Link href="/product" className="hidden sm:block text-sm font-bold text-[#5e574e] border-b border-[#e96546] pb-1 hover:text-[#e96546]">View all products ↗</Link>
        </div>

        <Swiper
          className="latest-products-swiper !overflow-hidden pb-10"
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop
          spaceBetween={30}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="min-w-0 bg-white text-[#2d2924] rounded-2xl border border-[#e5ded3] overflow-hidden group hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
                <div className="overflow-hidden">
                  <SafeImage
                    src={product.images[0]}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="h-72 w-full object-cover group-hover:scale-105 transition duration-700"
                  />
                </div>

                <div className="p-6">
                    <p className="eyebrow text-[#e96546]">
                    {product.category.name}
                  </p>

                  <h2 className="font-bold text-xl mt-2 line-clamp-2">
                    {product.title}
                  </h2>

                  <p className="text-[#777064] mt-3 line-clamp-3 text-sm leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex flex-col gap-4 mt-6">
                    <h1 className="text-2xl font-bold text-[#2d2924]">
                      ${product.price}
                    </h1>

                    <Link
                      href={`/product/${product.id}`}
                      className="w-full text-center bg-[#2d2924] hover:bg-[#e96546] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition whitespace-nowrap"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
