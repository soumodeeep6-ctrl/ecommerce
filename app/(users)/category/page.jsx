import SafeImage from "@/app/components/SafeImage";
import Link from "next/link";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await api.categories();

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#777064] hover:text-[#e96546] transition mb-10"
      >
        <span aria-hidden="true">←</span> Back to home
      </Link>
      <div className="mb-12 max-w-2xl">
        <p className="eyebrow text-[#e96546] mb-3">Browse by mood</p>
        <h1 className="display-type text-5xl text-[#2d2924] font-bold">Find your category</h1>
        <p className="text-[#777064] mt-4 leading-relaxed">A considered collection of everyday pieces, organized to make your next find easier.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.id}`} className="group relative overflow-hidden rounded-2xl bg-[#2d2924] min-h-72">
            <SafeImage src={category.image} alt={category.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-70 group-hover:scale-105 transition duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2d2924] via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white flex items-end justify-between">
              <h2 className="display-type text-3xl font-bold">{category.name}</h2>
              <span className="text-[#f7a18d] text-2xl">↗</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
