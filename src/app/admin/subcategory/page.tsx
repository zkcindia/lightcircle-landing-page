// app/admin/subcategory/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {getSubCategory} from '@/service/apiSubCategory'

export default function page() {
  const [subCategories, setSubCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const response = await getSubCategory();
      if (response.status === 200) {
        setSubCategories(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch subcategories", error);
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">All Subcategories</h2>
          <button
            onClick={() => router.push('/admin/subcategory/addsubcategory')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xs text-sm font-semibold"
          >
            Add Subcategory
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-100">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Subcategory Name</th>
                <th className="px-4 py-2">Parent Category</th>
                <th className="px-4 py-2">Created By</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subCategories.map((sub, index) => (
                <tr key={sub.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{sub.name}</td>
                  <td className="px-4 py-2">{sub.category}</td>
                  <td className="px-4 py-2">{sub.created_by}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="p-2 rounded-md bg-gray-200 hover:bg-gray-300">
                      <Eye className="w-4 h-4 text-blue-500" />
                    </button>
                    <button
                      onClick={() => router.push(`/admin/subcategory/addsubcategory?id=${sub.id}`)}
                      className="p-2 rounded-md bg-gray-200 hover:bg-gray-300"
                    >
                      <Pencil className="w-4 h-4 text-green-500" />
                    </button>
                    <button className="p-2 rounded-md bg-gray-200 hover:bg-gray-300">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
              {subCategories.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No subcategories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
