import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_URL } from "@/lib/api";

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request) {
  const token = (await cookies()).get("token")?.value;
  if (!token) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  const profileResponse = await fetch(`${API_URL}/auth/profile`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
  const profile = profileResponse.ok ? await profileResponse.json() : null;
  if (!profile || profile.role !== "admin") return NextResponse.json({ error: "Only an administrator can upload this photo." }, { status: 403 });

  const formData = await request.formData();
  const file = formData.get("file");
  if (!file || typeof file === "string") return NextResponse.json({ error: "An image file is required." }, { status: 400 });
  if (!ALLOWED_TYPES.has(file.type)) return NextResponse.json({ error: "Only JPG, PNG, and WEBP images are allowed." }, { status: 415 });
  if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: "The image must be 3 MB or smaller." }, { status: 413 });

  const uploadData = new FormData();
  uploadData.append("file", file, file.name);
  const uploadResponse = await fetch(`${API_URL}/files/upload`, { method: "POST", body: uploadData });
  const uploadResult = await uploadResponse.json().catch(() => null);
  if (!uploadResponse.ok || !uploadResult?.location) return NextResponse.json({ error: "The image upload failed." }, { status: 502 });

  if (profile.id) {
    await fetch(`${API_URL}/users/${profile.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ avatar: uploadResult.location }),
    });
  }

  return NextResponse.json({ location: uploadResult.location });
}
