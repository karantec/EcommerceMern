// src/pages/ResetPasswordRequestPage.jsx
import React, { useState } from "react";
import { useNewPasswordRequestMutation } from "../slices/usersApiSlice";
import FormContainer from "../components/FormContainer";
import Meta from "../components/Meta";
import Message from "../components/Message";
import { toast } from "react-toastify";

const ResetPasswordRequestPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [requestNewPassword, { isLoading }] = useNewPasswordRequestMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await requestNewPassword({ email }).unwrap();
      setMessage(res.message);
      setEmail("");
    } catch (error) {
      toast.error(error?.data?.message || error?.error || "Something went wrong");
    }
  };

  return (
    <FormContainer>
      <Meta title="Request New Password" />
      <div className="max-w-xl w-full bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-lg p-8 sm:p-10 mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Request New Password
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Enter the email associated with your account and we'll send instructions to reset your password.
          </p>
        </header>

        {message && (
          <div className="mb-4">
            <Message variant="success">{message}</Message>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold shadow-md
                ${isLoading ? "bg-lime-400 cursor-wait" : "bg-lime-600 hover:bg-lime-700"}
                text-white transition`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              Remembered your password?{" "}
              <a href="/login" className="text-lime-600 hover:text-lime-700 font-medium">
                Sign in
              </a>
            </p>
          </div>
        </form>

        {/* Helpful footer note */}
        <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
          <p>
            If you don't receive an email within a few minutes, check your spam folder or contact support.
          </p>
        </div>
      </div>
    </FormContainer>
  );
};

export default ResetPasswordRequestPage;
