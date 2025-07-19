"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AllProductPage() {
  const router = useRouter()
  // 40 light products
  const lightProducts = Array.from({ length: 40 }, (_, i) => ({
    id: `light-${i + 1}`,
    name: `Light Product ${i + 1}`,
    price: `₹${7500 + i * 100}`,
    oldPrice: `₹${10000 + i * 100}`,
    image: `/images/light/${i + 1}.jpeg`,
  }));

  // 40 fan products
  const fanProducts = Array.from({ length: 40 }, (_, i) => ({
    id: `fan-${i + 1}`,
    name: `Fan Product ${i + 1}`,
    price: `₹${5500 + i * 80}`,
    oldPrice: `₹${8000 + i * 80}`,
    image: `/images/light/${i + 41}.jpeg`,
  }));

  // 40 Home Decor products (81 to 120)
  const homeDecorProducts = Array.from({ length: 40 }, (_, i) => ({
    id: `decor-${81 + i}`,
    name: `Home Decor Product ${81 + i}`,
    price: `₹${3500 + i * 50}`,
    oldPrice: `₹${5000 + i * 50}`,
    image: `/images/light/${81 + i}.jpeg`,
  }));

  // 40 Name Plate products (121 to 160)
  const namePlateProducts = Array.from({ length: 40 }, (_, i) => ({
    id: `nameplate-${121 + i}`,
    name: `Name Plate ${121 + i}`,
    price: `₹${2500 + i * 40}`,
    oldPrice: `₹${4000 + i * 40}`,
    image: `/images/light/${121 + i}.jpeg`,
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
        <aside className="hidden md:block w-64 pr-4 sticky top-[140px] h-[calc(100vh-140px)] overflow-y-auto">
          {filters.map((filter) => (
            <details key={filter} className="mb-4">
              <summary className="cursor-pointer font-medium pb-2 text-sm border-b border-gray-300">
                {filter}
              </summary>
              <div className="mt-2 text-xs text-gray-500">(Filter options)</div>
            </details>
          ))}
        </aside>

        {/* Product Sections */}
        <section className="flex-1 pr-2 space-y-16">
          {/* Lights */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Lights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {lightProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-4 relative hover:shadow transition rounded-md cursor-pointer group"
                  onClick={()=>router.push(`/allproduct/${p.name}`)}
                >
                  <div className="overflow-hidden rounded">
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={180}
                      height={180}
                      className="object-cover w-full h-auto rounded transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                  </div>
                  <h2 className="mt-2 text-xs">{p.name}</h2>
                  <p className="text-red-600 text-xs">{p.price}</p>
                  <p className="line-through text-gray-500 text-[10px]">
                    {p.oldPrice}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Fans */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Fans</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {fanProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-4 relative hover:shadow transition rounded-md cursor-pointer group"
                >
                  <div className="overflow-hidden rounded">
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={180}
                      height={180}
                      className="object-cover w-full h-auto rounded transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                  </div>
                  <h2 className="mt-2 text-xs">{p.name}</h2>
                  <p className="text-red-600 text-xs">{p.price}</p>
                  <p className="line-through text-gray-500 text-[10px]">
                    {p.oldPrice}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Home Decor */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Home Decor</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {homeDecorProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-4 relative hover:shadow transition rounded-md cursor-pointer group"
                >
                  <div className="overflow-hidden rounded">
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={180}
                      height={180}
                      className="object-cover w-full h-auto rounded transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                  </div>
                  <h2 className="mt-2 text-xs">{p.name}</h2>
                  <p className="text-red-600 text-xs">{p.price}</p>
                  <p className="line-through text-gray-500 text-[10px]">
                    {p.oldPrice}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Name Plates */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Name Plates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {namePlateProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-4 relative hover:shadow transition rounded-md cursor-pointer group"
                >
                  <div className="overflow-hidden rounded">
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={180}
                      height={180}
                      className="object-cover w-full h-auto rounded transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                  </div>
                  <h2 className="mt-2 text-xs">{p.name}</h2>
                  <p className="text-red-600 text-xs">{p.price}</p>
                  <p className="line-through text-gray-500 text-[10px]">
                    {p.oldPrice}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
