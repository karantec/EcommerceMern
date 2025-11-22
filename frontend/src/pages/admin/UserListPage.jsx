import React, { useState } from 'react';
import { FaTrash, FaEdit, FaUsers, FaSearch, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  useGetUsersQuery,
  useDeleteUserMutation
} from '../../slices/usersApiSlice';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import Meta from '../../components/Meta';

const UserListPage = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleteUserLoading }] = useDeleteUserMutation();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const deleteHandler = async userId => {
    try {
      const { data } = await deleteUser(userId);
      toast.success(data.message);
      setDeleteConfirm(null);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  // Filter users based on search term
  const filteredUsers = users?.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Meta title={'User List'} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <FaUsers className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  User Management
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Manage and monitor all registered users
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-5 border border-blue-100 dark:border-slate-600">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <FaUsers className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{users?.length || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-5 border border-green-100 dark:border-slate-600">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <FaCheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{users?.length || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-5 border border-purple-100 dark:border-slate-600">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <FaSearch className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Filtered Results</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredUsers?.length || 0}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        {!isLoading && !error && users?.length > 0 && (
          <div className="mb-6">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        )}

        {/* Delete Loading Overlay */}
        {isDeleteUserLoading && (
          <div className="mb-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex items-center gap-3">
              <Loader />
              <span className="text-blue-700 dark:text-blue-300 font-medium">Deleting user...</span>
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
            <Message variant='danger'>
              {error?.data?.message || error.error}
            </Message>
          </div>
        ) : filteredUsers?.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-700 mb-4">
              <FaUsers className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'No users found' : 'No users yet'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm 
                ? 'Try adjusting your search criteria'
                : 'Users will appear here once they register'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Email Address
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      User ID
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                  {filteredUsers?.map((user) => (
                    <tr 
                      key={user._id} 
                      className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-slate-700/50 dark:hover:to-slate-600/50 transition-all duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                              {user.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-mono text-gray-500 dark:text-gray-400 break-all">
                          {user._id}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/user/update/${user._id}`}
                            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 transition-all duration-200 hover:scale-110"
                            title="Edit User"
                          >
                            <FaEdit className="w-4 h-4" />
                          </Link>

                          {deleteConfirm === user._id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => deleteHandler(user._id)}
                                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 text-green-600 dark:text-green-400 transition-all duration-200 hover:scale-110"
                                title="Confirm Delete"
                              >
                                <FaCheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gray-50 dark:bg-gray-900/30 hover:bg-gray-100 dark:hover:bg-gray-900/50 text-gray-600 dark:text-gray-400 transition-all duration-200 hover:scale-110"
                                title="Cancel"
                              >
                                <FaTimesCircle className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(user._id)}
                              className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-rose-50 dark:bg-rose-900/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 transition-all duration-200 hover:scale-110"
                              title="Delete User"
                            >
                              <FaTrash className="w-4 h-4" />
                            </button>
                          )}
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
                Showing <span className="font-semibold text-gray-700 dark:text-gray-300">{filteredUsers?.length}</span> of <span className="font-semibold text-gray-700 dark:text-gray-300">{users?.length}</span> user{users?.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserListPage;