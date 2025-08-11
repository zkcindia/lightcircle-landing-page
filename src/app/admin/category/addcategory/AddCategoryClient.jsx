'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Upload, LoaderCircle, CheckCircle2 } from 'lucide-react';
import { saveCategory, getCategory } from '@/service/apiCategory';

export default function AddCategoryClient() {
  const [formData, setFormData] = useState({
    name: '',
    created_by: '',
    stock: '',
    tagId: '',
    description: '',
    metaTitle: '',
    metaKeyword: '',
    metaDescription: '',
  });
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);


  const searchParams = useSearchParams();
  const data = searchParams.get('data');
  const router = useRouter();

  // If editing, fetch category details using GET API.
 useEffect(() => {
  if (data) {
    async function fetchCategoryData() {
      try {
        const response = await getCategory();
        const category = response.data;
        setFormData({
          name: category.name || '',
          created_by: category.created_by || '',
          stock: category.stock || '',
          tagId: category.tagId || '',
          description: category.description || '',
          metaTitle: category.metaTitle || '',
          metaKeyword: category.metaKeyword || '',
          metaDescription: category.metaDescription || '',
        });
        if (category.thumbnail) {
          setThumbnailUrl(category.thumbnail);
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    }
    fetchCategoryData();
  }
}, [data]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setSuccessMessage('');
    try {
      const filterFormdata = new FormData()
      filterFormdata.append('name',formData.name);
      filterFormdata.append('created_by',formData.created_by);
      filterFormdata.append('stock',formData.stock);
      filterFormdata.append('tagId',formData.tagId);
      filterFormdata.append('description',formData.description);
      if (image) {
      filterFormdata.append('image', image);
    }

      // Here, we are reusing saveCategory for creation.
      // (For edit, you might want to call an update API instead.)
      const res = await saveCategory(filterFormdata);
      console.log('Category saved:', res.data);
      setSuccessMessage('Category saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
      // Optionally, navigate back to the category list page.
      router.push('/admin/category');
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      created_by: '',
      stock: '',
      tagId: '',
      description: '',
      metaTitle: '',
      metaKeyword: '',
      metaDescription: '',
    });
    setThumbnailUrl(null);
    setSuccessMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleThumbnailClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file)
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailUrl(reader.result);
        setSuccessMessage('Product image uploaded successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8 bg-[#f9f7f7] min-h-screen space-y-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {data ? 'Edit Category' : 'Create Category'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md col-span-1">
          <div className="flex justify-center mb-4">
            <img
              src={thumbnailUrl || '/images/product/noproduct.webp'}
              alt="Thumbnail"
              className="h-24 rounded-md object-cover"
            />
          </div>
          <h2 className="text-sm font-semibold text-center text-gray-700">
            Fashion Men, Women & Kid's
          </h2>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span className="font-semibold">Created By :</span>
              <span className="text-blue-500">{formData.created_by}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Stock :</span>
              <span>{formData.stock || '46233'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">ID :</span>
              <span className="text-blue-600">{formData.tagId || ''}</span>
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 border border-orange-500 text-orange-500 rounded-lg py-2 hover:bg-orange-50 cursor-pointer"
            >
              {data ? 'Update Category' : 'Create Category'}
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-orange-500 text-white rounded-lg py-2 hover:bg-orange-600 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md col-span-2">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Add Product Image</h2>

          {successMessage && (
            <div className="mb-4 flex items-center gap-2 text-green-700 bg-green-100 border border-green-300 px-4 py-2 rounded-md text-sm">
              <CheckCircle2 size={18} className="text-green-600" />
              {successMessage}
            </div>
          )}

          <div
            onClick={handleThumbnailClick}
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center text-sm text-gray-600 cursor-pointer hover:border-orange-400 transition"
          >
            <div className="flex justify-center mb-2 text-orange-500">
              <Upload size={24} />
            </div>
            <p>
              <span className="text-gray-700 font-medium">Drop your images here, or</span>{' '}
              <span className="text-orange-500 font-semibold underline">click to browse</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are allowed
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

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">General Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Category Title</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Title"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Created By</label>
            <select
              name="created_by"
              value={formData.created_by}
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

      <div className="flex justify-end mt-6 gap-4 bg-[#f1f4f9] p-4 rounded-lg">
        <button
          onClick={handleSave}
          disabled={loading}
          className="border px-6 py-2 rounded-md border-gray-300 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
        >
          {loading && <LoaderCircle className="animate-spin" size={16} />}
          {loading ? 'Saving...' : data ? 'Update Changes' : 'Save Change'}
        </button>
        <button
          onClick={handleCancel}
          className="bg-orange-500 px-6 py-2 rounded-md text-sm text-white hover:bg-orange-600 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

