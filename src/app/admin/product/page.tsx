'use client';

import React, { useState } from 'react';
import { Pencil, Trash2, Star } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const products = [
  {
    image: '/images/product/tshirt.webp',
    name: 'Black T-shirt',
    sizes: ['S', 'M', 'L', 'XL'],
    price: 80,
    stock: 486,
    sold: 155,
    category: 'Fashion',
    rating: 4.5,
    reviews: 55,
  },
  {
    image: '/images/product/bag.jpg',
    name: 'Olive Green Leather Bag',
    sizes: ['S', 'M'],
    price: 136,
    stock: 784,
    sold: 674,
    category: 'Hand Bag',
    rating: 4.1,
    reviews: 143,
  },
  {
    image: '/images/product/dress.webp',
    name: 'Women Golden Dress',
    sizes: ['S', 'M'],
    price: 219,
    stock: 769,
    sold: 180,
    category: 'Fashion',
    rating: 4.4,
    reviews: 174,
  },
  {
    image: '/images/product/cap.webp',
    name: 'Gray Cap For Men',
    sizes: ['S', 'M', 'L'],
    price: 76,
    stock: 571,
    sold: 87,
    category: 'Cap',
    rating: 4.2,
    reviews: 23,
  },
  {
    image: '/images/product/shoe.webp',
    name: 'Running Shoes',
    sizes: ['M', 'L', 'XL'],
    price: 150,
    stock: 340,
    sold: 210,
    category: 'Footwear',
    rating: 4.6,
    reviews: 198,
  },
  {
    image: '/images/product/hoodie.webp',
    name: 'Blue Hoodie',
    sizes: ['S', 'M', 'L'],
    price: 99,
    stock: 150,
    sold: 80,
    category: 'Winter Wear',
    rating: 4.3,
    reviews: 112,
  },
  {
    image: '/images/product/w.jpg',
    name: 'Smart Watch Pro',
    sizes: ['One Size'],
    price: 299,
    stock: 120,
    sold: 45,
    category: 'Accessories',
    rating: 4.8,
    reviews: 300,
  },
  {
    image: '/images/product/jeans.avif',
    name: 'Classic Blue Jeans',
    sizes: ['S', 'M', 'L', 'XL'],
    price: 120,
    stock: 310,
    sold: 167,
    category: 'Fashion',
    rating: 4.0,
    reviews: 77,
  },
  {
    image: '/images/product/glass.jpg',
    name: 'Polarized Sunglasses',
    sizes: ['One Size'],
    price: 59,
    stock: 900,
    sold: 420,
    category: 'Accessories',
    rating: 4.7,
    reviews: 222,
  },
  {
    image: '/images/product/travel.webp',
    name: 'Traveler Backpack',
    sizes: ['M', 'L'],
    price: 180,
    stock: 200,
    sold: 156,
    category: 'Backpack',
    rating: 4.4,
    reviews: 134,
  },
];

export default function ProductPage() {
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState('This Month');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const months = ['This Month', 'Last Month', 'Last 3 Months', 'Last 6 Months'];

  return (
    <section className="p-6 bg-[#f9f7f7] min-h-screen">
      <div className="bg-white rounded-xl shadow px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">All Product List</h2>
          <div className="flex gap-2 relative">
            <button
              onClick={() => router.push('/admin/product/create')}
              className="bg-[#ff5d2c] hover:bg-[#ff3d00] text-white px-4 py-2 rounded-md font-medium cursor-pointer"
            >
              Add Product
            </button>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="border px-4 py-2 rounded-md text-gray-600 cursor-pointer flex items-center gap-1"
              >
                {selectedMonth} ▾
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 bg-white border mt-1 rounded-md shadow z-10">
                  {months.map((month) => (
                    <div
                      key={month}
                      onClick={() => {
                        setSelectedMonth(month);
                        setDropdownOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      {month}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-gray-200 bg-gray-200">
              <tr className="text-sm font-semibold text-gray-600 border-b border-gray-200">
                <th className="py-3">
                  <input type="checkbox" />
                </th>
                <th className="py-3">Product Name & Size</th>
                <th className="py-3">Price</th>
                <th className="py-3">Stock</th>
                <th className="py-3">Category</th>
                <th className="py-3">Rating</th>
                <th className="py-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {products.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <td className="py-4">
                    <input type="checkbox" />
                  </td>
                  <td className="py-4 flex items-center gap-3">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="rounded-md"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500 text-xs">
                        Size : {item.sizes.join(' , ')}
                      </p>
                    </div>
                  </td>
                  <td className="py-4">${item.price.toFixed(2)}</td>
                  <td className="py-4">
                    <p>{item.stock} Item Left</p>
                    <p className="text-gray-500 text-xs">{item.sold} Sold</p>
                  </td>
                  <td className="py-4">{item.category}</td>
                  <td className="py-4 flex items-center gap-1">
                    <div className="bg-gray-200 px-2 py-1 rounded-md flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium text-sm">{item.rating}</span>
                    </div>
                    <span className="text-gray-500 text-xs">
                      {item.reviews} Review
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer">
                        <Pencil className="w-4 h-4 text-[#ff5d2c]" />
                      </div>
                      <div className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6">
          <div className="inline-flex items-center space-x-1 border rounded-md overflow-hidden">
            <button className="px-3 py-1 text-sm text-blue-700 hover:bg-gray-200 cursor-pointer">Previous</button>
            <button className="px-3 py-1 text-sm bg-orange-500 text-white cursor-pointer">1</button>
            <button className="px-3 py-1 text-sm text-blue-700 hover:bg-gray-200 cursor-pointer">2</button>
            <button className="px-3 py-1 text-sm text-blue-700 hover:bg-gray-200 cursor-pointer">3</button>
            <button className="px-3 py-1 text-sm text-blue-700 hover:bg-gray-200 cursor-pointer">Next</button>
          </div>
        </div>
      </div>
    </section>
  );
}
