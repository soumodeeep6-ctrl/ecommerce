import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Package, Users, Tags, DollarSign } from "lucide-react";
import DashboardCharts from "@/app/components/DashboardCharts";
import AdminProfile from "@/app/components/AdminProfile";
import { api } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await cookies()).get("token")?.value) redirect("/login");
  const [products, users, categories] = await Promise.all([api.products(), api.users(), api.categories()]);
  const revenue = products.reduce((sum, item) => sum + item.price, 0);
  const categoryData = categories.map((cat) => ({ name: cat.name, products: products.filter((p) => p.category?.id === cat.id).length }));
  const priceData = [{ name: "Under $50", value: products.filter((p) => p.price < 50).length }, { name: "$50–100", value: products.filter((p) => p.price >= 50 && p.price < 100).length }, { name: "$100–200", value: products.filter((p) => p.price >= 100 && p.price < 200).length }, { name: "$200+", value: products.filter((p) => p.price >= 200).length }];
  const stats = [["Products", products.length, Package, "text-[#e96546]"], ["Customers", users.length, Users, "text-[#5c78d8]"], ["Categories", categories.length, Tags, "text-[#b7833a]"], ["Catalog value", `$${revenue.toLocaleString()}`, DollarSign, "text-[#3f9d70]"]];

  return <div className="space-y-8"><header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"><div><p className="eyebrow text-[#e96546] mb-2">Tuesday, August 11, 2026</p><h1 className="display-type text-4xl sm:text-5xl font-bold">Good morning, admin.</h1><p className="text-[#777064] mt-2">Here’s what’s happening across your store.</p></div><div className="flex items-center gap-3 self-start"><AdminProfile /><Link href="/admin/add" className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#2d2924] text-white px-5 py-3 text-sm font-semibold hover:bg-[#e96546] transition">Add product <ArrowUpRight size={16} /></Link></div></header><section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">{stats.map(([label, value, Icon, color]) => <div key={label} className="bg-[#fbf8f2] border border-[#dfd7ca] rounded-2xl p-5"><div className="flex items-center justify-between"><p className="text-sm text-[#777064]">{label}</p><Icon size={19} className={color} /></div><p className={`text-3xl font-bold mt-5 ${color}`}>{value}</p><p className="text-xs text-[#a29a90] mt-2">Live from Platzi Fake API</p></div>)}</section><section className="grid lg:grid-cols-[1.4fr_1fr] gap-6"><div className="bg-[#fbf8f2] border border-[#dfd7ca] rounded-2xl p-6"><div className="flex items-center justify-between mb-5"><div><p className="eyebrow text-[#e96546] mb-2">Inventory snapshot</p><h2 className="text-xl font-bold">Recently added products</h2></div><Link href="/admin/products" className="text-sm font-semibold text-[#e96546]">View all →</Link></div><div className="divide-y divide-[#e5ded3]">{products.slice(0, 5).map((product) => <div key={product.id} className="py-3 flex items-center gap-3"><Image src={product.images?.[0]} alt="" width={48} height={48} className="w-12 h-12 object-cover rounded-xl" /><div className="min-w-0 flex-1"><p className="font-semibold text-sm truncate">{product.title}</p><p className="text-xs text-[#777064]">{product.category?.name}</p></div><p className="font-bold text-sm">${product.price}</p></div>)}</div></div><div className="bg-[#2d2924] text-white rounded-2xl p-6 flex flex-col justify-between"><div><p className="eyebrow text-[#f7a18d] mb-3">API connected</p><h2 className="display-type text-3xl font-bold">Your catalog is live.</h2><p className="text-white/60 text-sm leading-relaxed mt-3">Products, users, categories, filters, pagination, and CRUD actions are connected to the Platzi Fake Store API.</p></div><Link href="/admin/categories" className="mt-8 text-sm font-semibold text-[#f7a18d]">Manage categories ↗</Link></div></section><DashboardCharts categoryData={categoryData} priceData={priceData} /></div>;
}
