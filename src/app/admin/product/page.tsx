"use client";

import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getAllProducts, deleteProduct } from "@/service/apiCreate";

export default function ProductPage() {
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState("This Month");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const months = ["This Month", "Last Month", "Last 3 Months", "Last 6 Months"];

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    }
    fetchData();
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteTarget(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      setIsDeleting(true);
      try {
        await deleteProduct(deleteTarget);
        setProducts(products.filter((item) => item.id !== deleteTarget));
      } catch (error) {
        console.error("Delete failed:", error);
      } finally {
        setIsDeleting(false);
        setShowDeleteModal(false);
        setDeleteTarget(null);
      }
    }
  };

  return (
    <section className="p-6 bg-[#f9f7f7] min-h-screen">
      <div className="bg-white rounded-xl shadow px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">All Product List</h2>
          <div className="flex gap-2 relative">
            <button
              onClick={() => router.push("/admin/product/create")}
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
                <th className="py-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {products.map((item, index) => {
                const product = item.data || {};
                return (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="py-4">
                      <input type="checkbox" />
                    </td>
                    <td className="py-4 flex items-center gap-3">
                      <img
                        src={item?.image_url || "/default-image.png"}
                        alt={product.name || "Product Image"}
                        width={48}
                        height={48}
                        className="rounded-md"
                      />
                      <div>
                        <p className="font-medium">{product.name || "-"}</p>
                        <p className="text-gray-500 text-xs">
                          Size: {product.sizes?.join(", ") || "N/A"}
                        </p>
                      </div>
                    </td>
                    <td className="py-4">
                      ${parseFloat(product.price || 0).toFixed(2)}
                    </td>
                    <td className="py-4">
                      <p>{product.stock || 0} Item Left</p>
                      <p className="text-gray-500 text-xs">{product.sold || 0} Sold</p>
                    </td>
                    <td className="py-4">
                      {product.category || item?.parent_category_slug || "-"}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer"
                          onClick={() => router.push(`/admin/product/create?id=${item.id}`)}
                        >
                          <Pencil className="w-4 h-4 text-[#ff5d2c]" />
                        </div>
                        <div
                          className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer"
                          onClick={() => handleDeleteClick(item.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
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

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-md relative">
            {/* close icon */}
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl cursor-pointer"
            >
              &times;
            </button>

            <h3 className="text-lg font-semibold mb-2">
              Are you sure to delete this product?
            </h3>
            <p className="text-sm text-gray-600 mb-4">This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="border px-4 py-2 rounded-md text-gray-600"
                disabled={isDeleting}
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="bg-red-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
