"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Client() {
  const clients = [
    "/images/lc.webp",
    "/images/zumia.jpg",
    "/images/ru.webp",
    "/images/dms.webp",
  ];

  return (
    <motion.div
      initial={{ x: "-100%", opacity: 0 }} // Page enter animation
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="p-8  flex-col items-center  bg-gray-100"
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        TRUSTED BY GLOBAL BRANDS
      </h1>

      {/* Scrolling Images */}
      <div className="overflow-hidden w-full">
        <motion.div
          className="flex gap-6 md:gap-10 lg:gap-12"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {/* ✅ Duplicate twice to ensure seamless loop */}
          {clients.concat(clients).map((src, index) => (
            <div
              key={index}
              className="flex-shrink-0 
                         w-20 h-20    // mobile
                         md:w-28 md:h-28  // tablet
                         lg:w-36 lg:h-36  // desktop
                         flex items-center justify-center bg-white rounded-lg shadow"
            >
              <Image
                src={src}
                alt={`client-${index}`}
                width={80}
                height={80}
                className="object-contain w-12 h-12 md:w-20 md:h-20 lg:w-28 lg:h-28"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
