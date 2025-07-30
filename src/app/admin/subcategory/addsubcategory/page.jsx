'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getCategory } from '@/service/apiCategory';
import { useRouter } from 'next/navigation';
import {saveSubCategory} from '@/service/apiSubCategory'
import { Upload, LoaderCircle, CheckCircle2 } from 'lucide-react';

export default function AddSubCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    created_by: '',
    // stock: '',
    tagId: '',
    description: '',
    parent_id: '',
  });
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategory();
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
    setImageFile(file); // Store the actual file
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailClick = () => {
    fileInputRef.current?.click();
  };

  const handleCancel = () => {
    router.push('/admin/category');
  };

  const handleSave = async () => {
    if (!formData.name || !formData.parent_id) {
      alert('Name and Parent Category are required.');
      return;
    }

    setLoading(true);
    try {
     const formPayload = new FormData();

formPayload.append('name', formData.name);
formPayload.append('category', formData.parent_id);
formPayload.append('created_by', formData.created_by);
// formPayload.append('stock', formData.stock);
formPayload.append('tagId', formData.tagId);
formPayload.append('description', formData.description);

// If thumbnailUrl is a file object (like from file input)
formPayload.append('image', imageFile);

// If it's just a URL string, use:
// formPayload.append('image', thumbnailUrl); // if server expects URL string


      const response = await saveSubCategory(formPayload);

      if (response.status === 201) {
        setSuccessMessage('Subcategory added successfully!');
        setTimeout(() => router.push('/admin/subcategory'), 1000);
      } else {
        alert('Failed to save subcategory');
      }
    } catch (err) {
      console.error('Error saving subcategory:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-[#f9f7f7] min-h-screen space-y-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Create Subcategory</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Card */}
        <div className="bg-white p-6 rounded-xl shadow-md col-span-1">
          <div className="flex justify-center mb-4">
            <img
              src={thumbnailUrl || '/images/product/noproduct.webp'}
              alt="Thumbnail"
              className="h-24 rounded-xs object-cover"
            />
          </div>
          <h2 className="text-sm font-semibold text-center text-gray-700">
            Subcategory Preview
          </h2>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span className="font-semibold">Created By :</span>
              <span className="text-blue-500">{formData.created_by || 'Seller'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Stock :</span>
              <span>{formData.stock || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Tag ID :</span>
              <span className="text-blue-600">{formData.tagId || '---'}</span>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 border border-blue-500 text-blue-500 rounded-xs py-2 hover:bg-blue-50 cursor-pointer"
            >
              Create Subcategory
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-blue-500 text-white rounded-xs py-2 hover:bg-blue-600 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-white p-6 rounded-xl shadow-md col-span-2">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Add Product Image</h2>

          {successMessage && (
            <div className="mb-4 flex items-center gap-2 text-green-700 bg-green-100 border border-green-300 px-4 py-2 rounded-xs text-sm">
              <CheckCircle2 size={18} className="text-green-600" />
              {successMessage}
            </div>
          )}

          <div
            onClick={handleThumbnailClick}
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center text-sm text-gray-600 cursor-pointer hover:border-blue-400 transition"
          >
            <div className="flex justify-center mb-2 text-blue-500">
              <Upload size={24} />
            </div>
            <p>
              <span className="text-gray-700 font-medium">Drop your image here, or</span>{' '}
              <span className="text-blue-500 font-semibold underline">click to browse</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              1600 x 1200 recommended. PNG, JPG, GIF allowed.
            </p>
          </div>
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {/* General Info */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">General Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Subcategory Title</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Title"
              className="w-full border border-gray-300 rounded-xs px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Parent Category</label>
            <select
              name="parent_id"
              value={formData.parent_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xs px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Parent Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Created By</label>
            <select
              name="created_by"
              value={formData.created_by}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xs px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Creator</option>
              <option value="Seller">Seller</option>
              <option value="Admin">Admin</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Quantity"
              className="w-full border border-gray-300 rounded-xs px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Tag ID</label>
            <input
              type="text"
              name="tagId"
              value={formData.tagId}
              onChange={handleChange}
              placeholder="######"
              className="w-full border border-gray-300 rounded-xs px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-600 block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Type description"
              className="w-full border border-gray-300 rounded-xs px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-end mt-6 gap-4 bg-[#f1f4f9] p-4 rounded-lg">
        <button
          onClick={handleSave}
          disabled={loading}
          className="border px-6 py-2 rounded-xs border-gray-300 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
        >
          {loading && <LoaderCircle className="animate-spin" size={16} />}
          {loading ? 'Saving...' : 'Save Subcategory'}
        </button>
        <button
          onClick={handleCancel}
          className="bg-blue-500 px-6 py-2 rounded-xs text-sm text-white hover:bg-blue-600 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
