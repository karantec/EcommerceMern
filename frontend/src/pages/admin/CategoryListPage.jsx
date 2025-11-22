// src/pages/Admin/CategoryListPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaTags } from "react-icons/fa";
import { toast } from "react-toastify";

import { useGetCategoriesQuery, useDeleteCategoryMutation } from "../../slices/categoryApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Meta from "../../components/Meta";
import Paginate from "../../components/Paginate";

const CATEGORIES_PER_PAGE = 8;

const CategoryListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);

  const skip = (currentPage - 1) * CATEGORIES_PER_PAGE;

  const { data, isLoading, error } = useGetCategoriesQuery({
    limit: CATEGORIES_PER_PAGE,
    skip,
  });

  const [deleteCategory, { isLoading: isDeleteCategoryLoading }] = useDeleteCategoryMutation();

  useEffect(() => {
    if (data) {
      const totalItems = data.total || 0;
      setTotal(totalItems);
      setTotalPage(Math.max(1, Math.ceil(totalItems / CATEGORIES_PER_PAGE)));
      if (currentPage > Math.ceil(totalItems / CATEGORIES_PER_PAGE) && totalItems > 0) {
        setCurrentPage(1);
      }
    }
  }, [data]);

  const deleteHandler = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await deleteCategory(categoryId).unwrap();
      toast.success(res?.message || "Category deleted successfully! 🎉");
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "Delete failed");
    }
  };

  const pageHandler = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPage && pageNum !== currentPage) {
      setCurrentPage(pageNum);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderValue = (value) => {
    if (value === null || value === undefined) return "N/A";
    if (typeof value === "object") {
      return value.name || value._id || JSON.stringify(value);
    }
    return String(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Meta title="Category List" />

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl shadow-lg">
                  <FaTags className="text-white text-xl" />
                </div>
                Category Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {total > 0 ? `Managing ${total} categor${total !== 1 ? 'ies' : 'y'} in your store` : 'Start adding categories to organize your products'}
              </p>
            </div>
            <Link
              to="/admin/category/create"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <FaPlus className="group-hover:rotate-90 transition-transform duration-300" />
              Add New Category
            </Link>
          </div>

          {/* Stats Bar */}
          {total > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-md border border-gray-100 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Categories</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{total}</p>
                  </div>
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <FaTags className="text-emerald-600 dark:text-emerald-400 text-xl" />
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-md border border-gray-100 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Current Page</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentPage} of {totalPage}</p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">📄</span>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-md border border-gray-100 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Per Page</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{CATEGORIES_PER_PAGE}</p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <span className="text-purple-600 dark:text-purple-400 text-xl font-bold">📊</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {isDeleteCategoryLoading && (
          <div className="mb-4">
            <Loader />
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        ) : error ? (
          <div className="mb-4">
            <Message variant="danger">{error?.data?.message || error?.error || "Failed to load categories"}</Message>
          </div>
        ) : (
          <>
            {/* Categories Table */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-slate-700">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Category ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                    {data?.categories?.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <div className="p-4 bg-gray-100 dark:bg-slate-700 rounded-full mb-4">
                              <FaTags className="text-gray-400 dark:text-gray-500 text-4xl" />
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-2">No categories yet</p>
                            <p className="text-gray-500 dark:text-gray-500 text-sm">Start by adding your first category!</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      data?.categories?.map((category) => (
                        <tr key={category._id} className="hover:bg-emerald-50 dark:hover:bg-slate-700/50 transition-colors duration-150">
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-mono break-words max-w-[220px]">
                            {category._id}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 font-semibold">
                              {renderValue(category.name)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                            {category.description ? (
                              <span className="line-clamp-2">{category.description}</span>
                            ) : (
                              <span className="text-gray-400 dark:text-gray-500 italic">No description</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                to={`/admin/category/update/${category._id}`}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                                title="Edit Category"
                              >
                                <FaEdit />
                                <span className="hidden sm:inline">Edit</span>
                              </Link>

                              <button
                                onClick={() => deleteHandler(category._id)}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                                title="Delete Category"
                              >
                                <FaTrash />
                                <span className="hidden sm:inline">Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPage > 1 && (
              <div className="mt-8 flex justify-center">
                <Paginate currentPage={currentPage} totalPage={totalPage} pageHandler={pageHandler} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryListPage;