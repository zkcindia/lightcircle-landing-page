"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Menu, Filter, ChevronDown } from "lucide-react";

export default function AllProductPage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  console.log("Received slug:", slug);

  const [showFilters, setShowFilters] = useState(false);
  const [openFilters, setOpenFilters] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});

  const toggleFilter = (label: string) => {
    setOpenFilters((prev) =>
      prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label]
    );
  };

  const handleFilterChange = (category: string, option: string) => {
    setSelectedFilters((prev) => {
      const current = prev[category] || [];
      if (current.includes(option)) {
        return { ...prev, [category]: current.filter((o) => o !== option) };
      } else {
        return { ...prev, [category]: [...current, option] };
      }
    });
  };

  const filters = [
    { label: "AVAILABILITY", options: ["In Stock", "Out of Stock", "Pre-Order"] },
    { label: "PRICE", options: ["Under ₹5000", "₹5000 - ₹10000", "₹10000 & Above"] },
    { label: "APPLICATION LOCATION", options: ["Indoor", "Outdoor", "Bathroom", "Kitchen"] },
    { label: "BODY COLOR", options: ["White", "Black", "Gold", "Silver", "Brown"] },
    { label: "COUNTRY OF ORIGIN", options: ["India", "China", "Germany", "USA"] },
    { label: "DIAMETER", options: ["Under 12 inches", "12-24 inches", "24 inches & Above"] },
    { label: "LENGTH", options: ["Under 2 feet", "2-4 feet", "4 feet & Above"] },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 pb-16 gap-8 relative pt-[140px]">
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
            {filters.map((filter) => {
              const isOpen = openFilters.includes(filter.label);
              return (
                <div key={filter.label} className="mb-4 border-b border-gray-200">
                  <button
                    onClick={() => toggleFilter(filter.label)}
                    className="flex items-center justify-between w-full py-2 text-sm font-medium text-gray-800 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Filter className="w-3 h-3" />
                      {filter.label}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transform transition-transform duration-500 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-700 ease-in-out"
                    style={{
                      maxHeight: isOpen ? `${filter.options.length * 28}px` : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="mt-1 text-xs text-gray-700 space-y-1 pb-2">
                      {filter.options.map((option) => (
                        <div key={option} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            id={option}
                            checked={selectedFilters[filter.label]?.includes(option) || false}
                            onChange={() => handleFilterChange(filter.label, option)}
                            className="h-3 w-3"
                          />
                          <label htmlFor={option}>{option}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
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
