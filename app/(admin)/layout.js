import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminSidebar from "../components/AdminSidebar";
import { API_URL } from "@/lib/api";

export default async function AdminLayout({ children }) {
  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/login");

  const profileResponse = await fetch(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const profile = profileResponse.ok ? await profileResponse.json() : null;
  if (!profile || profile.role !== "admin") redirect("/product");

  return (
    <div className="min-h-screen flex bg-[#f1ece3] text-[#2d2924]">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:p-6 sm:pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:p-10 lg:pb-10 overflow-x-hidden">{children}</main>
    </div>
  );
}
