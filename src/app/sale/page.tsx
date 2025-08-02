"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Menu } from "lucide-react";

export default function AllProductPage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  console.log("Received slug:", slug);

  const [showFilters, setShowFilters] = useState(false);

  const filters = [
    {
      label: "AVAILABILITY",
      options: ["In Stock", "Out of Stock", "Pre-Order"],
    },
    {
      label: "PRICE",
      options: ["Under ₹5000", "₹5000 - ₹10000", "₹10000 & Above"],
    },
    {
      label: "APPLICATION LOCATION",
      options: ["Indoor", "Outdoor", "Bathroom", "Kitchen"],
    },
    {
      label: "BODY COLOR",
      options: ["White", "Black", "Gold", "Silver", "Brown"],
    },
    {
      label: "COUNTRY OF ORIGIN",
      options: ["India", "China", "Germany", "USA"],
    },
    {
      label: "DIAMETER",
      options: ["Under 12 inches", "12-24 inches", "24 inches & Above"],
    },
    {
      label: "LENGTH",
      options: ["Under 2 feet", "2-4 feet", "4 feet & Above"],
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 pb-16 gap-8 relative pt-[140px]">
      {/* PRODUCTS Heading */}
      <div className="fixed top-34 w-full border-b border-gray-300 z-30 bg-white">
        <h1 className="text-xs tracking-wide text-center py-2">PRODUCTS</h1>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex justify-between items-center pt-4 pb-2">
        <button
          className="flex items-center gap-1 text-sm font-medium"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Menu size={18} />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row pt-4 md:pt-8">
        {/* Sidebar Filters */}
        {(showFilters || typeof window === "undefined" || window.innerWidth >= 768) && (
          <aside className="w-full md:w-64 pr-4 md:sticky md:top-[140px] md:h-[calc(100vh-140px)] overflow-y-auto md:block">
            {filters.map((filter) => (
              <details key={filter.label} className="mb-4">
                <summary className="cursor-pointer font-medium pb-2 text-sm border-b border-gray-300">
                  {filter.label}
                </summary>
                <div className="mt-2 text-xs text-gray-700 space-y-1">
                  {filter.options.map((option) => (
                    <div key={option} className="flex items-center gap-2">
                      <input type="checkbox" id={option} className="h-3 w-3" />
                      <label htmlFor={option}>{option}</label>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </aside>
        )}

        {/* Products Section */}
        <section className="flex-1 pr-0 md:pr-2 space-y-16">
          {["Lights", "Fans", "Home Decor", "Name Plates"].map((section) => (
            <div key={section}>
              <h2 className="text-lg font-semibold mb-4">{section}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => {
                  const originalPrice = i % 2 === 0 ? 3999 : 12500;
                  const salePrice = i % 2 === 0 ? 2900 : 7200;
                  const savings = originalPrice - salePrice;

                  return (
                    <div
                      key={i}
                      className="p-4 relative hover:shadow transition rounded-md cursor-pointer group border"
                    >
                      {/* Save Badge */}
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-semibold px-2 py-1 rounded-sm z-10">
                        SAVE ₹{savings}
                      </div>

                      <div className="overflow-hidden rounded bg-gray-200">
                        <Image
                          src="/images/light/1.jpeg"
                          alt="Product"
                          width={180}
                          height={180}
                          className="object-cover w-full h-auto rounded"
                        />
                      </div>
                      <h2 className="mt-2 text-xs">
                        Product Name Placeholder {i + 1}
                      </h2>
                      <p className="text-red-600 text-xs">₹{salePrice}</p>
                      <p className="line-through text-gray-500 text-[10px]">
                        ₹{originalPrice}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
