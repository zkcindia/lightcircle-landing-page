"use client";

import React, { useEffect, useState } from "react";

export default function HeroSection() {
  const images = [
    "/images/bg1.jpg",
    "/images/bg6.avif",
    "/images/bg2.jpg",
    "/images/bg3.jpg",
    "/images/bg11.avif",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <section className="w-full h-screen relative overflow-hidden pt-[150px] cursor-default">
        {/* Slides */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-2000 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}

        {/* Optional overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero Content */}
        <div className="w-full h-full flex flex-col items-center justify-center text-center px-4 z-10 relative">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold uppercase mb-8 drop-shadow-lg">
            LIGHTS CRAFTED TO CROWN YOUR SPACE
          </h1>
          <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold uppercase hover:bg-yellow-500 transition cursor-pointer">
            EXPLORE NOW
          </button>
        </div>
      </section>

    </>
  );
}
