'use client';

import React, { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getSubCategory, deleteSubCategory } from '@/service/apiSubCategory';
import { Modal, message } from 'antd';
import 'antd/dist/reset.css';

export default function page() {
  const [subCategories, setSubCategories] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteSlug, setDeleteSlug] = useState(null);
  const router = useRouter();
  const [isLoading,setIsLoading] = useState(false)

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    setIsLoading(true); // 👈 start loading
    try {
      const response = await getSubCategory();
      if (response.status === 200) {
        setSubCategories(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch subcategories', error);
    } finally {
      setIsLoading(false); // 👈 stop loading
    }
  };

  const handleDelete = async (slug) => {
    if (!slug) return;

    setIsLoading(true); // 👈 start loading
    try {
      await deleteSubCategory(slug);
      message.success('Subcategory deleted successfully');
      fetchSubCategories();
    } catch (error) {
      console.error('Delete failed:', error?.response?.data || error.message);
      message.error('Failed to delete subcategory');
    } finally {
      setIsDeleteModalOpen(false);
      setDeleteSlug(null);
      setIsLoading(false); // 👈 stop loading
    }
  };

  const openDeleteModal = (slug) => {
    setDeleteSlug(slug);
    setIsDeleteModalOpen(true);
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      {/* 👇 Fullscreen Spinner Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
          <div className="w-12 h-12 rounded-full border-t-4 border-b-4 border-orange-500 animate-spin"></div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">All Subcategories</h2>
          <button
            onClick={() => {
              setIsLoading(true);
              router.push('/admin/subcategory/addsubcategory');
            }}
            className="bg-orange-500 hover:bg-orange-600 !text-white px-4 py-2 rounded-md text-sm font-semibold transition cursor-pointer"
          >
            Add Subcategory
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-100">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Subcategory Name</th>
                <th className="px-4 py-2">Parent Category</th>
                <th className="px-4 py-2">Created By</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subCategories.map((sub, index) => (
                <tr key={sub.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{sub.name}</td>
                  <td className="px-4 py-2">{sub.category}</td>
                  <td className="px-4 py-2">{sub.created_by}</td>
                  <td className="px-4 py-2 flex gap-2">
                    {/* <button className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer">
                      <Eye className="w-4 h-4 text-[#ff5d2c]" />
                    </button> */}
                    <button
                      onClick={() => {
                        setIsLoading(true);
                        router.push(`/admin/subcategory/addsubcategory?id=${sub.id}`);
                      }}
                      className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer"
                    >
                      <Pencil className="w-4 h-4 text-[#ff5d2c]" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(sub.slug)}
                      className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
              {subCategories.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No subcategories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Centered Delete Modal */}
      <Modal
        title="Are you sure to delete this subcategory?"
        open={isDeleteModalOpen}
        onOk={() => handleDelete(deleteSlug)}
        onCancel={() => setIsDeleteModalOpen(false)}
        okText="Yes, Delete"
        cancelText="No"
        centered
        okButtonProps={{ style: { backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' } }}
      >
        <p>This action cannot be undone.</p>
      </Modal>
    </main>
  );
}
