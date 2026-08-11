"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LayoutDashboard, Package, Tags, Users, ShoppingBag, Plus, Store, LogOut, ChevronRight } from "lucide-react";

const menuItems = [
  ["Overview", "/admin", LayoutDashboard],
  ["Products", "/admin/products", Package],
  ["Categories", "/admin/categories", Tags],
  ["Add product", "/admin/add", Plus],
  ["Customers", "/admin/userlist", Users],
  ["Orders", "/admin/orders", ShoppingBag],
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = () => { Cookies.remove("token", { path: "/" }); localStorage.removeItem("access_token"); localStorage.removeItem("refresh_token"); localStorage.removeItem("user"); router.push("/login"); };

  return <aside className="w-20 lg:w-64 shrink-0 bg-[#2d2924] text-white min-h-screen flex flex-col sticky top-0 h-screen"><div className="px-4 lg:px-7 py-7 border-b border-white/10"><Link href="/" className="display-type text-2xl lg:text-3xl font-bold block text-center lg:text-left">shopper<span className="text-[#e96546]">.</span></Link><p className="hidden lg:block text-xs text-white/45 mt-2">Commerce workspace</p></div><nav className="flex-1 px-2 lg:px-4 py-6"><p className="hidden lg:block eyebrow text-white/35 px-3 mb-3">Workspace</p><ul className="space-y-1.5">{menuItems.map(([label, href, Icon]) => { const active = pathname === href || (href !== "/admin" && pathname.startsWith(href)); return <li key={href}><Link href={href} title={label} className={`flex items-center justify-center lg:justify-start gap-3 px-3 lg:px-4 py-3 rounded-xl text-sm font-semibold transition ${active ? "bg-[#e96546] text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`}><Icon size={18} /><span className="hidden lg:block">{label}</span>{active && <ChevronRight size={15} className="hidden lg:block ml-auto" />}</Link></li>; })}</ul></nav><div className="p-2 lg:p-4 border-t border-white/10 space-y-1.5"><Link href="/" title="View storefront" className="flex items-center justify-center lg:justify-start gap-3 px-3 lg:px-4 py-3 rounded-xl text-sm text-white/60 hover:bg-white/10 hover:text-white"><Store size={18} /><span className="hidden lg:block">View storefront</span></Link><button onClick={logout} title="Log out" className="w-full flex items-center justify-center lg:justify-start gap-3 px-3 lg:px-4 py-3 rounded-xl text-sm text-white/60 hover:bg-[#a63d2c] hover:text-white"><LogOut size={18} /><span className="hidden lg:block">Log out</span></button></div></aside>;
}
