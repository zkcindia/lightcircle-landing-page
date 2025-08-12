"use client";

import React, { useEffect, useState } from "react";
import { getSubCategory } from "@/service/apiSubCategory";
import { getCategory } from "@/service/apiCategory";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CategoriesSection() {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [namePlates, setNamePlates] = useState([]);
  const [homeDecor, setHomeDecor] = useState([]);
  const [isLoading, setIsLoading] = useState(false); //  Added loading state


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSubCategory();
        if (res?.data) {
          const filtered = res.data.filter((cat) => cat.image);
          setSubCategories(filtered);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
    fetchData();
  }, []);

  // fetch category

  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const categoryRes = await getCategory();
      if (categoryRes?.data) {
        const filteredCategories = categoryRes.data.filter((cat) => cat.image);
        setCategories(filteredCategories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  fetchCategories();
}, []);



  const handleClick = (slug) => {
    setIsLoading(true); // 🔹 Show loader
    // axios.get('ulr',{form:{}})
    router.push(`/allproduct?slug=${slug}`);
  };

  return (
     <section className="w-full bg-white py-12">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
          <div className="w-12 h-12 rounded-full border-t-4 border-b-4 border-orange-500 animate-spin"></div>
        </div>
      )}

      {categories.map((category, idx) => {
        // Match subcategories for this category
        const matchedSubCats = subCategories.filter(
          (sub) => sub.category === category.slug || sub.category === category.name.toLowerCase()
        );

        if (matchedSubCats.length === 0) return null; // skip if no match

        return (
          <div key={idx} id={`${category.slug}-section`} className="scroll-mt-32 py-12">
            {/* Heading */}
            <h2 className="text-3xl font-light text-center text-black mb-8">
              EXPLORE <span className="font-bold">OUR {category.name}</span>
            </h2>

            {/* Subcategory grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
              {matchedSubCats.map((subCat, subIdx) => (
                <div
                  key={subIdx}
                  onClick={() => handleClick(subCat.slug)}
                  className="relative flex items-end justify-center h-80 overflow-hidden cursor-pointer transition-transform duration-1000 ease-in-out hover:scale-105 rounded-lg shadow-md bg-[#D1B399]"
                >
                  <img
                    src={subCat.image}
                    alt={subCat.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="relative bottom-4 w-full text-center text-white px-2 z-10 mb-4">
                    <h3 className="text-xl font-bold uppercase tracking-wide">
                      {subCat.name}
                    </h3>
                    <div className="w-12 h-px bg-white mx-auto my-2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
