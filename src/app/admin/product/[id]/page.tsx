'use client';

import React, { useState } from 'react';
import {
  Star,
  ShoppingCart,
  Lock,
  Heart,
  Bookmark,
  Truck,
  Ticket,
  Gift,
  Headphones,
  ThumbsUp,
  Flag,
} from 'lucide-react';
import Image from 'next/image';

export default function ProductDetailsPage() {
  const [showMore, setShowMore] = useState(false);
  const images = [
    '/images/product/p-1.png',
    '/images/product/p-10.png',
    '/images/product/p-13.png',
    '/images/product/p-14.png',
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedColor, setSelectedColor] = useState('Dark');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  return (
    <section
      className="p-8 bg-[#f9f7f7] min-h-screen"
      style={{
        cursor: 'url("/images/cursor.png"), auto',
      }}
    >
      <h1 className="text-2xl font-bold mb-8">Product Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-xl shadow">
        {/* Left: Images */}
        <div>
          <Image
            src={selectedImage}
            alt="Selected Product"
            width={500}
            height={500}
            className="rounded-xl object-contain"
          />

          <div className="flex gap-4 mt-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`w-24 h-24 border rounded-lg overflow-hidden ${
                  selectedImage === img ? 'ring-2 ring-orange-400' : ''
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </button>
            ))}
          </div>

          {/* Buttons BELOW IMAGES */}
          <div className="flex items-center gap-3 mt-6">
            <button className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg">
              <ShoppingCart size={18} /> Add To Cart
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg">
              <Lock size={18} /> Buy Now
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-red-50 hover:bg-red-100 rounded-lg">
              <Heart size={18} className="text-red-500" />
            </button>
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="inline-block mb-2 px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs">
              New Arrival
            </span>

            <h2 className="text-2xl font-bold mb-2">Men Slim Fit T-shirt</h2>

            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={`${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`}
                  fill={i < 4 ? '#facc15' : 'none'}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                4.5 (55 Review)
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold text-blue-600">$80.00</span>
              <span className="line-through text-gray-400">$100.00</span>
              <span className="text-red-500 text-sm">(30% Off)</span>
            </div>

            {/* Colors */}
            <div className="mb-4">
              <p className="font-medium mb-1">Colors &gt; {selectedColor}</p>
              <div className="flex gap-3">
                {['Dark', 'Yellow', 'White', 'Green'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full border cursor-pointer ${
                      color === 'Dark'
                        ? 'bg-gray-700'
                        : color === 'Yellow'
                        ? 'bg-yellow-400'
                        : color === 'White'
                        ? 'bg-white border'
                        : 'bg-green-400'
                    } ${selectedColor === color ? 'ring-2 ring-orange-400' : ''}`}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-4">
              <p className="font-medium mb-1">Size &gt; {selectedSize}</p>
              <div className="flex gap-2 flex-wrap">
                {['S', 'M', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-1 rounded-md border cursor-pointer ${
                      selectedSize === size
                        ? 'bg-gray-200'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-4">
              <p className="font-medium mb-1">Quantity :</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  className="px-3 py-1 border rounded cursor-pointer"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-3 py-1 border rounded cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <p className="text-green-600 font-medium">✔ In Stock</p>
            <p className="text-green-600 font-medium">
              ✔ Free delivery available
            </p>
            <p className="text-green-600 font-medium mb-6">
              ✔ Sales 10% Off Use Code: <span className="font-bold">CODE123</span>
            </p>

            {/* Description */}
            <h3 className="text-lg font-semibold mb-2">Description :</h3>
            <p className="text-gray-700">
              A casual sweatshirt-style top crafted from a soft cotton-blend fabric with a cozy, brushed interior. Designed for a relaxed fit, it features dropped shoulders, long sleeves, and ribbed trim at the neckline, cuffs, and hem for a classic finish.
              A small metal text appliqué adds a subtle, stylish detail.
              {showMore && (
                <>
                  {' '}A small metal text appliqué on the chest adds a touch of understated detail, elevating this everyday essential with a hint of modern edge. Perfect for layering or wearing on its own, this top pairs effortlessly with jeans, joggers, or leggings for a look that’s both comfortable and effortlessly cool. Whether you’re lounging at home, running errands, or meeting friends for a casual outing, this versatile sweatshirt is sure to become a go-to favorite in your wardrobe.
                </>
              )}
              {' '}
              <span
                className="text-orange-500 cursor-pointer"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? ' Show less' : ' Read more'}
              </span>
            </p>

            {/* Offers */}
            <h3 className="text-lg font-semibold mb-2">Available offers :</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-gray-700">
                <Bookmark size={16} className="text-green-500 mt-1" />
                <span>
                  <strong>Bank Offer</strong> 10% instant discount on Bank Debit Cards, up to $30 on orders of $50 and above
                </span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <Bookmark size={16} className="text-green-500 mt-1" />
                <span>
                  <strong>Bank Offer</strong> Grab our exclusive offer now and save 20% on your next purchase! Don&apos;t miss out, shop today!
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white p-8 rounded-xl shadow mt-12">
        <div className="flex items-start gap-4">
          <div className="bg-orange-50 p-3 rounded-lg">
            <Truck size={32} className="text-orange-500" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Free shipping for all orders over $200</h4>
            <p className="text-gray-500 text-sm">Only in this week</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-orange-50 p-3 rounded-lg">
            <Ticket size={32} className="text-orange-500" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Special discounts for customers</h4>
            <p className="text-gray-500 text-sm">Coupons up to $100</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-orange-50 p-3 rounded-lg">
            <Gift size={32} className="text-orange-500" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Free gift wrapping</h4>
            <p className="text-gray-500 text-sm">With 100 letters custom note</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-orange-50 p-3 rounded-lg">
            <Headphones size={32} className="text-orange-500" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Expert Customer Service</h4>
            <p className="text-gray-500 text-sm">8:00 - 20:00, 7 days/week</p>
          </div>
        </div>
      </div>

      {/* Items Detail + Review Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <div className="bg-white p-8 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-4">Items Detail</h3>
          <ul className="space-y-2 text-gray-700">
            <li>Product Dimensions : 53.3 x 40.6 x 6.4 cm; 500 Grams</li>
            <li>Date First Available : 22 September 2023</li>
            <li>Department : Men</li>
            <li>Manufacturer : Greensboro, NC 27401 Prospa-Pal</li>
            <li>ASIN : BOCJMML118</li>
            <li>Item model number : 1137AZ</li>
            <li>Country of Origin : U.S.A</li>
            <li>Manufacturer : Suite 941 89157 Baumbach Views, Gilbertmouth, TX 31542-2135</li>
            <li>Packer : Apt. 726 80915 Hung Stream, Rowetown, WV 44364</li>
            <li>Importer : Apt. 726 80915 Hung Stream, Rowetown, WV 44364</li>
            <li>Item Weight : 500 g</li>
            <li>Item Dimensions LxWxH : 53.3 x 40.6 x 6.4 Centimeters</li>
            <li>Generic Name : T-Shirt</li>
            <li>Best Sellers Rank : #13 in Clothing & Accessories</li>
          </ul>
        </div>
        <div className="bg-white p-8 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-4">Top Review From World</h3>
          <div className="flex gap-4 mb-4">
            <Image src="/images/product/t.jpg" alt="User 1" width={50} height={50} 
            className="rounded-full w-10 h-10"/>
            <div>
              <p className="font-bold">Arya Ray</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={`${i < 5 ? 'text-yellow-500' : 'text-gray-300'}`} fill="#facc15" />
                ))}
                <span className="ml-1 text-sm text-gray-700">Excellent Quality</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Reviewed in Canada on 16 November 2023
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Medium thickness. Did not shrink after wash. Good elasticity . XL size Perfectly fit for 5.10 height and heavy body. Did not fade after wash. Only for maroon colour t-shirt colour lightly gone in first wash but not faded. I bought 5 tshirt of different colours. Highly recommended in so low price.
              </p>
              <div className="flex gap-4 mt-2 text-sm text-gray-500">
                <button className="flex items-center gap-1"><ThumbsUp size={14} /> Helpful</button>
                <button className="flex items-center gap-1"><Flag size={14} /> Report</button>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex gap-4">
            <Image src="/images/product/avatar-6.jpg" alt="User 2" width={20} height={20} className="rounded-full w-10 h-10" />
            <div>
              <p className="font-bold">Isha Das</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={`${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`} fill={i < 4 ? '#facc15' : 'none'} />
                ))}
                <span className="ml-1 text-sm text-gray-700">Good Quality</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Reviewed in U.S.A on 21 December 2023
              </p>
              <p className="text-gray-600 text-sm mt-1">
                I iked the tshirt, it's pure cotton & skin friendly, but the size is smaller to compare standard size. best rated
              </p>
              <div className="flex gap-4 mt-2 text-sm text-gray-500">
                <button className="flex items-center gap-1"><ThumbsUp size={14} /> Helpful</button>
                <button className="flex items-center gap-1"><Flag size={14} /> Report</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
