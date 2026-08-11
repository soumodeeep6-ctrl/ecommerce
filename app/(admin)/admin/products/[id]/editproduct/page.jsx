"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(
          `https://api.escuelajs.co/api/v1/products/${id}`,
        );

        const data = await res.json();

        setTitle(data.title);
        setPrice(data.price);
        setDescription(data.description);
        setCategoryId(data.category.id);
        setImage(data.images[0]);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      getProduct();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      title,
      price: Number(price),
      description,
      categoryId: Number(categoryId),
      images: [image],
    };

    try {
      const res = await fetch(
        `https://api.escuelajs.co/api/v1/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        },
      );

      if (!res.ok) {
        throw new Error("Update failed");
      }

      alert("Product Updated Successfully!");

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.log(error);
      alert("Failed to update product");
    }
  };

  if (loading) {
    return <h1 className="text-center text-3xl mt-20 font-bold">Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-blue-600 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Edit Product</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white text-black shadow-lg rounded-lg p-8"
      >
        <div className="mb-4">
          <label className="font-semibold text-blue-600 block mb-2">
            Product ID
          </label>

          <input
            type="text"
            value={id}
            readOnly
            className="w-full border rounded-lg px-4 py-2 bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold text-blue-600 block mb-2">
            Product Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold text-blue-600 block mb-2">
            Product Price
          </label>

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold text-blue-600 block mb-2">
            Description
          </label>

          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold text-blue-600 block mb-2">
            Category ID
          </label>

          <input
            type="number"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="font-semibold text-blue-600 block mb-2">
            Image URL
          </label>

          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div className="mb-6">
          <Image
            src={image}
            alt="Preview"
            width={160}
            height={160}
            className="w-40 h-40 object-cover rounded-lg border"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
