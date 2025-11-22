// src/pages/AdminLoginPage.jsx
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";

import FormContainer from "../../components/FormContainer";
import Meta from "../../components/Meta";
import Footer from "../../components/Footer";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth || {});

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/admin/dashboard";

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      navigate(redirect, { replace: true });
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password, remember }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Login successful");
      navigate(redirect, { replace: true });
    } catch (error) {
      toast.error(error?.data?.message || error?.error || "Login failed");
    }
  };

  return (
    <>
      <Meta title="Admin Sign In" />
      <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 py-12 px-4">
        <FormContainer>
          <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8">
            <h1 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
              Admin Sign In
            </h1>

            <form onSubmit={submitHandler} className="space-y-5">
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
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pr-12 px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-2 flex items-center p-2 text-gray-600 dark:text-gray-300"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="inline-flex items-center text-sm text-gray-700 dark:text-gray-200">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember((r) => !r)}
                    className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-400"
                  />
                  <span className="ml-2">Keep me signed in</span>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition
                    ${isLoading ? "bg-amber-300 cursor-wait text-white" : "bg-amber-500 hover:bg-amber-600 text-white shadow-lg"}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>
          </div>
        </FormContainer>
      </main>

      <Footer />
    </>
  );
};

export default AdminLoginPage;
