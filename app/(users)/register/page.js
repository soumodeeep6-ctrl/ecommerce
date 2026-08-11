"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle, LoaderCircle } from "lucide-react";
import { API_URL } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "", loading: false });
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  function validate() {
    if (form.name.trim().length < 2) return "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid email address.";
    if (form.password.length < 4) return "Password must be at least 4 characters.";
    if (form.password !== form.confirmPassword) return "Passwords do not match.";
    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const error = validate();
    if (error) return setStatus({ type: "error", message: error, loading: false });
    setStatus({ type: "", message: "", loading: true });
    try {
      const availability = await fetch(`${API_URL}/users/is-available`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.email }) });
      const availableData = await availability.json();
      if (!availableData.isAvailable) throw new Error("That email is already registered.");
      const response = await fetch(`${API_URL}/users/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: form.name, email: form.email, password: form.password, avatar: "https://i.pravatar.cc/300" }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not create account.");
      setStatus({ type: "success", message: "Account created! Taking you to sign in…", loading: false });
      setTimeout(() => router.push("/login?created=1"), 900);
    } catch (error) { setStatus({ type: "error", message: error.message || "Something went wrong.", loading: false }); }
  }

  return <main className="min-h-screen bg-[#f1ece3] flex items-center justify-center p-5 sm:p-8 relative overflow-hidden"><div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#f7c1b3]/40 blur-3xl" /><div className="relative w-full max-w-5xl grid lg:grid-cols-[.9fr_1.1fr] bg-[#fbf8f2] rounded-[2rem] overflow-hidden border border-[#dfd7ca] shadow-2xl"><section className="hidden lg:flex bg-[#e96546] text-white p-12 flex-col justify-between min-h-[700px]"><div><Link href="/" className="display-type text-4xl font-bold">shopper<span className="text-[#2d2924]">.</span></Link><p className="eyebrow text-white/70 mt-20">Start your story</p><h1 className="display-type text-6xl font-bold leading-[.98] mt-5">Make room<br />for good.</h1><p className="text-white/80 mt-6 max-w-sm leading-relaxed">Create your account and keep all your discoveries close.</p></div><p className="text-sm text-white/60">Simple shopping, thoughtfully done.</p></section><section className="p-7 sm:p-12 lg:p-16"><Link href="/" className="lg:hidden display-type text-3xl font-bold text-[#2d2924]">shopper<span className="text-[#e96546]">.</span></Link><div className="max-w-md mx-auto pt-8 lg:pt-0"><p className="eyebrow text-[#e96546] mb-3">Join the edit</p><h2 className="display-type text-4xl sm:text-5xl font-bold text-[#2d2924]">Create an account.</h2><p className="text-[#777064] mt-3 mb-8">Save favorites and keep your orders in one place.</p>{status.message && <div className={`mb-5 flex gap-2 items-start rounded-xl p-3 text-sm ${status.type === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"}`}>{status.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}{status.message}</div>}<form onSubmit={handleSubmit} className="space-y-5"><label className="block text-sm font-semibold text-[#2d2924]">Full name<input name="name" value={form.name} onChange={update} placeholder="Alex Morgan" className="auth-input" /></label><label className="block text-sm font-semibold text-[#2d2924]">Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" className="auth-input" /></label><label className="block text-sm font-semibold text-[#2d2924]">Password<div className="relative"><input name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={update} placeholder="Create a password" className="auth-input pr-12" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777064]">{showPassword ? <EyeOff size={19} /> : <Eye size={19} />}</button></div></label><label className="block text-sm font-semibold text-[#2d2924]">Confirm password<div className="relative"><input name="confirmPassword" type={showConfirm ? "text" : "password"} value={form.confirmPassword} onChange={update} placeholder="Repeat your password" className="auth-input pr-12" /><button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777064]">{showConfirm ? <EyeOff size={19} /> : <Eye size={19} />}</button></div></label><button disabled={status.loading} className="auth-button disabled:opacity-60">{status.loading ? <><LoaderCircle size={17} className="animate-spin" /> Creating account…</> : <>Create account <ArrowRight size={17} /></>}</button></form><p className="text-center text-sm text-[#777064] mt-7">Already a member? <Link href="/login" className="font-bold text-[#e96546] hover:underline">Sign in</Link></p></div></section></div></main>;
}
