import { API_URL } from "@/lib/api";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap() {
  const baseUrl = getSiteUrl();
  const routes = ["", "/about", "/contact", "/product", "/category"];
  let productRoutes = [];
  let categoryRoutes = [];

  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      fetch(`${API_URL}/products?limit=100`, { next: { revalidate: 3600 } }),
      fetch(`${API_URL}/categories`, { next: { revalidate: 3600 } }),
    ]);
    if (productsResponse.ok) productRoutes = (await productsResponse.json()).map((product) => `/product/${product.id}`);
    if (categoriesResponse.ok) categoryRoutes = (await categoriesResponse.json()).map((category) => `/category/${category.id}`);
  } catch {
    // Keep the core sitemap available if the demo API is temporarily unavailable.
  }

  return [...new Set([...routes, ...productRoutes, ...categoryRoutes])].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
