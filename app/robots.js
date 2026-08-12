import { getSiteUrl } from "@/lib/site";

export default function robots() {
  const baseUrl = getSiteUrl();
  return {
    rules: [{ userAgent: "*", allow: ["/", "/product/", "/category/"], disallow: ["/admin", "/login", "/register", "/cart", "/search"] }],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
