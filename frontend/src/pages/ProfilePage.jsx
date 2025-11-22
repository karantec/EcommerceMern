// src/pages/ProfilePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import ProfileForm from "../components/ProfileForm";
import { addCurrency } from "../utils/addCurrency";

const ProfilePage = () => {
  const { data: orders = [], isLoading, error } = useGetMyOrdersQuery();

  return (
    <>
      <Meta title="User Profile" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Profile form */}
          <aside className="lg:col-span-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                My Profile
              </h2>
              <ProfileForm />
            </div>
          </aside>

          {/* Right: Orders */}
          <main className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                My Orders
              </h2>
            </div>

            {isLoading ? (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
                <Loader />
              </div>
            ) : error ? (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
                <Message variant="danger">
                  {error?.data?.message || error?.error || "Failed to load orders"}
                </Message>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6 text-center text-gray-500 dark:text-gray-400">
                You have no orders yet.
              </div>
            ) : (
              <div className="space-y-4">
                {/* Table header for large screens */}
                <div className="hidden md:grid grid-cols-6 gap-4 bg-white/50 dark:bg-slate-800/50 rounded-t-2xl px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 border border-b-0">
                  <div className="col-span-2">ID</div>
                  <div className="hidden sm:block">Date</div>
                  <div className="hidden lg:block">Total</div>
                  <div>Paid</div>
                  <div>Delivered</div>
                  <div className="text-right">Details</div>
                </div>

                {/* Orders list */}
                <ul className="space-y-3">
                  {orders.map((order) => (
                    <li key={order._id} className="bg-white dark:bg-slate-800 rounded-2xl shadow p-4 md:p-6 border">
                      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                        {/* ID & small view on mobile */}
                        <div className="md:col-span-2">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100 break-all">
                            {order._id}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 md:hidden">
                            {new Date(order.createdAt).toLocaleDateString()} • {addCurrency(order.totalPrice)}
                          </div>
                        </div>

                        {/* Date */}
                        <div className="hidden sm:block">
                          <div className="text-sm text-gray-700 dark:text-gray-300">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        {/* Total */}
                        <div className="hidden lg:block">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {addCurrency(order.totalPrice)}
                          </div>
                        </div>

                        {/* Paid */}
                        <div className="flex items-center">
                          {order.isPaid ? (
                            <span className="inline-flex items-center gap-2 text-green-600 dark:text-green-400">
                              <FaCheck /> <span className="text-sm">Yes</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 text-red-600 dark:text-red-400">
                              <FaXmark /> <span className="text-sm">No</span>
                            </span>
                          )}
                        </div>

                        {/* Delivered */}
                        <div className="flex items-center">
                          {order.isDelivered ? (
                            <span className="inline-flex items-center gap-2 text-green-600 dark:text-green-400">
                              <FaCheck /> <span className="text-sm">Yes</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 text-red-600 dark:text-red-400">
                              <FaXmark /> <span className="text-sm">No</span>
                            </span>
                          )}
                        </div>

                        {/* Details */}
                        <div className="text-right">
                          <Link
                            to={`/order/${order._id}`}
                            className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-lime-600 hover:bg-lime-700 text-white text-sm font-medium shadow"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
