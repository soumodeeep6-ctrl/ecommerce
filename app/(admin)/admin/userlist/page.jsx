"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Search, Users, ShieldCheck, UserRound, Mail, LoaderCircle } from "lucide-react";

const API = "https://api.escuelajs.co/api/v1";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API}/users`)
      .then((response) => {
        if (!response.ok) throw new Error("Could not load users.");
        return response.json();
      })
      .then(setUsers)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  const admins = users.filter((user) => user.role === "admin").length;
  const customers = users.filter((user) => user.role === "customer").length;
  const filteredUsers = useMemo(() => users.filter((user) => {
    const matchesSearch = `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (role === "all" || user.role === role);
  }), [users, search, role]);

  return (
    <div className="space-y-7">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-[#e96546] mb-2">People & permissions</p>
          <h1 className="display-type text-4xl font-bold">User directory</h1>
          <p className="text-[#777064] mt-2">Search customers, review roles, and keep access under control.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#777064] bg-[#fbf8f2] border border-[#dfd7ca] rounded-full px-4 py-2">
          <ShieldCheck size={16} className="text-[#3f9d70]" /> Admin-only workspace
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[["Total users", users.length, Users, "text-[#5c78d8]"], ["Customers", customers, UserRound, "text-[#3f9d70]"], ["Administrators", admins, ShieldCheck, "text-[#e96546]"]].map(([label, value, Icon, color]) => (
          <div key={label} className="bg-[#fbf8f2] border border-[#dfd7ca] rounded-2xl p-5 flex items-center justify-between">
            <div><p className="text-sm text-[#777064]">{label}</p><p className={`text-3xl font-bold mt-3 ${color}`}>{value}</p></div><Icon size={24} className={color} />
          </div>
        ))}
      </section>

      <section className="bg-[#fbf8f2] border border-[#dfd7ca] rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-[#e5ded3] flex flex-col md:flex-row gap-3">
          <div className="relative flex-1"><Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a29a90]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name or email" className="w-full rounded-xl border border-[#dfd7ca] bg-white py-3 pl-11 pr-4 outline-none focus:border-[#e96546]" /></div>
          <select value={role} onChange={(event) => setRole(event.target.value)} className="rounded-xl border border-[#dfd7ca] bg-white px-4 py-3 outline-none focus:border-[#e96546]"><option value="all">All roles</option><option value="customer">Customers</option><option value="admin">Administrators</option></select>
        </div>
        <div className="px-5 py-4 flex justify-between items-center"><p className="font-semibold">People <span className="font-normal text-[#a29a90]">({filteredUsers.length})</span></p><p className="text-xs text-[#a29a90]">Live from Platzi Fake API</p></div>
        {loading ? <div className="p-16 flex justify-center"><LoaderCircle className="animate-spin text-[#e96546]" /></div> : error ? <p className="p-8 text-red-600">{error}</p> : <div className="overflow-x-auto"><table className="min-w-[720px] w-full text-sm"><thead><tr className="text-left text-[#777064] border-y border-[#e5ded3]"><th className="px-5 py-3 font-semibold">User</th><th className="px-5 py-3 font-semibold">Role</th><th className="px-5 py-3 font-semibold">User ID</th><th className="px-5 py-3 font-semibold">Account</th></tr></thead><tbody>{filteredUsers.map((user) => <tr key={user.id} className="border-b border-[#eee8df] last:border-0 hover:bg-[#f8f5ef] transition"><td className="px-5 py-4"><div className="flex items-center gap-3"><Image src={user.avatar} alt={user.name} width={42} height={42} className="w-10 h-10 rounded-full object-cover" /><div><p className="font-semibold">{user.name}</p><p className="text-xs text-[#777064] flex items-center gap-1"><Mail size={11} />{user.email}</p></div></div></td><td className="px-5 py-4"><span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${user.role === "admin" ? "bg-[#fbe8e5] text-[#c44d3d]" : "bg-[#e9f5ee] text-[#3f9d70]"}`}>{user.role}</span></td><td className="px-5 py-4 text-[#a29a90]">#{user.id}</td><td className="px-5 py-4 text-[#3f9d70]">Active</td></tr>)}</tbody></table>{filteredUsers.length === 0 && <div className="p-14 text-center text-[#777064]">No users match your search.</div>}</div>}
      </section>
    </div>
  );
}
