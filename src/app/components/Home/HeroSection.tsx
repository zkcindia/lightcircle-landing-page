"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // 🔹 Added import

export default function HeroSection() {
  const images = [
    "/images/bg09.png",
    "/images/bg08.png",
    "/images/bg07.png",
    "/images/bg06.png",
    "/images/bg05.png",
  ];

  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // 🔹 Added loading state
  const router = useRouter(); // 🔹 Added router hook

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  // 🔹 Added handler for button click
  const handleExploreClick = () => {
    setIsLoading(true); // Show loader
    router.push("/allproduct?slug=light");
  };

  return (
    <>
      {/* FULLSCREEN LOADING SPINNER */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
          <div className="w-12 h-12 rounded-full border-t-4 border-b-4 border-orange-500 animate-spin"></div>
        </div>
      )}

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
          <button
            onClick={handleExploreClick} // 🔹 Added click handler
            className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold uppercase hover:bg-yellow-500 transition cursor-pointer"
          >
            EXPLORE NOW
          </button>
        </div>
      </section>
    </>
  );
}
