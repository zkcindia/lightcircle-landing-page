"use client";

import React from "react";
import { Moon, Bell, Settings, Clock, Search } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="w-full flex justify-between items-center px-8 py-4 bg-[#f9f7f7] border-b border-gray-200">
      {/* Left Section */}
      <h1 className="text-[#677294] text-lg font-semibold uppercase tracking-wide">
        Welcome!
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Icons */}
        <Moon className="text-[#677294] w-5 h-5" />
        <div className="relative">
          <Bell className="text-[#677294] w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </div>
        <Settings className="text-[#677294] w-5 h-5" />
        <Clock className="text-[#677294] w-5 h-5" />

        {/* Profile Image */}
        <img
          src="/images/logo.png"
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />

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
  );
}
