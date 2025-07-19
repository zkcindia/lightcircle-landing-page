"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function ProductPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOffer, setShowOffer] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = () => {
    console.log("Review Submitted:", { rating, reviewTitle, reviewContent });
    setSubmitted(true);
    setTimeout(() => {
      setRating(0);
      setHoverRating(0);
      setReviewTitle("");
      setReviewContent("");
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <main className="h-auto px-4 py-10 pt-40 flex flex-col md:flex-row gap-10">
        {/* LEFT: Product Image */}
        <div className="flex-1 flex justify-center">
          <div className="sticky top-40">
            <Image
              src="/images/light/1.jpeg"
              alt="Product"
              width={400}
              height={400}
              className="object-contain max-w-full h-auto"
            />
          </div>
        </div>

        {/* RIGHT: Product Details */}
        <div
          className="flex-1 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-10rem)] pr-4 scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          <h1 className="text-2xl md:text-3xl font-semibold">
            LIGHT CIRCLE METAL AND GLASS LED MIRROR WALL LIGHT
          </h1>
          <p className="text-xl font-bold">₹ 3,250</p>
          <p className="text-sm text-gray-500">(Inclusive of all taxes)</p>

          {/* Product Description */}
          <div className="text-sm text-gray-600 leading-relaxed space-y-4">
            <p>
              Enhance your space with the{" "}
              <strong>LIGHT CIRCLE METAL AND GLASS LED MIRROR WALL LIGHT</strong>,
              designed for stylish and efficient illumination.
              {!isExpanded && (
                <button
                  onClick={() => setIsExpanded(true)}
                  className="text-blue-600 underline cursor-pointer ml-1"
                >
                  Read More
                </button>
              )}
            </p>

            {isExpanded && (
              <>
                <p>
                  Perfect for mirrors, vanities, and modern interiors, this light adds a warm 3000K glow for a comfortable and elegant ambiance.
                </p>
                <ul className="list-none space-y-1">
                  <li>✅ Multiple Wattage Options: Available in 5W, 10W, and 15W to suit your lighting needs.</li>
                  <li>✅ Premium Finish: Choose from Silver & Brush Gold for a sophisticated look.</li>
                  <li>✅ Sleek & Modern Design: Compact size (480MM Length x 127MM Height) for seamless installation.</li>
                  <li>✅ Bright & Energy-Efficient: High-quality LED with low power consumption.</li>
                  <li>✅ Perfect for: Mirrors, dressing areas, vanities, bathrooms, and decorative lighting.</li>
                </ul>
                <p>
                  Upgrade your space with LIGHT CIRCLE METAL AND GLASS LED MIRROR WALL LIGHT—a perfect combination of style, functionality, and efficiency!
                </p>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-blue-600 underline cursor-pointer"
                >
                  Read Less
                </button>
              </>
            )}
          </div>

          {/* Offers */}
          <div className="border-t border-b border-gray-300 py-4">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowOffer(!showOffer)}
            >
              <div className="flex items-center gap-2">
                <span>🏷️</span>
                <p className="uppercase text-sm text-gray-700 tracking-wide">
                  Offers and Discounts
                </p>
              </div>
              <span className="text-xl">{showOffer ? "−" : "+"}</span>
            </div>
            {showOffer && (
              <div className="mt-4 text-sm text-gray-600">
                Get flat <span className="text-red-600 font-semibold">₹100 off</span> — Use code <strong>TRYUS</strong>.
              </div>
            )}
          </div>

          {/* Warranty/Service */}
          <div className="flex gap-6 mt-6">
            <div className="flex flex-col items-center text-xs text-gray-600">
              <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">🏷️</span>
              <p className="text-center">1 Year Warranty</p>
            </div>
            <div className="flex flex-col items-center text-xs text-gray-600">
              <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">🤝</span>
              <p className="text-center">Dedicated Support</p>
            </div>
            <div className="flex flex-col items-center text-xs text-gray-600">
              <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">🔄</span>
              <p className="text-center">Damage Replacement</p>
            </div>
          </div>

          {/* Product Details */}
          <div className="border-t border-b border-gray-300 py-4 mt-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowDetails(!showDetails)}
            >
              <div className="flex items-center gap-2">
                <span>ℹ️</span>
                <p className="uppercase text-sm text-gray-700 tracking-wide">
                  Product Details
                </p>
              </div>
              <span className="text-xl">{showDetails ? "−" : "+"}</span>
            </div>

            {showDetails && (
              <table className="mt-4 w-full text-sm text-gray-600 border border-gray-200">
                <tbody>
                  {/* Product Details Rows */}
                  <tr className="border-b border-gray-200"><td className="p-2 font-semibold">Brand</td><td className="p-2">Light Circle</td></tr>
                  <tr className="border-b border-gray-200"><td className="p-2 font-semibold">Material</td><td className="p-2">Metal</td></tr>
                  <tr className="border-b border-gray-200"><td className="p-2 font-semibold">Body Finish</td><td className="p-2">Brass Black</td></tr>
                  <tr className="border-b border-gray-200"><td className="p-2 font-semibold">Mounting System</td><td className="p-2">Surface</td></tr>
                  <tr className="border-b border-gray-200"><td className="p-2 font-semibold">Application Area</td><td className="p-2">Indoor (Dry Rated)</td></tr>
                  <tr className="border-b border-gray-200"><td className="p-2 font-semibold">Country of Origin</td><td className="p-2">China</td></tr>
                  <tr className="border-b border-gray-200"><td className="p-2 font-semibold">IP Rating</td><td className="p-2">IP 20</td></tr>
                  <tr className="border-b border-gray-200"><td className="p-2 font-semibold">Height</td><td className="p-2">120MM (0.39 feet)</td></tr>
                  <tr className="border-b border-gray-200"><td className="p-2 font-semibold">Diameter</td><td className="p-2">100MM (0.32 feet)</td></tr>
                  <tr className="border-b border-gray-200"><td className="p-2 font-semibold">Wattage</td><td className="p-2">5W</td></tr>
                  <tr className="border-b border-gray-200"><td className="p-2 font-semibold">Length</td><td className="p-2">480MM (1.57 feet)</td></tr>
                  <tr className="border-b border-gray-200"><td className="p-2 font-semibold">Width</td><td className="p-2">70MM (0.22 feet)</td></tr>
                  <tr className="border-b border-gray-200"><td className="p-2 font-semibold">Voltage</td><td className="p-2">220-240VAC</td></tr>
                  <tr><td className="p-2 font-semibold">Lamp Type</td><td className="p-2">LED SMD</td></tr>
                  <tr><td className="p-2 font-semibold">Warranty</td><td className="p-2">12 Months</td></tr>
                </tbody>
              </table>
            )}
          </div>
        </div>

        <style jsx global>{`
          ::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </main>

      {/* === YOU MAY ALSO LIKE SECTION === */}
      <section className="w-full flex flex-col items-center py-10 border-t border-gray-300">
        <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full px-4">
          <div className="flex flex-col items-center text-center">
            <Image src="/images/light/9.jpeg" alt="Product 1" width={300} height={300} className="object-cover rounded-md" />
            <p className="mt-4 text-sm font-medium">ANKUR FIOCCO METAL AND GLASS LED MIRROR LIGHT</p>
            <p className="text-gray-600 text-xs">FROM ₹ 8,250</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Image src="/images/light/30.jpeg" alt="Product 2" width={300} height={300} className="object-cover rounded-md" />
            <p className="mt-4 text-sm font-medium">ANKUR SOVEREIGN VINTAGE STYLE METAL AND GLASS MIRROR LIGHT</p>
            <p className="text-gray-600 text-xs">FROM ₹ 4,600</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Image src="/images/light/18.jpeg" alt="Product 3" width={300} height={300} className="object-cover rounded-md" />
            <p className="mt-4 text-sm font-medium">ANKUR RICCARDO METAL AND GLASS WALL LIGHT</p>
            <p className="text-gray-600 text-xs">FROM ₹ 2,000</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Image src="/images/light/5.jpeg" alt="Product 4" width={300} height={300} className="object-cover rounded-md" />
            <p className="mt-4 text-sm font-medium">ANKUR LORENZO VINTAGE STYLE METAL AND GLASS WALL LIGHT</p>
            <p className="text-gray-600 text-xs">FROM ₹ 2,450</p>
          </div>
        </div>
      </section>

            {/* === Recently viewed SECTION === */}
      <section className="w-full flex flex-col items-center py-10 border-t border-gray-300">
        <h2 className="text-2xl font-semibold mb-6">Recently viewed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full px-4">
          <div className="flex flex-col items-center text-center">
            <Image src="/images/light/13.jpeg" alt="Product 1" width={300} height={300} className="object-cover rounded-md" />
            <p className="mt-4 text-sm font-medium">ANKUR FIOCCO METAL AND GLASS LED MIRROR LIGHT</p>
            <p className="text-gray-600 text-xs">FROM ₹ 8,250</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Image src="/images/light/22.jpeg" alt="Product 2" width={300} height={300} className="object-cover rounded-md" />
            <p className="mt-4 text-sm font-medium">ANKUR SOVEREIGN VINTAGE STYLE METAL AND GLASS MIRROR LIGHT</p>
            <p className="text-gray-600 text-xs">FROM ₹ 4,600</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Image src="/images/light/33.jpeg" alt="Product 3" width={300} height={300} className="object-cover rounded-md" />
            <p className="mt-4 text-sm font-medium">ANKUR RICCARDO METAL AND GLASS WALL LIGHT</p>
            <p className="text-gray-600 text-xs">FROM ₹ 2,000</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Image src="/images/light/14.jpeg" alt="Product 4" width={300} height={300} className="object-cover rounded-md" />
            <p className="mt-4 text-sm font-medium">ANKUR LORENZO VINTAGE STYLE METAL AND GLASS WALL LIGHT</p>
            <p className="text-gray-600 text-xs">FROM ₹ 2,450</p>
          </div>
        </div>
      </section>

      {/* === REVIEW SECTION === */}
      <section className="w-full flex justify-center py-10 border-t border-gray-300">
        <div className="w-full max-w-sm bg-white p-6 shadow-lg rounded-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Write a review</h2>

          <div className="mb-4 text-center">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill={star <= (hoverRating || rating) ? "#facc15" : "none"}
                  stroke="#000"
                  className="w-6 h-6 cursor-pointer"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 00.95.69h4.165c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.956c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.285-3.956a1 1 0 00-.364-1.118L2.07 9.383c-.783-.57-.38-1.81.588-1.81h4.165a1 1 0 00.95-.69l1.286-3.956z"
                  />
                </svg>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <textarea
              rows={3}
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              placeholder="Your review..."
              className="w-full border border-gray-400 p-2 focus:outline-none"
            ></textarea>
          </div>

          <button
            onClick={handleSubmitReview}
            className="w-full px-6 py-2 bg-black text-white text-sm uppercase cursor-pointer"
          >
            Submit
          </button>

          {submitted && (
            <p className="mt-4 text-green-600 text-center">Thank you for your review!</p>
          )}
        </div>
      </section>
    </>
  );
}
