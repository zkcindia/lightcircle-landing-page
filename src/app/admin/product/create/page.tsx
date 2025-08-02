'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import { createProduct } from '@/service/apiCreate';
import { getCategory } from '@/service/apiCategory';
import { getSubCategoryById } from '@/service/apiSubCategory';

export default function CreateProductPage() {
  const [productImage, setProductImage] = useState(null);
  const fileInputRef = useRef(null);
  const [Category,setCategory] = useState([])
  const [subcategory,setSubcategory] = useState([])

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

  useEffect(()=>{
    fetchcategory();
  },[])

  // fetch category
const fetchcategory = async()=>{
  try {
    const response = await getCategory()
    if(response.status===200){
      setCategory(response.data)
    }
  } catch (error) {
    console.log(error);
    setCategory([])
  }
}

  // fetch SubCategory
  const fetchSubcategory = async(id)=>{
    try {
      const res = await getSubCategoryById(id);
      if(res.status===200){
        setSubcategory(res.data)
      }
    } catch (error) {
      console.log(error);
      setSubcategory([])
      
    }
  }

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };
const handleChange = async (e) => {
  const { name, value } = e.target;

  if (name === 'category') {
    setFormData((prev) => ({ ...prev, category: value, subcategory: '' }));
    await fetchSubcategory(value); // Fetch based on category ID
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
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    attributes.forEach((attr, index) => {
      form.append(`attributes[${index}][key]`, attr.key);
      form.append(`attributes[${index}][value]`, attr.value);
    });

    if (productImage) {
      form.append('thumbnail', productImage);
    }

    try {
      await createProduct(form);
      alert('Product created successfully!');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product');
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
              {formData.name && (
                <h3 className="text-lg font-semibold mt-4">{formData.name}</h3>
              )}
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
              {/* <Select label="Subcategory" name="subcategory" value={formData.subcategory} onChange={handleChange} options={[
                'Smartphones', 'Laptops', 'T-Shirts', 'Shoes', 'Chairs', 'Speakers', 'Track Pants', 'Luxury'
              ]} /> */}
              <Select
  label="Subcategory"
  name="subcategory"
  value={formData.subcategory}
  onChange={handleChange}
  options={subcategory}
/>

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

          {/* Tag, Stock, Tag No */}
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

// const Select = ({ label, name, value, onChange, options }) => (
//   <div>
//     <label className="text-sm text-gray-700">{label}</label>
//     <select
//       className={dropdownStyle}
//       name={name}
//       value={value}
//       onChange={onChange}
//     >
//       <option disabled value="">Select {label}</option>
//       {options.map((option) => (
//         <option
//           key={option.id || option}
//           value={option.id || option}
//         >
//           {option.name || option}
//         </option>
//       ))}
//     </select>
//   </div>
// );
const Select = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="text-sm text-gray-700">{label}</label>
    <select
      className={dropdownStyle}
      name={name}
      value={value}
      onChange={onChange}
    >
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
