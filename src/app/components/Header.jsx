"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Phone, MessageCircle, User, Menu, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Dropdown } from "antd";
import { getCategory } from "@/service/apiCategory";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTypeOpen, setMobileTypeOpen] = useState(false);
  const [mobileSpaceOpen, setMobileSpaceOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategory();
        setCategories(res.data);
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
     if (id === "sale-page") {
    router.push("/sale");
     }else if (
      (pathname === "/contact" || pathname === "/aboutus" || pathname === "/login") &&
      id !== "about-section" &&
      id !== "contact-page"
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
    { label: "SALE", id: "sale-page" },
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
      {/* Top Bar */}
      <div className="bg-white text-sm flex justify-center items-center gap-4 px-6 py-2 border-b border-gray-200">
        <div className="flex items-center gap-1 text-gray-600 cursor-pointer">
          <Phone size={16} /> <span>Talk On Call</span>
        </div>
        <span className="text-gray-400">|</span>
        <div className="flex items-center gap-1 text-green-600 cursor-pointer">
          <MessageCircle size={16} /> <span>Chat On WhatsApp</span>
        </div>
      </div>

      {/* Offer Banner */}
      {!isScrolled && (
        <div className="bg-black text-yellow-400 text-center text-xs py-2">
          WELCOME TO LIGHT CIRCLE
        </div>
      )}

      {/* Logo + Nav */}
      <div
        className={`relative z-10 transition duration-500 ${!isScrolled && "bg-transparent"}`}
        style={{
          backgroundImage: isScrolled ? "url('/images/z (2).png')" : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <nav className="relative flex justify-between items-center px-6 max-w-7xl mx-auto">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleScrollTo("home-section")}>
            <Image src="/images/logo.png" alt="Logo" width={200} height={200} />
          </div>

          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
            <ul className="flex flex-nowrap gap-5 text-sm font-medium text-black whitespace-nowrap">
              {navItems.map((item) => {
                if (item.label === "SALE") {
                  return (
                   <li key={item.label} onClick={() => handleScrollTo(item.id)} className="flex items-center space-x-1 cursor-pointer hover:scale-105 transition-transform">
  <span className="text-orange-500">SALE</span>
  <span className="bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">%</span>
</li>

                  );
                } else if (item.label === "SHOP BY TYPE") {
                  return (
                    <li key={item.label} className="cursor-pointer">
                      <Dropdown overlay={shopByTypeMenu} placement="bottom" arrow>
                        <span>{item.label}</span>
                      </Dropdown>
                    </li>
                  );
                } else if (item.label === "SHOP BY SPACE") {
                  return (
                    <li key={item.label} className="cursor-pointer">
                      <Dropdown overlay={shopBySpaceMenu} placement="bottom" arrow>
                        <span>{item.label}</span>
                      </Dropdown>
                    </li>
                  );
                } else {
                  return (
                    <li key={item.label} onClick={() => handleScrollTo(item.id)} className="cursor-pointer hover:text-orange-500 transition-colors">
                      {item.label}
                    </li>
                  );
                }
              })}
            </ul>
          </div>

          <div className="flex items-center gap-4 text-black">
            <User className="cursor-pointer" onClick={() => router.push("/login")} />
            <Menu className="block md:hidden cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
          </div>
        </nav>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md px-6 py-4">
            <ul className="flex flex-col gap-4">
              <li className="flex flex-col">
                <button className="flex items-center justify-between text-black" onClick={() => setMobileTypeOpen(!mobileTypeOpen)}>
                  SHOP BY TYPE <ChevronDown size={16} />
                </button>
                {mobileTypeOpen && (
                  <ul className="pl-4 mt-2 space-y-2">
                    {categories.map((cat) => (
                      <li key={cat.id} onClick={() => router.push(`/category/${cat.id}`)} className="text-black cursor-pointer hover:text-orange-500">
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
                      <button className="flex items-center justify-between text-black" onClick={() => setMobileSpaceOpen(!mobileSpaceOpen)}>
                        {item.label} <ChevronDown size={16} />
                      </button>
                      {mobileSpaceOpen && (
                        <div className="pl-4 mt-2">
                          {item.megaMenu.map((section) => (
                            <div key={section.title} className="mb-2">
                              <h4 className="text-xs font-bold mb-1">{section.title}</h4>
                              <ul className="space-y-1">
                                {section.items.map((sub) => (
                                  <li key={sub.label} onClick={() => handleScrollTo(sub.id)} className="text-black cursor-pointer hover:text-orange-500">
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
                    <li key={item.label} onClick={() => handleScrollTo(item.id)} className="cursor-pointer text-black hover:text-orange-500">
                      {item.label}
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
