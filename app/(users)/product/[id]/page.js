"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import SafeImage from "@/app/components/SafeImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, Autoplay } from "swiper/modules";
import AddToCartButton from "@/app/components/AddToCartButton";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`).then((response) => response.json()).then(setProduct);
  }, [id]);

  if (!product) return <div className="max-w-7xl mx-auto px-5 py-20 text-[#777064]">Loading product…</div>;
  const images = (product.images || []).filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10 overflow-hidden">
      <Link className="inline-flex text-sm font-semibold text-[#777064] hover:text-[#e96546]" href="/product">← Back to products</Link>
      <div className="grid min-w-0 lg:grid-cols-2 gap-8 lg:gap-14 mt-8">
        <section className="min-w-0 w-full overflow-hidden">
          <Swiper modules={[Navigation, Pagination, Thumbs, Autoplay]} navigation pagination={{ clickable: true }} autoplay={{ delay: 3500, disableOnInteraction: false }} thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }} loop={images.length > 1} className="product-main-swiper w-full">
            {images.map((img, index) => <SwiperSlide key={index}><div className="flex items-center justify-center w-full h-[360px] sm:h-[480px] bg-[#f1ece3] rounded-2xl overflow-hidden"><SafeImage src={img} alt={product.title} width={700} height={700} className="w-full h-full object-contain p-5 sm:p-8" /></div></SwiperSlide>)}
          </Swiper>
          <Swiper onSwiper={setThumbsSwiper} modules={[Thumbs]} watchSlidesProgress slidesPerView={4} spaceBetween={10} breakpoints={{ 640: { slidesPerView: 5 } }} className="product-thumbs w-full mt-4">
            {images.map((img, index) => <SwiperSlide key={index} className="!h-20"><div className="h-20 border border-[#dfd7ca] rounded-xl overflow-hidden cursor-pointer hover:border-[#e96546] transition"><SafeImage src={img} alt={`${product.title} view ${index + 1}`} width={100} height={100} className="w-full h-full object-cover" /></div></SwiperSlide>)}
          </Swiper>
        </section>
        <section className="min-w-0 pt-2">
          <p className="eyebrow text-[#e96546] mb-3">{product.category?.name || "Collection"}</p>
          <h1 className="display-type text-4xl sm:text-5xl font-bold text-[#2d2924] leading-tight break-words">{product.title}</h1>
          <p className="mt-6 text-[#777064] leading-relaxed break-words">{product.description}</p>
          <div className="mt-8 pt-6 border-t border-[#dfd7ca] flex items-center justify-between gap-4"><h2 className="text-3xl font-bold text-[#2d2924]">${product.price}</h2><span className="text-sm text-[#3f9d70]">In stock</span></div>
          <AddToCartButton product={product} />
        </section>
      </div>
    </div>
  );
}
