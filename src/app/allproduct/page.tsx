"use client";

import React from "react";
import Image from "next/image";

export default function AllProductPage() {
  const products = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: `₹${7500 + i * 100}`,
    oldPrice: `₹${10000 + i * 100}`,
    // 👉 Dynamic image name: 1.jpeg, 2.jpeg, ... 25.jpeg
    image: `/images/light/${i + 1}.jpeg`,

  }));

  const filters = [
    "AVAILABILITY",
    "PRICE",
    "APPLICATION LOCATION",
    "BODY COLOR",
    "COUNTRY OF ORIGIN",
    "DIAMETER",
    "LENGTH",
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 pb-16 gap-8 relative pt-[140px]">
      {/* PRODUCTS Heading with underline */}
      <div className="fixed top-34 w-full border-b border-gray-300 z-30 bg-white">
        <h1 className="text-xs tracking-wide text-center py-2">PRODUCTS</h1>
      </div>

      <div className="flex pt-8">
        {/* Sidebar */}
        <aside className="w-64 border-gray-300 pr-4 sticky top-[140px] h-[calc(100vh-140px)] overflow-y-auto">
          {filters.map((filter) => (
            <details key={filter} className="mb-4">
              <summary className="cursor-pointer font-medium border-b border-gray-300 pb-2 text-sm">
                {filter}
              </summary>
              <div className="mt-2 text-xs text-gray-500">(Filter options)</div>
            </details>
          ))}
        </aside>

        {/* Product Grid */}
        <section className="flex-1 pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="border border-gray-300 p-4 relative hover:shadow transition"
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  width={180}
                  height={180}
                  className="object-cover"
                />
                <h2 className="mt-2 text-xs">{p.name}</h2>
                <p className="text-red-600 text-xs">{p.price}</p>
                <p className="line-through text-gray-500 text-[10px]">
                  {p.oldPrice}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
