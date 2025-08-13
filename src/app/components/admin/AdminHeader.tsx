"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Moon, Bell, Settings, Clock, Search, LogOut } from "lucide-react";

export default function AdminHeader({ collapsed }: { collapsed: boolean }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogoutConfirm = () => {
    setShowLogoutConfirm(false);
    setIsLoading(true); // Show loader
    setTimeout(() => {
      router.push("/"); // ✅ Redirect to homepage
    }, 1000); // Simulate short delay for loader
  };

  return (
    <>
      <header className="w-full flex justify-between items-center px-8 py-4 bg-[#f9f7f7] border-b border-gray-200">
        {/* Left Section */}
        <h1 className="text-[#677294] text-lg font-semibold uppercase tracking-wide">
          Welcome!
        </h1>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Icons */}
          <Moon className="text-[#677294] w-5 h-5 cursor-pointer" />
          <div className="relative cursor-pointer">
            <Bell className="text-[#677294] w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </div>
          <Settings className="text-[#677294] w-5 h-5 cursor-pointer" />
          <Clock className="text-[#677294] w-5 h-5 cursor-pointer" />

          {/* Profile Image + Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <img
              src="/images/logo.png"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover cursor-pointer"
              onClick={() => setDropdownOpen((prev) => !prev)}
            />

            {dropdownOpen && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-3 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Search Box */}
          <div className="relative bg-[#e9e9e9] rounded-xl px-4 py-2 flex items-center w-48">
            <Search className="w-4 h-4 text-[#677294] mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent placeholder-[#677294] text-[#677294] text-sm focus:outline-none w-full"
            />
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[320px]">
            <h2 className="text-lg font-semibold mb-2">Logout</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 cursor-pointer"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN LOADING SPINNER */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
          <div className="w-12 h-12 rounded-full border-t-4 border-b-4 border-orange-500 animate-spin"></div>
        </div>
      )}
    </>
  );
}
