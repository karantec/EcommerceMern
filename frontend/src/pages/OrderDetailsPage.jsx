// src/pages/OrderDetailsPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaShippingFast,
  FaCreditCard,
  FaCheckCircle,
  FaTimesCircle,
  FaBox,
  FaMapMarkerAlt,
  FaEnvelope,
  FaUser,
  FaTruck,
  FaArrowLeft,
  FaReceipt,
  FaCalendarAlt
} from "react-icons/fa";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useUpdateDeliverMutation,
  useGetRazorpayApiKeyQuery,
} from "../slices/ordersApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { addCurrency } from "../utils/addCurrency";
import axios from "axios";

const OrderDetailsPage = () => {
  const { id: orderId } = useParams();

  const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: isPayOrderLoading }] = usePayOrderMutation();
  const [updateDeliver, { isLoading: isUpdateDeliverLoading }] =
    useUpdateDeliverMutation();

  const { userInfo } = useSelector((state) => state.auth || {});

  const { data: razorpayApiKey } = useGetRazorpayApiKeyQuery();

  const paymentHandler = async () => {
    try {
      if (!order) {
        toast.error("Order not available");
        return;
      }

      if (!razorpayApiKey?.razorpayKeyId) {
        toast.error("Payment gateway is currently unavailable. Please try again later.");
        return;
      }

      const razorpayData = {
        amount: Math.round(Number(order.totalPrice || 0) * 100), // paise
        currency: "INR",
        receipt: `receipt#${orderId}`,
      };

      const { data } = await axios.post(
        "/api/v1/payment/razorpay/order",
        razorpayData
      );

      const { id: razorpayOrderId } = data;

      const options = {
        key: razorpayApiKey.razorpayKeyId,
        amount: razorpayData.amount,
        currency: razorpayData.currency,
        name: "MERN Shop",
        description: "Order Payment",
        image: "https://example.com/your_logo",
        order_id: razorpayOrderId,
        handler: async (response) => {
          try {
            const { data } = await axios.post(
              `/api/v1/payment/razorpay/order/validate`,
              response
            );
            const details = { ...data, email: order?.user?.email };
            await payOrder({ orderId, details }).unwrap();
            toast.success(data.message || "Payment successful");
          } catch (err) {
            toast.error(
              err?.data?.message || err?.message || "Payment validation failed"
            );
          }
        },
        prefill: {
          name: order?.user?.name,
          email: order?.user?.email,
        },
        notes: {
          address: "MERN Shop Office",
        },
        theme: {
          color: "#FFC107",
        },
      };

      /* eslint-disable no-undef */
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      /* eslint-enable no-undef */
    } catch (err) {
      toast.error(
        err?.data?.message || err?.message || "Failed to initiate payment"
      );
    }
  };

  const deliveredHandler = async () => {
    try {
      await updateDeliver(orderId).unwrap();
      toast.success("Order Delivered");
    } catch (err) {
      toast.error(
        err?.data?.message || err?.message || "Failed to update delivery"
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Message variant="danger">
          {error?.data?.message || error?.error || "Failed to load order"}
        </Message>
      </div>
    );
  }

  if (!order) {
    return (
      <>
        <Meta title="Order Details" />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Message variant="danger">Order not found.</Message>
        </div>
      </>
    );
  }

  return (
    <>
      <Meta title={`Order #${orderId}`} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button & Header */}
        <div className="mb-8">
          <Link
            to={userInfo?.isAdmin ? "/admin/orderlist" : "/profile"}
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to {userInfo?.isAdmin ? "Orders" : "Profile"}
          </Link>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
              <FaReceipt className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Order Details
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-mono">
                Order ID: {orderId}
              </p>
            </div>
          </div>
        </div>

        {/* Status Banner */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`rounded-xl p-4 border-2 ${
            order?.isPaid 
              ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" 
              : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
          }`}>
            <div className="flex items-center gap-3">
              {order?.isPaid ? (
                <FaCheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              ) : (
                <FaTimesCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              )}
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Payment Status
                </p>
                <p className={`text-xs ${
                  order?.isPaid 
                    ? "text-green-700 dark:text-green-400" 
                    : "text-red-700 dark:text-red-400"
                }`}>
                  {order?.isPaid 
                    ? `Paid on ${new Date(order?.paidAt).toLocaleString()}`
                    : "Payment Pending"
                  }
                </p>
              </div>
            </div>
          </div>

          <div className={`rounded-xl p-4 border-2 ${
            order?.isDelivered 
              ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" 
              : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
          }`}>
            <div className="flex items-center gap-3">
              {order?.isDelivered ? (
                <FaCheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              ) : (
                <FaTruck className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              )}
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Delivery Status
                </p>
                <p className={`text-xs ${
                  order?.isDelivered 
                    ? "text-blue-700 dark:text-blue-400" 
                    : "text-amber-700 dark:text-amber-400"
                }`}>
                  {order?.isDelivered 
                    ? `Delivered on ${new Date(order?.deliveredAt).toLocaleString()}`
                    : "Awaiting Delivery"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 px-6 py-4 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <FaShippingFast className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Shipping Information
                  </h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FaUser className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Customer Name</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {order?.user?.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaEnvelope className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email Address</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {order?.user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Delivery Address</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {order?.shippingAddress?.address}, {order?.shippingAddress?.city}
                        <br />
                        {order?.shippingAddress?.postalCode}, {order?.shippingAddress?.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaCalendarAlt className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Order Date</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {new Date(order?.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 px-6 py-4 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <FaCreditCard className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Payment Method
                  </h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white font-semibold text-sm">
                    {order?.paymentMethod}
                  </span>
                </div>
              </div>
            </section>

            {/* Order Items */}
            <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-900 dark:to-slate-800 px-6 py-4 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <FaBox className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Order Items ({order?.orderItems?.length || 0})
                  </h2>
                </div>
              </div>

              <div className="p-6">
                {order?.orderItems?.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <FaBox className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No items in this order</p>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {order.orderItems.map((item, index) => (
                      <li 
                        key={item._id} 
                        className={`flex items-center gap-4 pb-4 ${
                          index !== order.orderItems.length - 1 
                            ? "border-b border-gray-100 dark:border-slate-700" 
                            : ""
                        }`}
                      >
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-xl border-2 border-gray-100 dark:border-slate-600 shadow-sm"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/product/${item._id}`}
                            className="text-sm font-semibold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors line-clamp-2"
                          >
                            {item.name}
                          </Link>
                          <div className="mt-2 flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <span className="font-semibold">Qty:</span> {item.qty}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="font-semibold">Price:</span> {addCurrency(item.price)}
                            </span>
                            <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-bold">
                              <span>Total:</span> {addCurrency(item.qty * item.price)}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          </div>

          {/* Right sidebar - Order Summary */}
          <aside className="lg:sticky lg:top-4 h-fit">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-800 px-6 py-4 border-b border-gray-200 dark:border-slate-700">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Order Summary
                </h2>
              </div>

              <div className="p-6">
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 dark:text-gray-400">Items Subtotal:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {addCurrency(order?.itemsPrice)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 dark:text-gray-400">Shipping Fee:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {addCurrency(order?.shippingPrice)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 dark:text-gray-400">Tax (GST):</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {addCurrency(order?.taxPrice)}
                    </span>
                  </div>

                  <div className="pt-4 border-t-2 border-gray-200 dark:border-slate-600">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        Grand Total:
                      </span>
                      <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {addCurrency(order?.totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  {!order?.isPaid && !userInfo?.isAdmin && (
                    <button
                      onClick={paymentHandler}
                      disabled={isPayOrderLoading}
                      className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold shadow-lg transition-all duration-200 ${
                        isPayOrderLoading
                          ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                          : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white transform hover:scale-105"
                      }`}
                    >
                      {isPayOrderLoading ? (
                        <>
                          <svg
                            className="w-5 h-5 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8z"
                            />
                          </svg>
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <FaCreditCard className="w-5 h-5" />
                          Pay Now
                        </>
                      )}
                    </button>
                  )}

                  {userInfo?.isAdmin && order?.isPaid && !order?.isDelivered && (
                    <button
                      onClick={deliveredHandler}
                      disabled={isUpdateDeliverLoading}
                      className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold shadow-lg transition-all duration-200 ${
                        isUpdateDeliverLoading
                          ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transform hover:scale-105"
                      }`}
                    >
                      {isUpdateDeliverLoading ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Updating...
                        </>
                      ) : (
                        <>
                          <FaTruck className="w-5 h-5" />
                          Mark As Delivered
                        </>
                      )}
                    </button>
                  )}

                  {order?.isPaid && order?.isDelivered && (
                    <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-center">
                      <FaCheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                        Order Complete
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                        This order has been paid and delivered
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsPage;