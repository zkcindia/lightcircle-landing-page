"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { getProductById, getProductByIds } from "@/service/apiCreate";

export default function AllProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  console.log("Received slug:", slug);

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Fetch products from API when page loads
  useEffect(() => {
    setLoadingProducts(true);
    fetchProduct();
    // axios
    //   .get("http://192.168.1.7:8001/item/")
    //   .then((res) => {
    //     const filtered = res.data.filter(
    //       (item) => item.data?.category?.toLowerCase() === "light"
    //     );
    //     setProducts(filtered);
    //     setLoadingProducts(false);
    //   })
    //   .catch((err) => {
    //     console.error("Error fetching products:", err);
    //     setLoadingProducts(false);
    //   });
  }, []);
  // fetch product
  const fetchProduct = async()=>{
    setLoadingProducts(true);
    try {
      const response = await getProductByIds(slug);
      if(response.status===200){
        setProducts(response.data)
      }
    } catch (error) {
      console.log(error);
      
    }finally{
      setLoadingProducts(false);
    }
  }

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

      <div className="fixed top-34 w-full border-b border-gray-300 z-30 bg-white">
        <h1 className="text-xs tracking-wide text-center py-2 uppercase">
          Light Products
        </h1>
      </div>

      <div className="flex pt-8">
        {/* Sidebar Filters */}
        <aside className="hidden md:block w-64 pr-4 sticky top-[140px] h-[calc(100vh-140px)] overflow-y-auto">
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

        {/* Product Grid */}
        <section className="flex-1 pr-2">
          {loadingProducts ? (
            <p className="text-sm text-gray-500">Loading products...</p>
          ) : products.length > 0 ? (
            <div>
              {/* <h2 className="text-lg font-semibold mb-4 capitalize">Light Products</h2> */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((p) => (
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
                        width={180}
                        height={180}
                        className="object-cover w-full h-auto rounded transition-transform duration-300 ease-in-out group-hover:scale-105"
                      />
                    </div>
                    <h2 className="mt-2 text-xs">{p.data.name}</h2>
                    <p className="text-red-600 text-xs">₹{p.data.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No light products found.</p>
          )}
        </section>
      </div>
    </main>
  );
}
