"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import Link from "next/link";
import SafeImage from "@/app/components/SafeImage";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!query) return;

    const getProducts = async () => {
      const res = await fetch(
        `https://api.escuelajs.co/api/v1/products/?title=${query}`,
      );

      const data = await res.json();
      setProducts(data);
    };

    getProducts();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>

      {products.length === 0 ? (
        <h2 className="text-red-500 text-xl">No products found.</h2>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                <SafeImage
                  src={product.images[0]}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-60 object-cover"
                />

                <div className="p-4">
                  <h2 className="font-bold">{product.title}</h2>

                  <p className="text-blue-600 font-bold mt-2">
                    ${product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-6 text-[#777064]">Loading results…</div>}>
      <SearchResults />
    </Suspense>
  );
}
