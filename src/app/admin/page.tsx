"use client";

import React from "react";
import {
  ShoppingBag,
  Award,
  Briefcase,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
  CartesianGrid,
  Area,
} from "recharts";

// Dashboard card data
const stats = [
  {
    title: "Total Orders",
    value: "13,647",
    change: "2.3%",
    duration: "Last Week",
    icon: <ShoppingBag className="w-5 h-5 text-[#ff6d4d]" />,
    positive: true,
  },
  {
    title: "New Leads",
    value: "9,526",
    change: "8.1%",
    duration: "Last Month",
    icon: <Award className="w-5 h-5 text-[#ff6d4d]" />,
    positive: true,
  },
  {
    title: "Deals",
    value: "976",
    change: "0.3%",
    duration: "Last Month",
    icon: <Briefcase className="w-5 h-5 text-[#ff6d4d]" />,
    positive: false,
  },
  {
    title: "Booked Revenue",
    value: "$123.6k",
    change: "10.6%",
    duration: "Last Month",
    icon: <DollarSign className="w-5 h-5 text-[#ff6d4d]" />,
    positive: false,
  },
];

// Chart data
const chartData = [
  { month: "Jan", views: 34, clicks: 8 },
  { month: "Feb", views: 65, clicks: 12 },
  { month: "Mar", views: 45, clicks: 7 },
  { month: "Apr", views: 67, clicks: 15 },
  { month: "May", views: 47, clicks: 19 },
  { month: "Jun", views: 60, clicks: 11 },
  { month: "Jul", views: 41, clicks: 4 },
  { month: "Aug", views: 43, clicks: 6 },
  { month: "Sep", views: 76, clicks: 5 },
  { month: "Oct", views: 48, clicks: 20 },
  { month: "Nov", views: 61, clicks: 9 },
  { month: "Dec", views: 66, clicks: 22 },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-6 space-y-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Top */}
            <div className="flex items-center justify-between p-6">
              <div className="bg-[#ffe3db] p-3 rounded-lg">{stat.icon}</div>
              <div className="text-right">
                <p className="text-sm text-[#677294] font-medium">{stat.title}</p>
                <h3 className="text-2xl font-bold text-[#2a3342]">{stat.value}</h3>
              </div>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between px-6 py-3 bg-[#f7faff] text-sm text-[#677294]">
              <div className="flex items-center gap-1">
                {stat.positive ? (
                  <ArrowUpRight className="text-green-500 w-4 h-4" />
                ) : (
                  <ArrowDownRight className="text-red-500 w-4 h-4" />
                )}
                <span className={stat.positive ? "text-green-500" : "text-red-500"}>
                  {stat.change}
                </span>
                <span className="ml-1">{stat.duration}</span>
              </div>
              <button className="text-[#4c6ef5] font-medium hover:underline">
                View More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#2a3342]">Performance</h2>
          <div className="space-x-2">
            <button className="px-3 py-1 text-sm rounded-lg bg-gray-100 text-gray-600">ALL</button>
            <button className="px-3 py-1 text-sm rounded-lg bg-gray-100 text-gray-600">1M</button>
            <button className="px-3 py-1 text-sm rounded-lg bg-gray-100 text-gray-600">6M</button>
            <button className="px-3 py-1 text-sm rounded-lg bg-blue-100 text-blue-700">1Y</button>
          </div>
        </div>

        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="views" barSize={28} fill="#ff6d4d" name="Page Views" />
              <Area
                type="monotone"
                dataKey="clicks"
                stroke="#22c55e"
                fill="#dcfce7"
                name="Clicks"
              />
              <Line type="monotone" dataKey="clicks" stroke="#22c55e" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
