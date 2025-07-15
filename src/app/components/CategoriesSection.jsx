"use client";

import React from "react";

export default function CategoriesSection() {
  const categories = [
    { name: "Chandeliers", image: "/images/j.png" },
    { name: "Pendant Lights", image: "/images/Pendant_Lights.png" },
    { name: "Floor Lamps", image: "/images/f.png" },
    { name: "Wall Lights", image: "/images/w.png" },
    { name: "Table Lamps", image: "/images/t.png" },
    { name: "Ceiling Lights", image: "/images/C.png" },
  ];

  const newArrivals = [
    { name: "Table Fans", image: "/images/table.png" },
    { name: "Ceiling Fans", image: "/images/cilling.png" },
    { name: "Stand Fans", image: "/images/stand.png" },
  ];

  const namePlates = [
    { name: "Classic Plate", image: "/images/np.jpeg" },
    { name: "Modern Plate", image: "/images/download.jpeg" },
    { name: "Wooden Plate", image: "/images/wooden.jpeg" },
    { name: "Metal Plate", image: "/images/metal.jpeg" },
  ];

  return (
    <section className="w-full bg-white py-12">
      {/* EXPLORE OUR LIGHTS */}
      <div id="lights-section" className="scroll-mt-32 py-12">
        <h2 className="text-3xl font-light text-center text-black mb-8">
          EXPLORE <span className="font-bold">OUR LIGHTS</span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 mb-20">
        {categories.map((category, index) => (
          <div
            key={index}
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

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 mb-20">
        {newArrivals.map((item, index) => (
          <div
            key={index}
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
        <div className="max-w-10xl mx-auto px-4 mb-20">
          <img
            src="/images/homedecor.jpg"
            alt="Home Decor"
            className="w-full h-[300px] object-cover rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* NAME PLATES */}
      <div id="name-plates-section" className="scroll-mt-32 py-12">
        <h2 className="text-3xl font-bold text-center text-black mb-8">
          NAME PLATES
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
          {namePlates.map((plate, index) => (
            <div
              key={index}
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
