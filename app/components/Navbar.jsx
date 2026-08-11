"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaShoppingCart, FaSearch, FaShopify } from "react-icons/fa";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);

    const fetchProducts = async () => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();

    const fetchCategories = async () => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/categories");
        const data = await res.json();

        setCategories(data.slice(0, 4));
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    if (e.key !== "Enter") return;

    if (!search.trim()) return;

    const product = products.find((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );

    if (product) {
      router.push(`/search?q=${search}`);
      setSearch("");
    } else {
      alert("Product not found");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#fbf8f2]/95 backdrop-blur border-b border-[#dfd7ca]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="bg-[#e96546] p-2.5 rounded-full group-hover:rotate-6 transition duration-300">
            <FaShopify className="text-2xl text-white" />
          </div>

          <h1 className="display-type text-3xl font-bold text-[#2d2924]">
            shopper<span className="text-[#e96546]">.</span>
          </h1>
        </Link>

        <div className="hidden lg:flex items-center bg-[#f1ece3] border border-[#dfd7ca] rounded-full px-4 py-2.5 w-105 focus-within:border-[#e96546] transition">
          <FaSearch className="text-[#777064] mr-3" />

          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            className="bg-transparent w-full outline-none text-[#2d2924] placeholder:text-[#8a8378]"
          />
        </div>

        <div className="flex items-center gap-6">
          <Link href="/about" className="hidden md:block text-sm font-semibold text-[#5e574e] hover:text-[#e96546]">About</Link>
          <Link href="/contact" className="hidden md:block text-sm font-semibold text-[#5e574e] hover:text-[#e96546]">Contact</Link>

          <Link
            href="/cart"
            className="relative hover:scale-110 transition duration-300"
          >
            <FaShoppingCart className="text-xl text-[#2d2924] hover:text-[#e96546]" />

            <span className="absolute -top-2 -right-2 bg-[#e96546] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </Link>

          <Link
            href="/login"
             className="bg-[#2d2924] hover:bg-[#e96546] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition duration-300"
          >
            Log In / Sign Up
          </Link>
        </div>
      </div>

      <div className="bg-[#f1ece3] border-t border-[#dfd7ca]">
        <div className="max-w-7xl mx-auto px-6">
          <ul className="flex justify-center items-center gap-10 py-3 overflow-x-auto whitespace-nowrap">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/category/${category.id}`}
                  className="relative text-[#5e574e] text-sm font-semibold hover:text-[#e96546] transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#e96546] after:transition-all hover:after:w-full"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// ${encodeURIComponent(search.trim())}
