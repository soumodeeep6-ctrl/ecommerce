"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Camera, ChevronDown, Mail, ShieldCheck, Upload, X } from "lucide-react";
import Link from "next/link";

const fallbackAdmin = {
  name: "Admin",
  email: "admin@mail.com",
  role: "admin",
  avatar: "https://i.imgur.com/LDOO4Qs.jpg",
};

export default function AdminProfile() {
  const [profile, setProfile] = useState(fallbackAdmin);
  const [open, setOpen] = useState(false);
  const [hoveringTrigger, setHoveringTrigger] = useState(false);
  const [hoveringPanel, setHoveringPanel] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);
  const closeTimerRef = useRef(null);
  const isOpen = open || hoveringTrigger || hoveringPanel;

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("user") || "null");
    const savedAvatar = localStorage.getItem("admin_avatar");
    if (savedProfile) {
      setProfile({ ...fallbackAdmin, ...savedProfile, avatar: savedAvatar || savedProfile.avatar || fallbackAdmin.avatar });
    } else if (savedAvatar) {
      setProfile((current) => ({ ...current, avatar: savedAvatar }));
    }
  }, []);

  useEffect(() => () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
  }, []);

  function cancelClose() {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
  }

  function keepOpen() {
    cancelClose();
    setHoveringTrigger(true);
  }

  function scheduleClose() {
    cancelClose();
    closeTimerRef.current = window.setTimeout(() => {
      setHoveringTrigger(false);
      setHoveringPanel(false);
    }, 180);
  }

  function closeProfilePanel() {
    cancelClose();
    setOpen(false);
    setHoveringTrigger(false);
    setHoveringPanel(false);
  }

  async function uploadAvatar(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const body = new FormData();
    body.append("file", file);
    try {
      const response = await fetch("/api/admin/profile-photo", { method: "POST", body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Upload failed.");
      localStorage.setItem("admin_avatar", result.location);
      setProfile((current) => ({ ...current, avatar: result.location }));
    } catch (error) {
      window.alert(error.message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div className="relative" onMouseEnter={keepOpen} onMouseLeave={scheduleClose}>
      <button onClick={() => setOpen((value) => !value)} className="flex items-center gap-3 rounded-full bg-[#fbf8f2] border border-[#dfd7ca] pl-2 pr-3 py-2 hover:border-[#e96546] transition">
        <Image src={profile.avatar} alt={profile.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover" unoptimized />
        <span className="hidden sm:block text-left"><span className="block text-sm font-bold leading-tight">{profile.name}</span><span className="block text-xs text-[#777064]">Administrator</span></span>
        <ChevronDown size={16} className={`text-[#777064] transition ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div className={`admin-profile-popover absolute right-0 top-16 z-30 rounded-2xl border border-[#dfd7ca] bg-[#fbf8f2] p-5 shadow-2xl transition-opacity ${isOpen ? "opacity-100" : "pointer-events-none invisible opacity-0"}`} onMouseEnter={() => { cancelClose(); setHoveringPanel(true); }} onMouseLeave={scheduleClose}>
        <div className="flex items-start justify-between"><p className="eyebrow text-[#e96546]">Admin profile</p><button type="button" aria-label="Close admin profile" onClick={closeProfilePanel} className="text-[#777064] hover:text-[#e96546]"><X size={17} /></button></div>
        <div className="mt-5 flex items-center gap-4"><div className="relative shrink-0"><Image src={profile.avatar} alt={profile.name} width={72} height={72} className="w-[72px] h-[72px] rounded-full object-cover border-4 border-white shadow" unoptimized /><span className="absolute -right-1 -bottom-1 bg-[#e96546] text-white rounded-full p-1.5"><Camera size={13} /></span></div><div className="min-w-0"><h2 className="font-bold text-lg truncate">{profile.name}</h2><p className="text-sm text-[#777064] flex items-center gap-1 truncate"><Mail size={13} />{profile.email}</p></div></div>
        <div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-xl bg-white border border-[#e5ded3] p-3"><p className="text-xs text-[#a29a90]">Role</p><p className="mt-1 text-sm font-bold text-[#c44d3d] flex items-center gap-1"><ShieldCheck size={14} /> Admin</p></div><div className="rounded-xl bg-white border border-[#e5ded3] p-3"><p className="text-xs text-[#a29a90]">Account</p><p className="mt-1 text-sm font-bold text-[#3f9d70]">Active</p></div></div>
        <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadAvatar} className="hidden" /><button onClick={() => inputRef.current?.click()} disabled={uploading} className="mt-5 w-full flex items-center justify-center gap-2 rounded-xl bg-[#2d2924] text-white py-3 text-sm font-semibold hover:bg-[#e96546] transition disabled:opacity-60"><Upload size={16} />{uploading ? "Uploading..." : "Upload profile photo"}</button>
        <Link href="/admin/profile" onClick={closeProfilePanel} className="mt-3 w-full flex items-center justify-center rounded-xl border border-[#dfd7ca] bg-white text-[#2d2924] py-3 text-sm font-semibold hover:border-[#e96546] hover:text-[#e96546] transition">Edit profile</Link><p className="text-[11px] text-[#a29a90] text-center mt-2">PNG, JPG, or WEBP · max 3 MB</p>
      </div>
    </div>
  );
}
