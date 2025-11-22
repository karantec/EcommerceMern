// src/pages/Admin/AdminListPage.jsx
import React from "react";
import Meta from "../../components/Meta";
import { useAdminsQuery } from "../../slices/usersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaUserShield, FaPlus } from "react-icons/fa";

const AdminListPage = () => {
  const { data: admins = [], isLoading, error } = useAdminsQuery({});

  return (
    <>
      <Meta title="Admin List" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg">
                <FaUserShield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Admin Management
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Manage administrator accounts and permissions
                </p>
              </div>
            </div>
            <Link
              to="/admin/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <FaPlus className="w-4 h-4" />
              Add New Admin
            </Link>
          </div>
        </div>

        {/* Stats Card */}
        {!isLoading && !error && (
          <div className="mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-blue-100 dark:border-slate-600">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <FaUserShield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total Administrators</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{admins.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Section */}
        {isLoading ? (
          <div className="py-12">
            <Loader />
          </div>
        ) : error ? (
          <div className="py-4">
            <Message variant="danger">
              {error?.data?.message || error?.error || "Failed to load admins"}
            </Message>
          </div>
        ) : admins.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-700 mb-4">
              <FaUserShield className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No administrators found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Get started by adding your first administrator account.
            </p>
            <Link
              to="/admin/create"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold shadow-lg transition-colors"
            >
              <FaPlus className="w-4 h-4" />
              Add First Admin
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Administrator ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Email Address
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                  {admins.map((admin, index) => (
                    <tr 
                      key={admin._id} 
                      className="hover:bg-gradient-to-r hover:from-amber-50/50 hover:to-orange-50/50 dark:hover:from-slate-700/50 dark:hover:to-slate-600/50 transition-all duration-200"
                    >
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold shadow-md">
                            {admin.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-gray-600 dark:text-gray-300 font-mono text-xs break-all max-w-[180px]">
                            {admin._id}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {admin.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {admin.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/user/update/${admin._id}`}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 transition-all duration-200 hover:scale-110"
                            title="Edit Administrator"
                          >
                            <FaEdit className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => {}}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-rose-50 dark:bg-rose-900/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 transition-all duration-200 hover:scale-110"
                            title="Delete Administrator"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-700 dark:text-gray-300">{admins.length}</span> administrator{admins.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminListPage;