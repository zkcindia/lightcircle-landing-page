"use client";

import React, { useEffect, useState } from "react";
import { getSubCategory } from "@/service/apiSubCategory";
import { useRouter } from "next/navigation";

export default function CategoriesSection() {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [namePlates, setNamePlates] = useState([]);
  const [homeDecor, setHomeDecor] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // 🔹 Added loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSubCategory();
        if (res?.data) {
          const apiData = res.data;
          setCategories(apiData.filter(item => item.category === "light"));
          setNewArrivals(apiData.filter(item => item.category === "fan"));
          setHomeDecor(apiData.filter(item => item.category === "home-decor"));
          setNamePlates(apiData.filter(item => item.category === "name-plate"));
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
    fetchData();
  }, []);

  const handleClick = (slug) => {
    setIsLoading(true); // 🔹 Show loader
    router.push(`/allproduct?slug=${slug}`);
  };

  return (
    <section className="w-full bg-white py-12">
      {/* FULLSCREEN LOADING SPINNER */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
          <div className="w-12 h-12 rounded-full border-t-4 border-b-4 border-orange-500 animate-spin"></div>
        </div>
      )}

      {/* EXPLORE OUR LIGHTS */}
      <div id="lights-section" className="scroll-mt-32 py-12">
        <h2 className="text-3xl font-light text-center text-black mb-8">
          EXPLORE <span className="font-bold">OUR LIGHTS</span>
        </h2>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleClick("light")}
            className="relative flex items-end justify-center h-80 overflow-hidden cursor-pointer transition-transform duration-1000 ease-in-out hover:scale-105 rounded-lg shadow-md bg-[#D1B399]"
          >
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative bottom-4 w-full text-center text-white px-2 z-10 mb-4">
              <h3 className="text-xl font-bold uppercase tracking-wide">
                {category.name}
              </h3>
              <div className="w-12 h-px bg-white mx-auto my-2"></div>
            </div>
          </div>
        ))}
      </div>

      {/* EXPLORE OUR FANS */}
      <div id="fans-section" className="scroll-mt-32 py-12">
        <h2 className="text-3xl font-light text-center text-black mb-8">
          EXPLORE <span className="font-bold">OUR FANS</span>
        </h2>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
        {newArrivals.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick("fan")}
            className="relative flex items-end justify-center h-80 overflow-hidden cursor-pointer transition-transform duration-1000 ease-in-out hover:scale-105 rounded-lg shadow-md bg-[#D1B399]"
          >
            <img
              src={item.image}
              alt={item.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative bottom-4 w-full text-center text-white px-2 z-10 mb-4">
              <h3 className="text-xl font-bold uppercase tracking-wide">
                {item.name}
              </h3>
              <div className="w-12 h-px bg-white mx-auto my-2"></div>
            </div>
          </div>
        ))}
      </div>

      {/* HOME DECOR */}
      <div id="home-decor-section" className="scroll-mt-32 py-12">
        <h2 className="text-3xl font-bold text-center text-black mb-8">
          HOME DECOR
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
          {homeDecor.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClick("home-decor")}
              className="relative flex items-end justify-center h-[300px] overflow-hidden cursor-pointer transition-transform duration-1000 ease-in-out hover:scale-105 rounded-lg shadow-md bg-[#D1B399]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* NAME PLATES */}
      <div id="name-plates-section" className="scroll-mt-32 py-12">
        <h2 className="text-3xl font-bold text-center text-black mb-8">
          NAME PLATES
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
          {namePlates.map((plate, index) => (
            <div
              key={index}
              onClick={() => handleClick("name-plate")}
              className="relative flex items-end justify-center h-80 overflow-hidden cursor-pointer transition-transform duration-1000 ease-in-out hover:scale-105 rounded-lg shadow-md bg-[#D1B399]"
            >
              <img
                src={plate.image}
                alt={plate.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative bottom-4 w-full text-center text-white px-2 z-10 mb-4">
                <h3 className="text-xl font-bold uppercase tracking-wide">
                  {plate.name}
                </h3>
                <div className="w-12 h-px bg-white mx-auto my-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
