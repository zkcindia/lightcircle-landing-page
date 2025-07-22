'use client';

import React from 'react';
import { Upload } from 'lucide-react';

export default function CreateProductPage() {
  return (
    <div className="p-8 bg-[#f9f7f7] min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Product Preview */}
        <div className="bg-white p-4 rounded-xl shadow-md col-span-1">
          <img
            src="/images/product/tshirt.webp"
            alt="Product"
            className="mx-auto h-80 object-contain"
          />
          <h3 className="text-lg font-semibold mt-4">
            Men Black Slim Fit T-shirt
          </h3>
          <span className="text-sm text-gray-500">(Fashion)</span>
          <div className="mt-2">
            <span className="line-through text-gray-400 mr-2">$100</span>
            <span className="text-blue-600 font-semibold">$80</span>
            <span className="ml-2 text-sm text-green-500">(20% Off)</span>
          </div>

          <div className="mt-4">
            <p className="font-medium">Size:</p>
            <div className="flex gap-2 mt-1">
              {['S', 'M', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200 cursor-pointer"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="font-medium">Colors:</p>
            <div className="flex gap-3 mt-1">
              {['bg-black', 'bg-white', 'bg-yellow-300', 'bg-red-400'].map(
                (color, idx) => (
                  <div
                    key={idx}
                    className={`w-5 h-5 rounded-full ${color} border cursor-pointer`}
                  />
                )
              )}
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
              Create Product
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 cursor-pointer">
              Cancel
            </button>
          </div>
        </div>

        {/* Right: Product Form */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md space-y-8">
          {/* Image Uploader */}
          <div>
            <h2 className="text-lg font-bold text-[#1d2a3b] mb-2">
              Add Product Photo
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-orange-500">
              <Upload className="mx-auto text-orange-500" size={40} />
              <p className="mt-4 text-lg font-semibold text-[#1d2a3b]">
                Drop your images here, or{' '}
                <span className="text-orange-500 font-semibold cursor-pointer">
                  click to browse
                </span>
              </p>
              <p className="mt-2 text-sm text-gray-500">
                1600 x 1200 (4:3) recommended. PNG, JPG and GIF files are allowed
              </p>
            </div>
          </div>

          {/* Main Information */}
          <div>
            <h2 className="text-lg font-bold text-[#1d2a3b] mb-4">
              Product Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-700">Product Name</label>
                <input className={inputStyle} placeholder="Item’s Name" />
              </div>
              <div>
                <label className="text-sm text-gray-700">
                  Product Categories
                </label>
                <select className={dropdownStyle}>
                    <option disabled selected>Choose a category</option>  
                  <option>Appliances</option>
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Footwear</option>
                  <option>Furniture</option>
                  <option>Headphones</option>
                  <option>Sportswear</option>
                  <option>Watches</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-700">Gender</label>
                <select className={dropdownStyle}>
                    <option disabled selected>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="text-sm text-gray-700">Brand</label>
                <input className={inputStyle} placeholder="Brand Name" />
              </div>
              <div>
                <label className="text-sm text-gray-700">Weight</label>
                <input className={inputStyle} placeholder="In gm & kg" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="font-medium">Size:</p>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {['XS', 'S', 'M', 'XL', 'XXL', '3XL'].map((size) => (
                    <button
                      key={size}
                      className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200 cursor-pointer"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-medium">Colors:</p>
                <div className="flex gap-3 mt-1 flex-wrap">
                  {[
                    'bg-black',
                    'bg-yellow-300',
                    'bg-white',
                    'bg-orange-400',
                    'bg-pink-300',
                    'bg-green-400',
                    'bg-teal-400',
                    'bg-gray-700',
                  ].map((color, idx) => (
                    <div
                      key={idx}
                      className={`w-5 h-5 rounded-full ${color} border cursor-pointer`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm text-gray-700">Description</label>
              <textarea
                className={`${inputStyle} h-24 resize-none`}
                placeholder="Short description about the product"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="text-sm text-gray-700">Tag Number</label>
                <input
                  className={inputStyle}
                  type="number"
                  min="0"
                  placeholder="#******"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Stock</label>
                <input
                  className={inputStyle}
                  placeholder="Stock Quantity"
                  type="number"
                  min="0"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Tag</label>
                <input
                  className={inputStyle}
                  placeholder="Tag (e.g., #fashion)"
                />
              </div>
            </div>
          </div>

          {/* Pricing Details */}
          <div>
            <h2 className="text-lg font-bold text-[#1d2a3b] mb-4">
              Pricing Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-700">Price ($)</label>
                <input
                  className={inputStyle}
                  type="number"
                  placeholder="Enter Price"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Discount (%)</label>
                <input
                  className={inputStyle}
                  type="number"
                  placeholder="e.g., 20"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Tax (%)</label>
                <input
                  className={inputStyle}
                  type="number"
                  placeholder="e.g., 5"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
              Create Product
            </button>
            <button className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ Styles
const inputStyle =
  'mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm text-gray-700';

const dropdownStyle =
  'mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm text-gray-700 cursor-pointer transition duration-150 ease-in-out';
