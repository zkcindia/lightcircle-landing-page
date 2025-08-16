"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Phone, User, Menu, ChevronDown } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { usePathname, useRouter } from "next/navigation";
import { Dropdown } from "antd";
import { getCategory } from "@/service/apiCategory";
import { AnimatePresence, motion } from "framer-motion";

// ✅ Global smooth scrolling
if (typeof document !== "undefined") {
  document.documentElement.style.scrollBehavior = "smooth";
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTypeOpen, setMobileTypeOpen] = useState(false);
  const [mobileSpaceOpen, setMobileSpaceOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919876543210", "_blank"); // ✅ Change number
  };

  // ✅ Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategory();
        if (res?.data) {
          const filtered = res.data.filter((cat) => cat.image);
          setCategories(filtered);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleScrollTo = (id) => {
    setMobileMenuOpen(false);
    setMobileTypeOpen(false);
    setMobileSpaceOpen(false);

    if (id === "home-section" && pathname !== "/") {
      setIsLoading(true);
      router.push("/");
      setTimeout(() => setIsLoading(false), 800);
      return;
    }

    if (["home-section", "sale-page", "about-section", "contact-page", "blog-page"].includes(id)) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 800);
    }

    if (id === "sale-page") {
      router.push("/sale");
    } else if (
      (pathname === "/contact" || pathname === "/aboutus" || pathname === "/login") &&
      id !== "about-section" &&
      id !== "contact-page" &&
      id !== "blog-page"
    ) {
      router.push(`/?scrollTo=${id}`);
    } else if (id === "contact-page") {
      router.push("/contact");
    } else if (id === "about-section") {
      router.push("/aboutus");
    } else if (id === "blog-page") {
      router.push("/blogs");
    } else if (id === "allproduct") {
      router.push("/allproduct");
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
    { label: "SHOP BY TYPE", type: "dropdown" },
    {
      label: "SHOP BY SPACE",
      megaMenu: [
        {
          title: "HOME LIGHTING",
          items: [
            { label: "Living Room Lighting", id: "living-room-section" },
            { label: "Bedroom Lighting", id: "bedroom-section" },
            { label: "Kitchen Lighting", id: "kitchen-section" },
          ],
        },
        {
          title: "HOSPITALITY LIGHTING",
          items: [
            { label: "Restaurant Lighting", id: "restaurant-section" },
            { label: "Hotel Lighting", id: "hotel-section" },
            { label: "Hospital Lighting", id: "hospital-section" },
          ],
        },
        {
          title: "COMMERCIAL LIGHTING",
          items: [
            { label: "Retail Store Lighting", id: "retail-store-section" },
            { label: "Office Lighting", id: "office-section" },
          ],
        },
      ],
    },
    { label: "ABOUT US", id: "about-section" },
    { label: "CONTACT US", id: "contact-page" },
    { label: "BLOG", id: "blog-page" },
  ];

  const shopByTypeMenu = (
    <div className="bg-white shadow-lg overflow-hidden">
      <ul className="w-48">
        {categories.map((cat) => (
          <li
            key={cat.id}
            onClick={() => router.push(`/allproduct?slug=${cat.slug}`)}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );

  const shopBySpaceMenu = (
    <div className="bg-white shadow-lg p-4 w-[600px]">
      <div className="grid grid-cols-3 gap-6">
        {navItems.find((n) => n.label === "SHOP BY SPACE").megaMenu.map((section) => (
          <div key={section.title}>
            <h4 className="text-xs font-bold mb-3">{section.title}</h4>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li
                  key={item.label}
                  onClick={() => handleScrollTo(item.id)}
                  className="text-sm text-black hover:text-orange-500 cursor-pointer"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
          <div className="w-12 h-12 rounded-full border-t-4 border-b-4 border-orange-500 animate-spin"></div>
        </div>
      )}

      {!isScrolled && (
        <div className="bg-white text-sm flex justify-center items-center gap-4 px-6 py-2 border-b border-gray-200">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-1 text-gray-600 hover:text-orange-500 transition-colors"
          >
            <Phone size={20} className="font-bold" />
            <span className="font-bold">Talk On Call</span>
          </a>
          <span className="text-gray-800">||</span>
          <div
            className="flex items-center gap-1 text-green-500 cursor-pointer"
            onClick={handleWhatsAppClick}
          >
            <SiWhatsapp size={20} className="font-bold" /> <span>Chat On WhatsApp</span>
          </div>
        </div>
      )}

      {!isScrolled && (
        <div className="bg-black text-yellow-400 text-center font-bold text-xs py-3">
          WELCOME TO LIGHT CIRCLE
        </div>
      )}

      <div className="relative z-10">
        {/* ✅ Background behind navbar with proper height */}
        <div
          className={`absolute top-0 left-0 w-full bg-cover bg-center transition-all duration-700 ease-in-out z-0 ${
            isScrolled ? "h-[80px]" : "h-[120px]"
          }`}
          style={{
            backgroundImage: "url('/images/z (2).png')",
            opacity: isScrolled ? 1 : 0,
          }}
        ></div>

        <div className="relative z-10 transition duration-500">
          {/* ✅ Navbar wrapper fills the same height */}
          <nav
            className={`relative flex justify-between items-center px-6 max-w-7xl mx-auto transition-all duration-500 ${
              isScrolled ? "h-[80px]" : "h-[120px]"
            }`}
          >
            {/* Left side */}
            <div
              className="flex-shrink-0 cursor-pointer flex items-center"
              onClick={() => handleScrollTo("home-section")}
            >
              <AnimatePresence mode="wait">
                {!isScrolled ? (
                  <motion.div
                    key="logo"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src="/images/logo.png"
                      alt="Logo"
                      width={150}
                      height={150}
                      className="transition-all duration-500"
                    />
                  </motion.div>
                ) : (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4 }}
                    className="text-2xl font-bold tracking-wide transition-all duration-500"
                  >
                    <span className="text-black">LIGHT</span>{" "}
                    <span className="text-orange-500">CIRCLE</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* ✅ Desktop Menu */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
              <ul className="flex flex-nowrap gap-5 text-lg font-medium text-black whitespace-nowrap">
                {navItems.map((item) => {
                  if (item.label === "SALE") {
                    return (
                      <li
                        key={item.label}
                        onClick={() => handleScrollTo(item.id)}
                        className="flex items-center space-x-1 cursor-pointer hover:scale-105 transition-transform"
                      >
                        <span className="text-orange-500 text-lg">SALE</span>
                        <span className="bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                          %
                        </span>
                      </li>
                    );
                  } else if (item.label === "SHOP BY TYPE") {
                    return (
                      <li key={item.label} className="cursor-pointer text-lg">
                        <Dropdown overlay={shopByTypeMenu} placement="bottom" arrow>
                          <span>{item.label}</span>
                        </Dropdown>
                      </li>
                    );
                  } else if (item.label === "SHOP BY SPACE") {
                    return (
                      <li key={item.label} className="cursor-pointer text-lg">
                        <Dropdown overlay={shopBySpaceMenu} placement="bottom" arrow>
                          <span>{item.label}</span>
                        </Dropdown>
                      </li>
                    );
                  } else {
                    return (
                      <li
                        key={item.label}
                        onClick={() => handleScrollTo(item.id)}
                        className="cursor-pointer hover:text-orange-500 transition-colors text-lg"
                      >
                        {item.label}
                      </li>
                    );
                  }
                })}
              </ul>
            </div>

            {/* ✅ Right Side */}
            <div className="flex items-center gap-4 text-black">
              <User className="cursor-pointer" onClick={() => router.push("/login")} />
              <Menu
                className="block md:hidden cursor-pointer"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              />
            </div>
          </nav>

          {/* ✅ Mobile Menu (unchanged) */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white shadow-md px-6 py-4">
              <ul className="flex flex-col gap-4 text-lg">
                <li className="flex flex-col">
                  <button
                    className="flex items-center justify-between text-black"
                    onClick={() => setMobileTypeOpen(!mobileTypeOpen)}
                  >
                    SHOP BY TYPE <ChevronDown size={16} />
                  </button>
                  {mobileTypeOpen && (
                    <ul className="pl-4 mt-2 space-y-2">
                      {categories.map((cat) => (
                        <li
                          key={cat.id}
                          onClick={() => router.push(`/category/${cat.id}`)}
                          className="text-black cursor-pointer hover:text-orange-500"
                        >
                          {cat.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {navItems.map((item) => {
                  if (item.label === "SHOP BY SPACE") {
                    return (
                      <li key={item.label} className="flex flex-col">
                        <button
                          className="flex items-center justify-between text-black"
                          onClick={() => setMobileSpaceOpen(!mobileSpaceOpen)}
                        >
                          {item.label} <ChevronDown size={16} />
                        </button>
                        {mobileSpaceOpen && (
                          <div className="pl-4 mt-2">
                            {item.megaMenu.map((section) => (
                              <div key={section.title} className="mb-2">
                                <h4 className="text-xs font-bold mb-1">{section.title}</h4>
                                <ul className="space-y-1">
                                  {section.items.map((sub) => (
                                    <li
                                      key={sub.label}
                                      onClick={() => handleScrollTo(sub.id)}
                                      className="text-black cursor-pointer hover:text-orange-500"
                                    >
                                      {sub.label}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}
                      </li>
                    );
                  } else if (item.label !== "SHOP BY TYPE") {
                    return (
                      <li
                        key={item.label}
                        onClick={() => handleScrollTo(item.id)}
                        className="cursor-pointer text-black hover:text-orange-500"
                      >
                        {item.label}
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
