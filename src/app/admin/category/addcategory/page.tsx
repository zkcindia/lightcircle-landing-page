'use client';

import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { saveCategory } from '@/service/apiCategory'; // Adjust path as needed

export default function CreateCategoryPage() {
  const [formData, setFormData] = useState({
    title: '',
    createdBy: '',
    stock: '',
    tagId: '',
    description: '',
    metaTitle: '',
    metaKeyword: '',
    metaDescription: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await saveCategory(formData);
      console.log('Category created:', res.data);
      alert('Category saved successfully!');
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category');
    }
  };

  return (
    <div className="p-8 bg-[#f9f7f7] min-h-screen space-y-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Create Category</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Card - Preview Info */}
        <div className="bg-white p-6 rounded-xl shadow-md col-span-1">
          <div className="flex justify-center mb-4">
            <img src="/images/product/tshirt.webp" alt="Thumbnail" className="h-24" />
          </div>
          <h2 className="text-sm font-semibold text-center text-gray-700">
            Fashion Men , Women & Kid's
          </h2>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span className="font-semibold">Created By :</span>
              <span className="text-blue-500">{formData.createdBy || 'Seller'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Stock :</span>
              <span>{formData.stock || '46233'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">ID :</span>
              <span className="text-blue-600">{formData.tagId || 'FS16276'}</span>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <button className="flex-1 border border-orange-500 text-orange-500 rounded-lg py-2 hover:bg-orange-50 cursor-pointer">
              Create Category
            </button>
            <button className="flex-1 bg-orange-500 text-white rounded-lg py-2 hover:bg-orange-600 cursor-pointer">
              Cancel
            </button>
          </div>
        </div>

        {/* Right Top Card - Thumbnail Upload */}
        <div className="bg-white p-6 rounded-xl shadow-md col-span-2">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Add Thumbnail Photo</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center text-sm text-gray-600 cursor-pointer hover:border-orange-400 transition">
            <div className="flex justify-center mb-2 text-orange-500">
              <Upload size={24} />
            </div>
            <p>
              <span className="text-gray-700 font-medium">Drop your images here, or</span>{' '}
              <span className="text-orange-500 font-semibold cursor-pointer">click to browse</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are allowed
            </p>
          </div>
        </div>
      </div>

      {/* General Info Card */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">General Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Category Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter Title"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Created By</label>
            <select
              name="createdBy"
              value={formData.createdBy}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
            >
              <option value="">Select Creator</option>
              <option value="Seller">Seller</option>
              <option value="Admin">Admin</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Quantity"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Tag ID</label>
            <input
              type="text"
              name="tagId"
              value={formData.tagId}
              onChange={handleChange}
              placeholder="######"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-600 block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Type description"
              rows={4}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Meta Options */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Meta Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Meta Title</label>
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              placeholder="Enter Title"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Meta Tag Keyword</label>
            <input
              type="text"
              name="metaKeyword"
              value={formData.metaKeyword}
              onChange={handleChange}
              placeholder="Enter word"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-600 block mb-1">Description</label>
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              placeholder="Type description"
              rows={4}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-4 bg-[#f1f4f9] p-4 rounded-lg">
          <button
            onClick={handleSave}
            className="border px-6 py-2 rounded-md border-gray-300 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Save Change
          </button>
          <button className="bg-orange-500 px-6 py-2 rounded-md text-sm text-white hover:bg-orange-600 cursor-pointer">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
