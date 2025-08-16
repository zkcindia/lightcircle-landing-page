"use client";

import React from "react";
import { Quote } from "lucide-react"; // Optional: use an icon if you want

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-white px-4 py-20 text-center text-gray-700 pt-72">
      <h2 className="text-3xl font-light mb-6">
        <span className="font-bold text-black">ABOUT US</span>
      </h2>

      <h3 className="text-xl md:text-2xl font-bold text-black mb-8">
        LIGHT IS THE BUILDING BLOCK OF LIFE AND ORIGIN OF ALL BEING.
      </h3>

      <div className="max-w-4xl text-base leading-relaxed text-gray-600 space-y-6 text-justify">
        <p>
          At Light Circle, we illuminate spaces with elegance, innovation, and luxury.
          Specializing in premium chandeliers, decorative lighting, and bespoke illumination solutions,
          we bring brilliance to homes, hotels, offices, and commercial spaces.
          Our collection blends cutting-edge technology with timeless designs,
          ensuring each piece not only enhances aesthetics but also creates the perfect ambiance.
        </p>

        <p>
          With a commitment to quality and craftsmanship, Light Circle offers a curated selection of
          modern, classic, and artistic lighting solutions. Whether you’re looking to make a bold statement
          with a grand chandelier or add subtle charm with accent lighting, we help transform spaces into
          breathtaking experiences. Let Light Circle brighten your world with elegance and sophistication.
        </p>

        <p>
          Visit{" "}
          <a href="https://lightcicle.in" className="text-blue-600 underline">
            lightcircle.in
          </a>{" "}
          to see our widest range of decorative lights.
        </p>

        <p>Happy Lighting!</p>
      </div>

      {/* Quote Section */}
      <section className="mt-20 max-w-3xl text-center px-4">
        <div className="text-gray-400 mb-2">
          <span className="text-5xl leading-none">"</span>
        </div>
        <blockquote className="text-xl md:text-2xl text-gray-900 font-light mb-2">
          THE SECRET TO LIFE IS TO PUT YOURSELF IN <br />
          THE RIGHT LIGHTING
        </blockquote>
        <div className="text-gray-400 mb-2">
          <span className="text-5xl leading-none">"</span>
        </div>
        
        <cite className="block text-lg text-gray-700">— SUSAN CAIN</cite>
      </section>
    </main>
  );
}
