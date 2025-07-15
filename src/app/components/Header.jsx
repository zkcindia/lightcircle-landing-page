"use client";

import React, { useEffect, useState } from "react";
import {
  Phone,
  MessageCircle,
  Truck,
  User,
  Search,
  ShoppingCart,
} from "lucide-react";
import { useRouter } from "next/navigation"; // ✅ Import useRouter for navigation

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    if (id === "contact-page") {
      router.push("/contact"); // ✅ Navigate to /contact
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else if (id === "home-section") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const navItems = [
    { label: "HOME", id: "home-section" },
    { label: "LIGHTS", id: "lights-section" },
    { label: "FANS", id: "fans-section" },
    { label: "HOME DECOR", id: "home-decor-section" },
    { label: "NAME PLATES", id: "name-plates-section" },
    { label: "ABOUT US", id: "about-section" },
    { label: "CONTACT US", id: "contact-page" }, // ✅ Updated to navigate
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      {/* Top bar */}
      <div className="bg-white text-sm flex justify-center items-center gap-4 px-6 py-2 border-b border-gray-200">
        <div className="flex items-center gap-1 text-gray-600 cursor-pointer">
          <Phone size={16} /> <span>Talk On Call</span>
        </div>
        <span className="text-gray-400">|</span>
        <div className="flex items-center gap-1 text-green-600 cursor-pointer">
          <MessageCircle size={16} /> <span>Chat On WhatsApp</span>
        </div>
      </div>

      {/* Offer Bar */}
      {!isScrolled && (
        <div className="bg-black text-yellow-400 text-center text-xs py-2">
          WELCOME TO LIGHT CIRCLE
        </div>
      )}

      {/* Logo + Navbar */}
      <div
        className={`relative z-10 transition-colors duration-500 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="flex justify-center items-center py-4">
          <h1 className="text-3xl font-bold uppercase tracking-wider text-black">
            Light Circle
          </h1>
        </div>

        <nav className="flex justify-center items-center px-6 py-2">
          <ul className="flex gap-6 text-sm font-medium text-black">
            {navItems.map((item) => (
              <li
                key={item.label}
                onClick={() => handleScrollTo(item.id)}
                className="relative cursor-pointer before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-200 hover:before:w-full"
              >
                {item.label}
              </li>
            ))}
          </ul>

          <div className="flex gap-4 text-black ml-8">
            <Truck className="cursor-pointer" />
            <User className="cursor-pointer" />
            <Search className="cursor-pointer" />
            <ShoppingCart className="cursor-pointer" />
          </div>
        </nav>
      </div>
    </header>
  );
}
