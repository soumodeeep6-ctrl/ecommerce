"use client";

import { useRouter } from "next/navigation";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    title: "Welcome to Our Store",
    description:
      "Discover premium products with unbeatable prices and fast delivery.",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1600",
    button1: "Shop Now",
    button2: "Explore Products",
  },
  {
    id: 2,
    title: "Summer Collection 2026",
    description:
      "Explore the newest arrivals and exclusive fashion collection.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600",
    button1: "Shop Now",
    button2: "View Collection",
  },
  {
    id: 3,
    title: "Big Sale Up To 50% OFF",
    description: "Grab your favorite products before the offer ends.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600",
    button1: "Shop Now",
    button2: "See Offers",
  },
];

export default function Hero() {
  const router = useRouter();

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop
      className="h-[540px] sm:h-[550px] lg:h-[620px]"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className="relative h-[540px] sm:h-[550px] lg:h-[620px] bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            <div className="absolute inset-0 bg-[#201b18]/55"></div>

            <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-5 sm:px-6">
              <div className="max-w-2xl text-white">
                <span className="eyebrow text-[#ffd3c6]">
                  The new everyday edit
                </span>

                <h1 className="display-type text-4xl sm:text-5xl md:text-7xl font-bold mt-5 leading-[.98]">{slide.title}</h1>

                <p className="mt-6 text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
                  {slide.description}
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                  <button
                    onClick={() => router.push("/login")}
                    className="bg-[#e96546] hover:bg-[#f27d61] px-6 py-3.5 rounded-full font-semibold text-sm sm:text-base"
                  >
                    {slide.button1}
                  </button>

                  <button
                    onClick={() => router.push("/product")}
                    className="border border-white/70 px-6 py-3.5 rounded-full hover:bg-white hover:text-[#2d2924] transition text-sm sm:text-base"
                  >
                    {slide.button2}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
