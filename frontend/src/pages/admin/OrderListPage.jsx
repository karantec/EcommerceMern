// src/pages/OrderListsPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaShoppingCart, FaSearch, FaFilter, FaTruck, FaDollarSign, FaCalendarAlt, FaUser } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Meta from "../../components/Meta";
import { useSelector } from "react-redux";
import { addCurrency } from "../../utils/addCurrency";

const OrderListsPage = () => {
  const { data: orders = [], isLoading, error } = useGetOrdersQuery();
  const { userInfo } = useSelector((state) => state.auth || {});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, paid, unpaid, delivered, pending

  // Filter orders based on search and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?._id?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = 
      filterStatus === "all" ||
      (filterStatus === "paid" && order.isPaid) ||
      (filterStatus === "unpaid" && !order.isPaid) ||
      (filterStatus === "delivered" && order.isDelivered) ||
      (filterStatus === "pending" && !order.isDelivered);

    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const paidOrders = orders.filter(order => order.isPaid).length;
  const deliveredOrders = orders.filter(order => order.isDelivered).length;

  return (
    <>
      <Meta title="Order List" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
              <FaShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Order Management
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Track and manage all customer orders
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-5 border border-blue-100 dark:border-slate-600">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <FaShoppingCart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{orders.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-5 border border-green-100 dark:border-slate-600">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <FaDollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{addCurrency(totalRevenue)}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-5 border border-purple-100 dark:border-slate-600">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <FaCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Paid Orders</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{paidOrders}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-5 border border-orange-100 dark:border-slate-600">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <FaTruck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Delivered</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{deliveredOrders}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filter Bar */}
        {!isLoading && !error && orders.length > 0 && (
          <div className="mb-6 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by order ID or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-11 pr-10 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Orders</option>
                <option value="paid">Paid Only</option>
                <option value="unpaid">Unpaid Only</option>
                <option value="delivered">Delivered Only</option>
                <option value="pending">Pending Delivery</option>
              </select>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="py-12">
            <Loader />
          </div>
        ) : error ? (
          <div className="py-4">
            <Message variant="danger">{error?.data?.message || error?.error || "Failed to load orders"}</Message>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-700 mb-4">
              <FaShoppingCart className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {searchTerm || filterStatus !== "all" ? "No orders found" : "No orders yet"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Orders will appear here once customers make purchases"}
            </p>
            {(searchTerm || filterStatus !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                }}
                className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Delivery
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                    {filteredOrders.map((order) => (
                      <tr
                        key={order._id}
                        className="hover:bg-gradient-to-r hover:from-green-50/50 hover:to-emerald-50/50 dark:hover:from-slate-700/50 dark:hover:to-slate-600/50 transition-all duration-200"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold shadow-md">
                              <FaShoppingCart className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-mono text-gray-600 dark:text-gray-300 break-all max-w-[120px]">
                              {order._id}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <FaUser className="w-3 h-3 text-gray-400" />
                            <span className="text-sm text-gray-900 dark:text-white font-medium">
                              {order.user?.name || order.user?._id}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <FaCalendarAlt className="w-3 h-3 text-gray-400" />
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {addCurrency(order.totalPrice)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {order.isPaid ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold">
                              <FaCheck className="w-3 h-3" />
                              Paid
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-semibold">
                              <FaXmark className="w-3 h-3" />
                              Unpaid
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {order.isDelivered ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold">
                              <FaTruck className="w-3 h-3" />
                              Delivered
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-semibold">
                              <FaTruck className="w-3 h-3" />
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            to={userInfo?.isAdmin ? `/admin/order/${order._id}` : `/order/${order._id}`}
                            className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Showing <span className="font-semibold text-gray-700 dark:text-gray-300">{filteredOrders.length}</span> of <span className="font-semibold text-gray-700 dark:text-gray-300">{orders.length}</span> order{orders.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {filteredOrders.map((order) => (
                <article
                  key={order._id}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 p-5 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white shadow-md">
                        <FaShoppingCart className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Order ID</p>
                        <p className="text-xs font-mono text-gray-900 dark:text-white font-semibold break-all">
                          {order._id}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <FaUser className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">Customer:</span>
                      <span className="text-gray-900 dark:text-white">{order.user?.name || order.user?._id}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaCalendarAlt className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">Date:</span>
                      <span className="text-gray-900 dark:text-white">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaDollarSign className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">Total:</span>
                      <span className="text-gray-900 dark:text-white font-semibold">{addCurrency(order.totalPrice)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {order.isPaid ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold">
                        <FaCheck className="w-3 h-3" />
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-semibold">
                        <FaXmark className="w-3 h-3" />
                        Unpaid
                      </span>
                    )}
                    {order.isDelivered ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold">
                        <FaTruck className="w-3 h-3" />
                        Delivered
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-semibold">
                        <FaTruck className="w-3 h-3" />
                        Pending
                      </span>
                    )}
                  </div>

                  <Link
                    to={userInfo?.isAdmin ? `/admin/order/${order._id}` : `/order/${order._id}`}
                    className="block text-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-semibold shadow-md transition-all"
                  >
                    View Order Details
                  </Link>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderListsPage;