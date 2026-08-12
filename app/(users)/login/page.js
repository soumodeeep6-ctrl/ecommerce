"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle, LoaderCircle, KeyRound } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.escuelajs.co/api/v1";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "", loading: false });
  const [created, setCreated] = useState(false);

  useEffect(() => {
    setCreated(new URLSearchParams(window.location.search).get("created") === "1");
  }, []);

  useEffect(() => {
    window.history.pushState({ loginPage: true }, "", window.location.href);
    const handleBack = () => router.replace("/");
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [router]);

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const validate = () => {
    if (!form.email.trim()) return "Enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid email address.";
    if (!form.password) return "Enter your password.";
    if (form.password.length < 4) return "Your password must be at least 4 characters.";
    return "";
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const validationError = validate();
    if (validationError) return setStatus({ type: "error", message: validationError, loading: false });
    setStatus({ type: "", message: "", loading: true });

    try {
      const response = await fetch(`${API_URL}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Email or password is incorrect.");
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      Cookies.set("token", data.access_token, {
        expires: 20,
        secure: window.location.protocol === "https:",
        sameSite: "lax",
        path: "/",
      });
      const profileResponse = await fetch(`${API_URL}/auth/profile`, { headers: { Authorization: `Bearer ${data.access_token}` } });
      const profile = await profileResponse.json();
      localStorage.setItem("user", JSON.stringify(profile));
      setStatus({ type: "success", message: "Signed in successfully. Redirecting…", loading: false });
      setTimeout(() => router.push(profile.role === "admin" ? "/admin" : "/product"), 600);
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Something went wrong. Please try again.", loading: false });
    }
  }

  function handleForgot(event) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setStatus({ type: "error", message: "Enter your account email first.", loading: false });
    setStatus({ type: "success", message: "If an account exists for this email, reset instructions will be sent shortly.", loading: false });
  }

  return <main className="min-h-screen bg-[#f1ece3] flex items-center justify-center p-5 sm:p-8 relative overflow-hidden"><div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#f7c1b3]/40 blur-3xl" /><div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#ded8ee]/50 blur-3xl" /><div className="relative w-full max-w-5xl grid lg:grid-cols-[.9fr_1.1fr] bg-[#fbf8f2] rounded-[2rem] overflow-hidden border border-[#dfd7ca] shadow-2xl"><section className="hidden lg:flex bg-[#2d2924] text-white p-12 flex-col justify-between min-h-[650px]"><div><Link href="/" className="display-type text-4xl font-bold">shopper<span className="text-[#e96546]">.</span></Link><p className="eyebrow text-[#f7a18d] mt-20">A better way to shop</p><h1 className="display-type text-6xl font-bold leading-[.98] mt-5">Good things<br />start here.</h1><p className="text-white/65 mt-6 max-w-sm leading-relaxed">Curated products, easy discovery, and a shopping experience that feels like yours.</p></div><p className="text-sm text-white/45">New finds, every day.</p></section><section className="p-7 sm:p-12 lg:p-16"><Link href="/" className="lg:hidden display-type text-3xl font-bold text-[#2d2924]">shopper<span className="text-[#e96546]">.</span></Link><div className="max-w-md mx-auto pt-8 lg:pt-0"><p className="eyebrow text-[#e96546] mb-3">Welcome back</p><h2 className="display-type text-4xl sm:text-5xl font-bold text-[#2d2924]">Sign in to shop.</h2><p className="text-[#777064] mt-3 mb-8">Your next favorite thing is waiting.</p>{created && <div className="mb-5 flex gap-2 items-start rounded-xl bg-green-50 border border-green-200 text-green-700 p-3 text-sm"><CheckCircle2 size={18} /> Account created. You can sign in now.</div>}{status.message && <div className={`mb-5 flex gap-2 items-start rounded-xl p-3 text-sm ${status.type === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"}`}>{status.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}{status.message}</div>}{forgotMode ? <form onSubmit={handleForgot} className="space-y-5"><label className="block text-sm font-semibold text-[#2d2924]">Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" className="auth-input" /></label><button className="auth-button">Send reset link <ArrowRight size={17} /></button><button type="button" onClick={() => { setForgotMode(false); setStatus({ type: "", message: "", loading: false }); }} className="w-full text-sm font-semibold text-[#777064] hover:text-[#e96546]">← Back to sign in</button></form> : <form onSubmit={handleSubmit} className="space-y-5"><label className="block text-sm font-semibold text-[#2d2924]">Email address<input name="email" type="email" autoComplete="email" value={form.email} onChange={update} placeholder="you@example.com" className="auth-input" /></label><label className="block text-sm font-semibold text-[#2d2924]">Password<div className="relative"><input name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" value={form.password} onChange={update} placeholder="Enter your password" className="auth-input pr-12" /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777064] hover:text-[#e96546]">{showPassword ? <EyeOff size={19} /> : <Eye size={19} />}</button></div></label><div className="flex justify-end"><button type="button" onClick={() => setForgotMode(true)} className="text-sm font-semibold text-[#e96546] hover:underline">Forgot password?</button></div><button disabled={status.loading} className="auth-button disabled:opacity-60">{status.loading ? <><LoaderCircle size={17} className="animate-spin" /> Signing in…</> : <>Sign in <ArrowRight size={17} /></>}</button></form>}<div className="flex items-center gap-4 my-8 text-xs text-[#a29a90]"><span className="h-px bg-[#dfd7ca] flex-1" /> OR <span className="h-px bg-[#dfd7ca] flex-1" /></div><p className="text-center text-sm text-[#777064]">New to Shopper? <Link href="/register" className="font-bold text-[#e96546] hover:underline">Create an account</Link></p></div></section></div></main>;
}
