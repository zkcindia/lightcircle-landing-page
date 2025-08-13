"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getProductByIds } from "@/service/apiCreate";
import { Filter, ChevronDown, PackageSearch } from "lucide-react";

export default function AllProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [openFilters, setOpenFilters] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    setLoadingProducts(true);
    try {
      const response = await getProductByIds(slug);
      if (response.status === 200) {
        setProducts(response.data);
        if (response.data.length > 0) {
          setTimeout(() => setShowFilters(true), 100);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProducts(false);
    }
  };

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

  // Filtering Logic
  const filteredProducts = products.filter((product) => {
    let matches = true;

    // AVAILABILITY
    if (selectedFilters["AVAILABILITY"]?.length) {
      matches =
        selectedFilters["AVAILABILITY"].some((status) => {
          if (status === "In Stock") return product.data.stock > 0;
          if (status === "Out of Stock") return product.data.stock === 0;
          if (status === "Pre-Order") return product.data.preorder === true;
          return true;
        }) && matches;
    }

    // PRICE
    if (selectedFilters["PRICE"]?.length) {
      matches =
        selectedFilters["PRICE"].some((range) => {
          const price = product.data.price;
          if (range === "Under ₹5000") return price < 5000;
          if (range === "₹5000 - ₹10000") return price >= 5000 && price <= 10000;
          if (range === "₹10000 & Above") return price > 10000;
          return true;
        }) && matches;
    }

    // APPLICATION LOCATION
    if (selectedFilters["APPLICATION LOCATION"]?.length) {
      matches =
        selectedFilters["APPLICATION LOCATION"].some(
          (loc) => product.data.location?.toLowerCase() === loc.toLowerCase()
        ) && matches;
    }

    // BODY COLOR
    if (selectedFilters["BODY COLOR"]?.length) {
      matches =
        selectedFilters["BODY COLOR"].some(
          (color) => product.data.color?.toLowerCase() === color.toLowerCase()
        ) && matches;
    }

    // COUNTRY OF ORIGIN
    if (selectedFilters["COUNTRY OF ORIGIN"]?.length) {
      matches =
        selectedFilters["COUNTRY OF ORIGIN"].some(
          (country) => product.data.origin?.toLowerCase() === country.toLowerCase()
        ) && matches;
    }

    // DIAMETER
    if (selectedFilters["DIAMETER"]?.length) {
      matches =
        selectedFilters["DIAMETER"].some((size) => {
          const dia = product.data.diameter;
          if (size === "Under 12 inches") return dia < 12;
          if (size === "12-24 inches") return dia >= 12 && dia <= 24;
          if (size === "24 inches & Above") return dia > 24;
          return true;
        }) && matches;
    }

    // LENGTH
    if (selectedFilters["LENGTH"]?.length) {
      matches =
        selectedFilters["LENGTH"].some((len) => {
          const length = product.data.length;
          if (len === "Under 2 feet") return length < 2;
          if (len === "2-4 feet") return length >= 2 && length <= 4;
          if (len === "4 feet & Above") return length > 4;
          return true;
        }) && matches;
    }

    return matches;
  });

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
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
          <div className="w-12 h-12 rounded-full border-t-4 border-b-4 border-orange-500 animate-spin"></div>
        </div>
      )}

      <div className="flex pt-8">
        {/* Sidebar Filters */}
        {!loadingProducts && products.length > 0 && (
          <aside
            className={`hidden md:block w-64 pr-4 sticky top-[140px] h-[calc(100vh-140px)] overflow-y-auto transform transition-all duration-700 ease-in-out scrollbar-hide ${
              showFilters ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
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

        {/* Product Grid */}
        <section className="flex-1 pr-2">
          {loadingProducts ? (
            <p className="text-sm text-gray-500">Loading products...</p>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-4 relative hover:shadow transition rounded-md cursor-pointer group"
                  onClick={() => {
                    setIsLoading(true);
                    router.push(`/allproduct/${p.data.name}`);
                  }}
                >
                  <div className="overflow-hidden rounded">
                    <img
                      src={p.image_url}
                      alt={p.data.name}
                      className="object-cover w-full h-48 rounded transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-2">
                    <h2 className="text-xs">{p.data.name}</h2>
                    <p className="text-red-600 text-xs">₹{p.data.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
              <PackageSearch className="w-16 h-16 mb-4 text-gray-500" />
              <p className="text-sm">No products match your filters.</p>
            </div>
          )}
        </section>
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
