// src/pages/Admin/Dashboard.jsx
import React from "react";
import { FaStore, FaUsers, FaShoppingBag, FaWallet } from "react-icons/fa";

import { useGetProductsQuery } from "../../slices/productsApiSlice";
import { useGetUsersQuery } from "../../slices/usersApiSlice";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";

import { addCurrency } from "../../utils/addCurrency";

import Loader from "../../components/Loader";
import Meta from "../../components/Meta";
import ProductPriceChart from "../../components/Admin/ProductPriceChart";
import OrderPriceChart from "../../components/Admin/OrderPriceChart";
import DashboardCard from "../../components/Admin/DashboardCard";

const Dashboard = () => {
  const { data, isLoading } = useGetProductsQuery({});
  const { data: users, isLoading: isUsersLoading } = useGetUsersQuery({});
  const { data: orders, isLoading: isOrdersLoading } = useGetOrdersQuery({});

  const loading = isLoading || isUsersLoading || isOrdersLoading;

  const revenue = addCurrency(
    (orders || []).reduce((acc, item) => acc + Number(item.totalPrice || 0), 0)
  );

  return (
    <>
      <Meta title="Admin Dashboard" />

      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <Loader />
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-2">
                Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Welcome back! Here's what's happening with your store today.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <div className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <DashboardCard
                  title="Products"
                  icon={<FaStore size={36} className="text-blue-600 dark:text-blue-400" />}
                  value={data?.total ?? 0}
                  bgColor="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20"
                />
              </div>

              <div className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <DashboardCard
                  title="Users"
                  icon={<FaUsers size={36} className="text-rose-600 dark:text-rose-400" />}
                  value={(users && users.length) ?? 0}
                  bgColor="bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20"
                />
              </div>

              <div className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <DashboardCard
                  title="Orders"
                  icon={<FaShoppingBag size={36} className="text-amber-600 dark:text-amber-400" />}
                  value={(orders && orders.length) ?? 0}
                  bgColor="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20"
                />
              </div>

              <div className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <DashboardCard
                  title="Revenue"
                  icon={<FaWallet size={36} className="text-emerald-600 dark:text-emerald-400" />}
                  value={revenue}
                  bgColor="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20"
                />
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Product Price Chart */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                    Products Price Distribution
                  </h3>
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                </div>
                <div className="h-72 rounded-lg overflow-hidden">
                  <ProductPriceChart products={data?.products ?? []} />
                </div>
              </div>

              {/* Orders Chart */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                    Orders Over Time
                  </h3>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>
                <div className="h-72 rounded-lg overflow-hidden">
                  <OrderPriceChart orders={orders ?? []} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;