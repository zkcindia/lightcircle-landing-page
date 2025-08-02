// import React from 'react'

// export default function SideBar() {
//   return (
//     <div>SideBar</div>
//   )
// }

"use client";

import React, { useState } from "react";
import {
  LayoutGrid,
  Shirt,
  List,
  Package,
  ShoppingBag,
  Upload,
  Sparkles,
  FileText,
  Settings,
  ChevronRight,
  ChevronLeft,
  Box,
} from "lucide-react";
import path from "path";

export default function SideBar({
  collapsed,
  setCollapsed,
  isLockedOpen,
  setIsLockedOpen,
}: {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  isLockedOpen: boolean;
  setIsLockedOpen: (value: boolean) => void;
}) {
  // If props exist, use controlled mode. Otherwise fallback to internal state.
  const toggleSidebar = () => {
    const newLockState = !isLockedOpen;
    setIsLockedOpen(newLockState);
    setCollapsed(!newLockState);
  };

  const handleMouseEnter = () => {
    if (!isLockedOpen) setCollapsed(false);
  };

  const handleMouseLeave = () => {
    if (!isLockedOpen) setCollapsed(true);
  };

  const navItems = [
    { icon: <LayoutGrid size={18} />, label: "Dashboard",path: "/admin/dashboard" },
    { icon: <Shirt size={18} />, label: "Products",path: "/admin/product" },
    { icon: <List size={18} />, label: "Category" ,path: "/admin/category" },
    { icon: <Box size={18} />, label: "Sub Category" ,path: "/admin/subcategory" },
    { icon: <Package size={18} />, label: "Inventory",path: "/admin/inventory" },
    { icon: <ShoppingBag size={18} />, label: "Orders",path: "/admin/orders" },
    { icon: <Upload size={18} />, label: "Purchases" ,path: "/admin/purchases" },
    { icon: <Sparkles size={18} />, label: "Attributes" ,path: "/admin/attributes" },
    { icon: <FileText size={18} />, label: "Invoices",path: "/admin/invoices" },
    { icon: <Settings size={18} />, label: "Settings",path: "/admin/settings" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-[#1c1f26] text-[#a3acc5] flex flex-col transition-all duration-300 z-50 ${
        collapsed ? "w-20 p-4" : "w-64 p-6"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo & Toggle */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-orange-500 text-2xl">🛒</span>
          {!collapsed && (
            <span className="text-white text-1xl font-bold">LIGHT CIRCLE</span>
          )}
        </div>

        <button
          className="bg-[#2a2e39] p-0.5 rounded-full shadow-md hover:bg-[#3a3f4f] ml-auto cursor-pointer"
          onClick={toggleSidebar}
        >
          {isLockedOpen ? (
            <ChevronRight className="text-white" size={18} />
          ) : (
            <ChevronLeft className="text-white" size={18} />
          )}
        </button>
      </div>

      {!collapsed && (
        <h2 className="text-[#677294] text-xs font-semibold mb-4">GENERAL</h2>
      )}

      <nav className="flex flex-col gap-6">
        {navItems.map((item, idx) => (
          <a
            href={item?.path}
            key={idx}
            className="flex items-center gap-3 text-sm hover:text-white transition-colors duration-200 text-[#a3acc5]"
          >
            {item.icon}
            {!collapsed && item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
