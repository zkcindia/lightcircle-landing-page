'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import { createProduct } from '@/service/apiCreate';
import { getCategory } from '@/service/apiCategory';
import { getSubCategoryById } from '@/service/apiSubCategory';
import { useSearchParams } from 'next/navigation';
import { getProductById } from '@/service/apiCreate'; // 👈 you must implement this
import { editProduct } from '@/service/apiCreate';


export default function CreateProductPage() {
  const [productImage, setProductImage] = useState(null);
  const fileInputRef = useRef(null);
  const [Category, setCategory] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const searchParams = useSearchParams();
const editId = searchParams.get("id");

useEffect(() => {
  if (editId) {
    fetchProductData(editId);
  }
}, [editId]);

// const fetchProductData = async (id) => {
//   try {
//     const res = await getProductById(id); // 👈 must return a single product
//     const { data } = res;

//     // set form fields
//     setFormData({
//       name: data.name || '',
//       category: data.category || '',
//       subcategory: data.parent_category_slug || '',
//       brand: data.brand || '',
//       weight: data.weight || '',
//       description: data.description || '',
//       tag_no: data.tag_no || '',
//       stock: data.stock || '',
//       tag: data.tag || '',
//       price: data.price || '',
//       discount: data.discount || '',
//       tax: data.tax || '',
//     });
//     const handleSubmit = async () => {
//   const form = new FormData();
//   const dataPayload = {
//     ...formData,
//     attributes,
//   };
//   form.append('data', JSON.stringify(dataPayload));
//   form.append('parent_category_slug', formData.subcategory);
//   if (productImage) {
//     form.append('image', productImage);
//   }

//   try {
//     if (editId) {
//       await editProduct(editId, form); // 👈 your edit API
//     } else {
//       await createProduct(form);
//     }
//     setShowSuccessModal(true);
//   } catch (error) {
//     console.error("Error submitting product:", error);
//     setShowErrorModal(true);
//   }
// };

//     // attributes
//     setAttributes(data.attributes || [{ key: '', value: '' }]);

//     // image
//     if (data.image_url) {
//       const imageBlob = await fetch(data.image_url).then(res => res.blob());
//       const file = new File([imageBlob], "product-image.jpg", { type: imageBlob.type });
//       setProductImage(file);
//     }

//     // fetch subcategory if needed
//     if (data.category) {
//       await fetchSubcategory(data.category);
//     }

//   } catch (error) {
//     console.error("Failed to fetch product:", error);
//   }
// };
const fetchProductData = async (id) => {
  try {
    const res = await getProductById(id);
    const product = res.data;

    const details = product.data || {};

    setFormData({
      name: details.name || '',
      category: details.category || '',
      subcategory: product.parent_category_slug || '',
      brand: details.brand || '',
      weight: details.weight || '',
      description: details.description || '',
      tag_no: details.tag_no || '',
      stock: details.stock || '',
      tag: details.tag || '',
      price: details.price || '',
      discount: details.discount || '',
      tax: details.tax || '',
    });

    setAttributes(details.attributes || [{ key: '', value: '' }]);

    // Handle image
    if (product.image_url) {
      const imageBlob = await fetch(product.image_url).then(res => res.blob());
      const file = new File([imageBlob], "product-image.jpg", { type: imageBlob.type });
      setProductImage(file);
    }

    // Fetch subcategories
    if (details.category) {
      await fetchSubcategory(details.category);
    }

  } catch (error) {
    console.error("Failed to fetch product:", error);
  }
};



  const [subcategory, setSubcategory] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    brand: '',
    weight: '',
    description: '',
    tag_no: '',
    stock: '',
    tag: '',
    price: '',
    discount: '',
    tax: '',
  });

  const [attributes, setAttributes] = useState([{ key: '', value: '' }]);

  useEffect(() => {
    fetchcategory();
  }, []);

  const fetchcategory = async () => {
    try {
      const response = await getCategory();
      if (response.status === 200) {
        setCategory(response.data);
      }
    } catch (error) {
      console.log(error);
      setCategory([]);
    }
  };

  const fetchSubcategory = async (id) => {
    try {
      const res = await getSubCategoryById(id);
      if (res) {
        setSubcategory(res.data);
      }
    } catch (error) {
      console.log(error);
      setSubcategory([]);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      setFormData((prev) => ({ ...prev, category: value, subcategory: '' }));
      await fetchSubcategory(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAttributeChange = (index, field, value) => {
    const updated = [...attributes];
    updated[index][field] = value;
    setAttributes(updated);
  };

  const handleAddAttribute = () => {
    setAttributes((prev) => [...prev, { key: '', value: '' }]);
  };

  const handleRemoveAttribute = (index) => {
    setAttributes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProductImage(file);
  };

const handleSubmit = async () => {
  const form = new FormData();
  const dataPayload = {
    ...formData,
    attributes,
  };
  form.append('data', JSON.stringify(dataPayload));
  form.append('parent_category_slug', formData.subcategory);

  if (productImage) {
    form.append('image', productImage);
  }

  try {
    await createProduct(form);
    setShowSuccessModal(true); // ✅ Keep this
    // ❌ Remove timeout: no auto-close or reset
  } catch (error) {
    console.error('Error creating product:', error);
    setShowErrorModal(true);

  }
};

  const handleRemoveProduct = () => {
    setProductImage(null);
    setFormData({
      name: '',
      category: '',
      subcategory: '',
      brand: '',
      weight: '',
      description: '',
      tag_no: '',
      stock: '',
      tag: '',
      price: '',
      discount: '',
      tax: '',
    });
    setAttributes([{ key: '', value: '' }]);
  };

  const hasImage = Boolean(productImage);

  return (
    <div className="p-8 bg-[#f9f7f7] min-h-screen cursor-crosshair">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT: Preview */}
        <div className="bg-white p-4 rounded-xl shadow-md col-span-1">
          {hasImage ? (
            <>
              <img
                src={URL.createObjectURL(productImage)}
                alt="Preview"
                className="mx-auto h-80 object-contain"
              />
              {formData.name && <h3 className="text-lg font-semibold mt-4">{formData.name}</h3>}
              {(formData.category || formData.subcategory) && (
                <span className="text-sm text-gray-500">
                  ({formData.category}{formData.subcategory && ` > ${formData.subcategory}`})
                </span>
              )}
              {(formData.price || formData.discount) && (
                <div className="mt-2">
                  <span className="line-through text-gray-400 mr-2">
                    ${(+formData.price + (+formData.discount || 0)).toFixed(2)}
                  </span>
                  <span className="text-blue-600 font-semibold">
                    ${(+formData.price).toFixed(2)}
                  </span>
                  {formData.discount && (
                    <span className="ml-2 text-sm text-green-500">
                      ({formData.discount}% Off)
                    </span>
                  )}
                </div>
              )}
              {formData.description && (
                <div className="mt-4 text-sm text-gray-600">{formData.description}</div>
              )}
              {attributes.length > 0 && attributes.some(attr => attr.key && attr.value) && (
                <div className="mt-4 text-sm text-gray-700">
                  <h4 className="font-semibold mb-1">Attributes:</h4>
                  <ul className="list-disc ml-5">
                    {attributes
                      .filter(attr => attr.key && attr.value)
                      .map((attr, idx) => (
                        <li key={idx}>
                          <span className="font-medium">{attr.key}</span>: {attr.value}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
              <div className="mt-4 text-sm text-gray-700 space-y-1">
                <p><strong>Brand:</strong> {formData.brand}</p>
                <p><strong>Weight:</strong> {formData.weight}</p>
                <p><strong>Tag No:</strong> {formData.tag_no}</p>
                <p><strong>Stock:</strong> {formData.stock}</p>
                <p><strong>Tag:</strong> {formData.tag}</p>
                <p><strong>Tax:</strong> {formData.tax}%</p>
              </div>
              <div className="mt-6 flex gap-4 flex-col">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                  onClick={handleSubmit}
                >
                  Create Product
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                  onClick={handleRemoveProduct}
                >
                  Remove Product
                </button>
              </div>
            </>
          ) : (
            <div className="text-gray-400 text-center mt-16">
              <p className="text-lg font-semibold mb-2">Product preview</p>
              <p>Upload an image to see the product preview here.</p>
            </div>
          )}
        </div>

        {/* RIGHT: Form */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md space-y-8">
          {/* Image Upload */}
          <div>
            <h2 className="text-lg font-bold text-[#1d2a3b] mb-2">Add Product Photo</h2>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-orange-500"
              onClick={handleImageClick}
            >
              <Upload className="mx-auto text-orange-500" size={40} />
              <p className="mt-4 text-lg font-semibold text-[#1d2a3b]">
                Drop your image here, or <span className="text-orange-500 font-semibold cursor-pointer">click to browse</span>
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Recommended: 1600 x 1200. PNG, JPG, GIF allowed.
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h2 className="text-lg font-bold text-[#1d2a3b] mb-4">Product Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input label="Product Name" name="name" value={formData.name} onChange={handleChange} />
              <Select label="Product Categories" name="category" value={formData.category} onChange={handleChange} options={Category} />
              <Select label="Subcategory" name="subcategory" value={formData.subcategory} onChange={handleChange} options={subcategory} />
              <Input label="Brand" name="brand" value={formData.brand} onChange={handleChange} />
              <Input label="Weight" name="weight" value={formData.weight} onChange={handleChange} />
            </div>
            <div className="mt-4">
              <label className="text-sm text-gray-700">Description</label>
              <textarea
                className={`${inputStyle} h-24 resize-none`}
                placeholder="Short description about the product"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Additional Attributes */}
            <div className="mt-6">
              <h2 className="text-lg font-bold text-[#1d2a3b] mb-4">Additional Attributes</h2>
              {attributes.map((attr, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-center mb-2">
                  <div className="col-span-5">
                    <input className={inputStyle} placeholder="Attribute (e.g., Color)" value={attr.key} onChange={(e) => handleAttributeChange(index, 'key', e.target.value)} />
                  </div>
                  <div className="col-span-5">
                    <input className={inputStyle} placeholder="Value (e.g., Red)" value={attr.value} onChange={(e) => handleAttributeChange(index, 'value', e.target.value)} />
                  </div>
                  <button
                    className="col-span-2 text-red-600 hover:text-red-800 cursor-pointer"
                    onClick={() => handleRemoveAttribute(index)}
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
              <button
                className="text-blue-600 text-sm hover:text-blue-800 mt-2 cursor-pointer"
                onClick={handleAddAttribute}
              >
                + Add More Attributes
              </button>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h2 className="text-lg font-bold text-[#1d2a3b] mb-4">Pricing Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Price ($)" name="price" type="number" value={formData.price} onChange={handleChange} />
              <Input label="Discount (%)" name="discount" type="number" value={formData.discount} onChange={handleChange} />
              <Input label="Tax (%)" name="tax" type="number" value={formData.tax} onChange={handleChange} />
            </div>
          </div>

          {/* Inventory & Tags */}
          <div>
            <h2 className="text-lg font-bold text-[#1d2a3b] mb-4">Inventory & Tags</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Tag No" name="tag_no" value={formData.tag_no} onChange={handleChange} />
              <Input label="Stock" name="stock" type="number" value={formData.stock} onChange={handleChange} />
              <Input label="Tag" name="tag" value={formData.tag} onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-40 z-50">
    <div className="bg-white rounded-xl shadow-xl p-6 text-center max-w-sm w-full animate-fade-in">
      <div className="flex justify-center mb-4">
        <div className="bg-green-100 rounded-full p-2">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h2 className="text-xl font-semibold text-gray-800">Success</h2>
      <p className="text-gray-600 mt-2">Product created successfully!</p>
      {/* <button
        className="bg-green-600 text-white mt-4 px-4 py-2 rounded hover:bg-green-700"
        onClick={() => setShowSuccessModal(false)}
      >
        OK
      </button> */}<button
  className="bg-green-600 text-white mt-4 px-4 py-2 rounded hover:bg-green-700"
  onClick={() => {
    setShowSuccessModal(false);
    handleRemoveProduct();
  }}
  
>
  OK
</button>

    </div>
  </div>
)}
{showErrorModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-40 z-50">
    <div className="bg-white rounded-xl shadow-xl p-6 text-center max-w-sm w-full animate-fade-in">
      <div className="flex justify-center mb-4">
        <div className="bg-red-100 rounded-full p-2">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      <h2 className="text-xl font-semibold text-gray-800">Error</h2>
      <p className="text-gray-600 mt-2">Failed to create product</p>
      <button
        className="bg-red-600 text-white mt-4 px-4 py-2 rounded hover:bg-red-700"
        onClick={() => setShowErrorModal(false)}
      >
        OK
      </button>
    </div>
  </div>
)}


    </div>
  );
}

const Input = ({ label, name, value, onChange, type = 'text' }) => (
  <div>
    <label className="text-sm text-gray-700">{label}</label>
    <input
      className={inputStyle}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      min={type === 'number' ? '0' : undefined}
      step={type === 'number' ? '0.01' : undefined}
    />
  </div>
);

const Select = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="text-sm text-gray-700">{label}</label>
    <select className={dropdownStyle} name={name} value={value} onChange={onChange}>
      <option disabled value="">Select {label}</option>
      {options.map((option) => {
        const key = typeof option === 'object' ? option.id : option;
        const val = typeof option === 'object' ? option.slug : option;
        const labelText = typeof option === 'object' ? option.name : option;
        return (
          <option key={key} value={val}>
            {labelText}
          </option>
        );
      })}
    </select>
  </div>
);

const inputStyle =
  'mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm text-gray-700';

const dropdownStyle =
  'mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm text-gray-700 cursor-pointer transition duration-150 ease-in-out';
