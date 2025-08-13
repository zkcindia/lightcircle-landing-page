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
  const [isLoading, setIsLoading] = useState(false); // <-- Spinner state

  const months = ["This Month", "Last Month", "Last 3 Months", "Last 6 Months"];

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
      setIsLoading(true);
      try {
        await deleteProduct(deleteTarget);
        setProducts(products.filter((item) => item.id !== deleteTarget));
      } catch (error) {
        console.error("Delete failed:", error);
      } finally {
        setTimeout(() => {
          setIsDeleting(false);
          setShowDeleteModal(false);
          setDeleteTarget(null);
          setIsLoading(false);
        }, 1000); // Simulate delay for 1 second
      }
    }
  };

  const handleEditClick = (id) => {
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/admin/product/create?id=${id}`);
    }, 1000); // Delay for 1 second to show spinner
  };

  // ✅ Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="p-6 bg-[#f9f7f7] min-h-screen">
      <div className="bg-white rounded-xl shadow px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">All Product List</h2>
          <div className="flex gap-2 relative">
            <button
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  router.push("/admin/product/create");
                }, 1000);
              }}
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
              {currentProducts.map((item, index) => {
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
                      <p className="text-gray-500 text-xs">
                        {product.sold || 0} Sold
                      </p>
                    </td>
                    <td className="py-4">
                      {product.category || item?.parent_category_slug || "-"}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer"
                          onClick={() => handleEditClick(item.id)}
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

                {/* ✅ Updated Pagination (Styled like image with hover pointer) */}
<div className="flex justify-end mt-6">
  <div className="flex items-center gap-2">
    {/* Previous Button */}
    <button
      className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-colors duration-200 ${
        currentPage === 1
          ? 'border-gray-300 text-gray-400 cursor-not-allowed'
          : 'border-gray-300 text-black hover:bg-gray-200 hover:cursor-pointer'
      }`}
      onClick={() => goToPage(currentPage - 1)}
      disabled={currentPage === 1}
    >
      &lt;
    </button>

    {/* Page Numbers */}
    {[...Array(totalPages)].map((_, index) => {
      const pageNum = index + 1;
      return (
        <button
          key={pageNum}
          className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-colors duration-200 ${
            currentPage === pageNum
              ? 'bg-orange-500 text-white border-orange-500 hover:cursor-pointer'
              : 'border-gray-300 text-black hover:bg-gray-200 hover:cursor-pointer'
          }`}
          onClick={() => goToPage(pageNum)}
        >
          {pageNum}
        </button>
      );
    })}

    {/* Next Button */}
    <button
      className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-colors duration-200 ${
        currentPage === totalPages
          ? 'border-gray-300 text-gray-400 cursor-not-allowed'
          : 'border-gray-300 text-black hover:bg-gray-200 hover:cursor-pointer'
      }`}
      onClick={() => goToPage(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      &gt;
    </button>
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
            <p className="text-sm text-gray-600 mb-4">
              This action cannot be undone.
            </p>
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

      {/* FULLSCREEN LOADING SPINNER */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
          <div className="w-12 h-12 rounded-full border-t-4 border-b-4 border-orange-500 animate-spin"></div>
        </div>
      )}
    </section>
  );
}
