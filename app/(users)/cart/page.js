"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);

    setCartItems(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="max-w-6xl text-blue-600 mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <h2>Your cart is empty.</h2>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border rounded-lg p-4 mb-4"
          >
            <div>
              <h2 className="font-bold">{item.title}</h2>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>

              <button
                onClick={() => handleRemove(item.id)}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>

            <Image
              src={item.image}
              alt={item.title}
              width={100}
              height={100}
              className="w-24 h-24 object-cover rounded"
            />
          </div>
        ))
      )}
    </div>
  );
}
