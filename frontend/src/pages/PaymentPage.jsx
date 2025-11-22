// src/pages/Payment.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { savePaymentMethod } from "../slices/cartSlice";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import Meta from "../components/Meta";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useSelector((state) => state.cart || {});

  useEffect(() => {
    if (!shippingAddress || Object.keys(shippingAddress).length === 0) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/place-order");
  };

  return (
    <FormContainer>
      <Meta title="Payment Method" />
      <div className="max-w-xl w-full mx-auto">
        <CheckoutSteps step1 step2 step3 />

        <div className="bg-white/95 dark:bg-slate-800/90 rounded-2xl shadow-lg p-6 sm:p-8 mt-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
            Payment Method
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Choose your preferred payment method.
          </p>

          <form onSubmit={submitHandler} className="space-y-6">
            <fieldset>
              <legend className="sr-only">Select payment method</legend>

              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 cursor-pointer hover:shadow-sm transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Razorpay"
                    checked={paymentMethod === "Razorpay"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-lime-600 focus:ring-lime-500"
                    aria-label="Razorpay"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Razorpay</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Fast and secure UPI / card payments</div>
                  </div>
                </label>

                {/* Example: add more methods later */}
                {/* <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 cursor-pointer hover:shadow-sm transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-lime-600 focus:ring-lime-500"
                    aria-label="Cash on Delivery"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Cash on Delivery</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Pay when your order arrives</div>
                  </div>
                </label> */}
              </div>
            </fieldset>

            <div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-lime-600 hover:bg-lime-700 text-white shadow-md transition"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </FormContainer>
  );
};

export default Payment;
