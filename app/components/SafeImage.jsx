"use client";

import Image from "next/image";
import { useState } from "react";

const FALLBACK = "https://placehold.co/600x400/f1ece3/777064?text=Image+unavailable";

export default function SafeImage({ src, alt, ...props }) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK);
  return <Image {...props} src={imageSrc} alt={alt || "Product image"} unoptimized onError={() => setImageSrc(FALLBACK)} />;
}
