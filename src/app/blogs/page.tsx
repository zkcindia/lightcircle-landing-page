"use client";

import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Brighten Up Your Monsoon: LED Lighting Tips for Damp Weather",
    excerpt:
      "When the monsoon season rolls around, it brings with it refreshing rains, cool breezes, and a sense of rejuvenation...",
    image: "/images/b1.jpg",
    link: "/blogs/brighten-up-your-monsoon",
  },
  {
    id: 2,
    title: "Bright Ideas for a Brilliant Summer: Commercial Lighting Tips for June",
    excerpt:
      "As the summer sun shines brighter and days grow longer, businesses have a golden opportunity to upgrade their lighting...",
    image: "/images/b2.jpg",
    link: "/blogs/bright-ideas-for-summer",
  },
  {
    id: 3,
    title: "Happy Summer, Happy Spaces: Uplifting Your Interiors with Light",
    excerpt:
      "As the sun climbs higher and the days stretch out invitingly, there's an undeniable buzz in the air. Summer is here...",
    image: "/images/b3.jpg",
    link: "/blogs/happy-summer-happy-spaces",
  },
  {
    id: 4,
    title: "Transform Your Workspace with Modern LED Panels",
    excerpt:
      "Give your office a facelift with modern, energy-efficient LED panels that provide brighter, more comfortable lighting...",
    image: "/images/b4.jpg",
    link: "/blogs/transform-your-workspace",
  },
  {
    id: 5,
    title: "Outdoor Lighting Tips: Make Your Garden Glow This Season",
    excerpt:
      "Outdoor lighting can transform your garden into a magical evening space. Learn how to light pathways, trees, and patios...",
    image: "/images/b5.jpg",
    link: "/blogs/outdoor-lighting-tips",
  },
  {
    id: 6,
    title: "Energy Saving Secrets: How LEDs Reduce Your Power Bills",
    excerpt:
      "Switching to LED lighting is one of the simplest ways to cut energy costs at home or work. Discover the savings you can expect...",
    image: "/images/b6.jpg",
    link: "/blogs/energy-saving-secrets",
  },
  {
    id: 7,
    title: "Living Room Makeover: The Power of Layered Lighting",
    excerpt:
      "Layered lighting is key to a cozy living room. Combine ambient, task, and accent lighting for a balanced, stylish space...",
    image: "/images/b7.jpg",
    link: "/blogs/living-room-makeover",
  },
  {
    id: 8,
    title: "5 Common Lighting Mistakes and How to Avoid Them",
    excerpt:
      "Good lighting design can make or break your interiors. Here are 5 common mistakes people make — and how to fix them...",
    image: "/images/b8.jpg",
    link: "/blogs/5-common-lighting-mistakes",
  },
  {
    id: 9,
    title: "5 Common Lighting Mistakes and How to Avoid Them",
    excerpt:
      "Good lighting design can make or break your interiors. Here are 5 common mistakes people make — and how to fix them...",
    image: "/images/b9.jpg",
    link: "/blogs/5-common-lighting-mistakes",
  },
];

export default function BlogPage() {
  return (
    <main className="flex flex-col items-center py-45 px-4">
      {/* Blog Category Title */}
      <h1 className="text-2xl md:text-3xl font-semibold mb-8 uppercase tracking-wider">
        General
      </h1>

      {/* Hero Blog Post Card */}
      <div className="relative w-full max-w-4xl h-[400px] overflow-hidden rounded-lg shadow-lg mb-12">
        <Image
          src="/images/draw.png"
          alt="Hero Blog Post"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex flex-col justify-center p-8">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-4 max-w-lg">
            Why July is the Best Time to Upgrade to LED Lighting
          </h2>
         <Link
  href="/blogs/why-july-is-the-best-time"
  className="inline-block text-black text-sm font-medium underline hover:text-gray-200 transition"
>
  Read More
</Link>

        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {blogPosts.map((post) => (
          <Link key={post.id} href={post.link} className="block">
            <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
              <div className="relative h-56">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-4">{post.title}</h2>
                <p className="text-gray-700 flex-grow">{post.excerpt}</p>
                <span className="inline-block text-blue-600 font-semibold mt-4">
                  Read more →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
