'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Popconfirm, message } from 'antd'; // ✅ added for delete confirmation
import { getCategory, deleteCategory } from '@/service/apiCategory';

const cards = [
  {
    image: '/images/product/22.png',
    title: 'Fashion Categories',
    bg: 'bg-gray-200',
  },
  {
    image: '/images/product/33.png',
    title: 'Electronics Headphone',
    bg: 'bg-orange-100',
  },
  {
    image: '/images/product/44.png',
    title: 'Foot Wares',
    bg: 'bg-yellow-100',
  },
  {
    image: '/images/product/55.png',
    title: 'Eye Ware & Sunglass',
    bg: 'bg-blue-100',
  },
];

export default function CategoryPage() {
  const router = useRouter();
  const [categoryRows, setCategoryRows] = useState([]);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const responce = await getCategory();
      console.log(responce);

      if (responce.status === 200) {
        setCategoryRows(responce.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteCategory(id);
      if (response.status === 204) {
        setCategoryRows((prev) => prev.filter((item) => item.id !== id));
        message.success('Category deleted successfully');
        fetchCategory()
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      message.error('Failed to delete category');
    }
  };

  const getMonthOptions = () => [
    { label: 'This Month', value: 'this_month' },
    { label: 'Download', value: 'Download' },
    { label: 'Export', value: 'Export' },
    { label: 'Import', value: 'Import' },
  ];

  return (
    <main className="min-h-screen p-8 bg-gray-50 cursor-crosshair">
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:shadow-lg transition cursor-pointer"
          >
            <div className={`w-44 h-20 ${card.bg} rounded-xl flex items-center justify-center mb-4`}>
              <div className="relative w-20 h-20">
                <Image src={card.image} alt={card.title} fill className="object-contain" />
              </div>
            </div>
            <h2 className="text-center text-lg font-semibold text-blue-900">{card.title}</h2>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow p-6">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-xl font-semibold">All Categories List</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push('/admin/category/addcategory')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition cursor-pointer"
            >
              Add Category
            </button>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer">
              {getMonthOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-200">
              <tr>
                <th className="px-4 py-2">
                  <input type="checkbox" />
                </th>
                <th className="px-4 py-2">Categories</th>
                <th className="px-4 py-2">Created by</th>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Product Stock</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {categoryRows.map((row, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <td className="px-4 py-2">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <img src={row.image ? row.image : '/images/product/noproduct.webp'} alt={row.name} width={40} height={40} />
                    {row.name}
                  </td>
                  <td className="px-4 py-2">{row.created_by}</td>
                  <td className="px-4 py-2">{row.id}</td>
                  <td className="px-4 py-2">{row.quantity || 0}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <div className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer">
                      <Eye className="w-4 h-4 text-[#ff5d2c]" />
                    </div>
                    <div
                      className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer"
                      onClick={() => router.push(`/admin/category/addcategory?id=${row.id}`)}
                    >
                      <Pencil className="w-4 h-4 text-[#ff5d2c]" />
                    </div>

                    {/* ✅ AntD Popconfirm Delete Button */}
                    <Popconfirm
                      title="Are you sure to delete this category?"
                      description="This action cannot be undone."
                      onConfirm={() => handleDelete(row.slug)}
                      onCancel={() => message.info('Delete cancelled')}
                      okText="Yes, Delete"
                      cancelText="No"
                      okButtonProps={{ style: { backgroundColor: '#ff4d4f' } }}
                    >
                      <div className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </div>
                    </Popconfirm>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-6">
          <div className="inline-flex items-center space-x-1 border border-gray-200 rounded-md overflow-hidden">
            <button className="px-3 py-1 text-sm text-blue-700 hover:bg-gray-200 cursor-pointer">Previous</button>
            <button className="px-3 py-1 text-sm bg-orange-500 text-white cursor-pointer">1</button>
            <button className="px-3 py-1 text-sm text-blue-700 hover:bg-gray-200 cursor-pointer">2</button>
            <button className="px-3 py-1 text-sm text-blue-700 hover:bg-gray-200 cursor-pointer">3</button>
            <button className="px-3 py-1 text-sm text-blue-700 hover:bg-gray-200 cursor-pointer">Next</button>
          </div>
        </div>
      </div>
    </main>
  );
}
