// src/pages/PlaceOrderPage.jsx
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { toast } from "react-toastify";

import Loader from "../components/Loader";
import CheckoutSteps from "../components/CheckoutSteps";
import Meta from "../components/Meta";
import { addCurrency } from "../utils/addCurrency";

const PlaceOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    cartItems = [],
    shippingAddress,
    paymentMethod,
    itemsPrice = 0,
    taxPrice = 0,
    shippingPrice = 0,
    totalPrice = 0,
  } = useSelector((state) => state.cart || {});

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    if (!shippingAddress || Object.keys(shippingAddress).length === 0) {
      navigate("/shipping");
    }
    if (!paymentMethod) {
      navigate("/payment");
    }
  }, [shippingAddress, paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error?.data?.message || error?.error || "Failed to place order");
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Meta title="Place Order" />

      {isLoading && (
        <div className="my-6">
          <Loader />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        {/* Left: Order details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Shipping</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium text-gray-800 dark:text-gray-200">Address: </span>
              {shippingAddress?.address}, {shippingAddress?.city}, {shippingAddress?.postalCode},{" "}
              {shippingAddress?.country}
            </p>
          </div>

          {/* Payment */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Payment Method</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium text-gray-800 dark:text-gray-200">Method: </span>
              {paymentMethod}
            </p>
          </div>

          {/* Items */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Order Items</h2>

            {cartItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">Your cart is empty</div>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li key={item._id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-100 dark:border-slate-700"
                    />
                    <div className="flex-1">
                      <Link
                        to={`/product/${item._id}`}
                        className="block text-sm font-medium text-gray-900 dark:text-gray-100 hover:underline"
                      >
                        {item.name}
                      </Link>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {item.qty} x {addCurrency(item.price)} = <span className="font-medium">{addCurrency(item.qty * item.price)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right: Summary */}
        <aside className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Order Summary</h2>

          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex justify-between">
              <span>Items:</span>
              <span className="font-medium">{addCurrency(Number(itemsPrice))}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span className="font-medium">{addCurrency(Number(shippingPrice))}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span className="font-medium">{addCurrency(Number(taxPrice))}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-gray-100 pt-2 border-t border-gray-100 dark:border-slate-700">
              <span>Total:</span>
              <span>{addCurrency(Number(totalPrice))}</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={placeOrderHandler}
              disabled={cartItems.length === 0 || isLoading}
              className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition
                ${cartItems.length === 0 || isLoading ? "bg-lime-300 cursor-not-allowed text-white" : "bg-lime-600 hover:bg-lime-700 text-white shadow-md"}`}
            >
              {isLoading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Placing...
                </>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </aside>
      </div>
    </>
  );
};

export default PlaceOrderPage;
