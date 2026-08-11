export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.escuelajs.co/api/v1";

export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.message || "API request failed");
  return data;
}

export const api = {
  products: (query = "") => apiFetch(`/products${query}`),
  product: (id) => apiFetch(`/products/${id}`),
  relatedProducts: (id) => apiFetch(`/products/${id}/related`),
  categories: () => apiFetch("/categories"),
  category: (id) => apiFetch(`/categories/${id}`),
  categoryProducts: (id) => apiFetch(`/categories/${id}/products`),
  users: () => apiFetch("/users"),
};
