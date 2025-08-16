"use client";

import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";

// ✅ Demo fallback reviews with custom profile images
const fallbackReviews = [
  {
    name: "Sk Inzamamul Haque",
    time: "a month ago",
    text: "I have already visited this store two times while looking for a unique chandelier. Everything was available and it was worth it. I already bought three ceiling chandelier jhumar lights from this store.",
    stars: 5,
    profile: "/images/reviews/user1.jpg",
  },
  {
    name: "Samir Swain",
    time: "a month ago",
    text: "Visited this store while looking for a unique hanging light. The collection was impressive, but what truly stood out was the customer service. Susree was incredibly knowledgeable and helpful.",
    stars: 5,
    profile: "/images/reviews/user2.jpg",
  },
  {
    name: "Priya Das",
    time: "2 weeks ago",
    text: "Amazing experience! They have a wide variety of lighting options. The chandelier I bought completely changed the look of my living room.",
    stars: 5,
    profile: "/images/reviews/user3.jpg",
  },
  {
    name: "Rohit Kumar",
    time: "3 weeks ago",
    text: "The quality of lights is excellent. Customer support was quick and polite. I’ll definitely visit again for more unique collections.",
    stars: 4,
    profile: "/images/reviews/user4.jpg",
  },
];

// ✅ Google Reviews fetcher
async function getGoogleReviews() {
  const placeId = "YOUR_PLACE_ID"; // replace with your Place ID
  const apiKey = "YOUR_API_KEY";   // replace with your Google Maps API key

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`
  );
  if (!res.ok) throw new Error("Failed to fetch reviews");

  const data = await res.json();

  return (
    data.result?.reviews?.map((r, i) => ({
      name: r.author_name,
      time: r.relative_time_description,
      text: r.text,
      stars: r.rating,
      // ✅ If Google doesn’t give a photo, fallback to demo images
      profile: r.profile_photo_url || `/images/reviews/user${(i % 4) + 1}.jpg`,
    })) || []
  );
}

export default function ReviewScroller() {
  const [reviews, setReviews] = useState(fallbackReviews);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const googleReviews = await getGoogleReviews();
        if (googleReviews.length > 0) {
          setReviews(googleReviews);
        }
      } catch (err) {
        console.warn("Using fallback reviews:", err.message);
      }
    }
    fetchReviews();
  }, []);

  return (
    <div className="overflow-hidden w-full bg-gray-50 py-6">
      <div className="flex animate-marquee gap-6">
        {reviews.concat(reviews).map((review, index) => (
          <div
            key={index}
            className="w-80 flex-shrink-0 bg-white p-4 rounded-xl shadow-md"
          >
            {/* Profile + Name + Stars */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={review.profile}
                  alt={review.name}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">
                    {review.name}
                  </h3>
                  <p className="text-xs text-gray-500">{review.time}</p>
                </div>
              </div>
              <div className="flex text-yellow-500">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
            </div>

            {/* Review text */}
            <p className="mt-3 text-sm text-gray-700">{review.text}</p>
          </div>
        ))}
      </div>

      {/* CSS for marquee effect */}
      <style jsx>{`
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
