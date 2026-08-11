"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddToCartButton({ product }) {
  const router = useRouter();

  const handleAddToCart = (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    const total = cart.reduce((sum, item) => sum + item.quantity, 0);

    alert("Product added to cart!");

    router.push("/cart");
    // return total;
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
    >
      Add to Cart
    </button>
  );
}
