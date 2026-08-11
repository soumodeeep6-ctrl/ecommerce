import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminSidebar from "../components/AdminSidebar";

export default async function AdminLayout({ children }) {
  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/login");

  const profileResponse = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const profile = profileResponse.ok ? await profileResponse.json() : null;
  if (!profile || profile.role !== "admin") redirect("/product");

  return (
    <div className="min-h-screen flex bg-[#f1ece3] text-[#2d2924]">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10">{children}</main>
    </div>
  );
}
