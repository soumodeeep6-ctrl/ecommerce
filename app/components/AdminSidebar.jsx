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

  return <aside className="fixed bottom-0 left-0 z-40 flex h-[calc(4rem+env(safe-area-inset-bottom))] w-full flex-row bg-[#2d2924] pb-[env(safe-area-inset-bottom)] text-white shadow-[0_-8px_24px_rgba(45,41,36,.18)] lg:sticky lg:top-0 lg:h-screen lg:min-h-screen lg:w-64 lg:flex-col lg:pb-0 lg:shadow-none"><div className="hidden px-7 py-7 lg:block lg:border-b lg:border-white/10"><Link href="/" className="display-type text-3xl font-bold block">shopper<span className="text-[#e96546]">.</span></Link><p className="text-xs text-white/45 mt-2">Commerce workspace</p></div><nav className="min-w-0 flex-1 overflow-hidden px-1 lg:overflow-visible lg:px-4 lg:py-6"><p className="hidden lg:block eyebrow text-white/35 px-3 mb-3">Workspace</p><ul className="grid h-full w-full grid-cols-6 gap-0.5 lg:block lg:h-auto lg:space-y-1.5">{menuItems.map(([label, href, Icon]) => { const active = pathname === href || (href !== "/admin" && pathname.startsWith(href)); return <li key={href} className="min-w-0 lg:min-w-0"><Link href={href} title={label} className={`flex h-full min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl px-0.5 text-[9px] font-semibold leading-tight transition lg:h-auto lg:flex-row lg:justify-start lg:gap-3 lg:px-4 lg:py-3 lg:text-sm ${active ? "bg-[#e96546] text-white" : "text-white/60 hover:bg-white/10 hover:text-white"}`}><Icon size={17} /><span className="w-full truncate text-center lg:w-auto lg:text-left">{label}</span>{active && <ChevronRight size={15} className="hidden lg:ml-auto lg:block" />}</Link></li>; })}</ul></nav><div className="hidden border-t border-white/10 p-4 lg:block lg:space-y-1.5"><Link href="/" title="View storefront" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/60 hover:bg-white/10 hover:text-white"><Store size={18} /><span>View storefront</span></Link><button onClick={logout} title="Log out" className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/60 hover:bg-[#a63d2c] hover:text-white"><LogOut size={18} /><span>Log out</span></button></div></aside>;
}
