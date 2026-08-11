import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }) {
  const { id } = await params;
  const [category, products] = await Promise.all([api.category(id), api.categoryProducts(id)]);

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14">
      <Link href="/category" className="text-sm font-semibold text-[#777064] hover:text-[#e96546]">← All categories</Link>
      <div className="mt-8 mb-10"><p className="eyebrow text-[#e96546] mb-3">Collection</p><h1 className="display-type text-5xl text-[#2d2924] font-bold">{category.name}</h1><p className="text-[#777064] mt-3">{products.length} pieces to explore</p></div>
      {products.length === 0 ? <p className="text-[#777064]">No products found.</p> : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{products.map((product) => <Link key={product.id} href={`/product/${product.id}`} className="bg-white rounded-2xl border border-[#e5ded3] overflow-hidden hover:-translate-y-1 hover:shadow-xl transition"><Image src={product.images[0]} alt={product.title} width={400} height={300} className="w-full h-60 object-cover" /><div className="p-5"><h2 className="font-semibold line-clamp-2">{product.title}</h2><p className="text-[#e96546] font-bold text-xl mt-3">${product.price}</p><span className="block mt-4 text-sm font-semibold text-[#777064]">View product →</span></div></Link>)}</div>}
    </div>
  );
}
