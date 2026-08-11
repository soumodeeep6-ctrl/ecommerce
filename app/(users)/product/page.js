import SafeImage from "@/app/components/SafeImage";
import Link from "next/link";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function ProductsPage({ searchParams }) {
  const filters = await searchParams;
  const query = new URLSearchParams();
  if (filters?.title) query.set("title", filters.title);
  if (filters?.categoryId) query.set("categoryId", filters.categoryId);
  if (filters?.price_min) query.set("price_min", filters.price_min);
  if (filters?.price_max) query.set("price_max", filters.price_max);
  query.set("limit", "12");
  query.set("offset", filters?.page ? String((Number(filters.page) - 1) * 12) : "0");
  const products = await api.products(`?${query.toString()}`);
  const page = Number(filters?.page || 1);

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14">
      <div className="mb-12">
        <p className="eyebrow text-[#e96546] mb-3">The full collection</p>
        <h1 className="display-type text-5xl text-[#2d2924] font-bold">Shop all products</h1>
        <p className="text-[#777064] mt-4 max-w-xl">Thoughtful pieces for your everyday life, selected for quality, usefulness, and a little bit of joy.</p>
      </div>

      <form className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3" method="get">
        <input name="title" defaultValue={filters?.title} placeholder="Search products" className="lg:col-span-2 rounded-full border border-[#dfd7ca] bg-white px-5 py-3 outline-none focus:border-[#e96546]" />
        <input name="price_min" defaultValue={filters?.price_min} type="number" min="0" placeholder="Min price" className="rounded-full border border-[#dfd7ca] bg-white px-5 py-3 outline-none focus:border-[#e96546]" />
        <input name="price_max" defaultValue={filters?.price_max} type="number" min="0" placeholder="Max price" className="rounded-full border border-[#dfd7ca] bg-white px-5 py-3 outline-none focus:border-[#e96546]" />
        <button className="rounded-full bg-[#2d2924] text-white py-3 font-semibold hover:bg-[#e96546] transition">Filter collection</button>
      </form>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl text-[#2d2924] border border-[#e5ded3] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition"
          >
            <SafeImage
              src={product.images[0]}
              alt={product.title}
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />

            <div className="p-5">
              <h2 className="font-semibold text-lg line-clamp-2">
                {product.title}
              </h2>

              <p className="text-[#e96546] font-bold text-xl mt-3">
                ${product.price}
              </p>

              <Link
                href={`/product/${product.id}`}
                className="block mt-5 bg-[#2d2924] text-white text-center py-3 rounded-full hover:bg-[#e96546] transition font-semibold"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-3 mt-12">
        {page > 1 && <Link href={`/product?page=${page - 1}`} className="rounded-full border border-[#dfd7ca] px-5 py-2 text-sm font-semibold">← Previous</Link>}
        {products.length === 12 && <Link href={`/product?page=${page + 1}`} className="rounded-full bg-[#2d2924] text-white px-5 py-2 text-sm font-semibold">Next →</Link>}
      </div>
    </div>
  );
}
