// src/components/ProfileForm.jsx
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Loader from "./Loader";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth || {});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const [updateProfile, { isLoading: isUpdateProfileLoading }] =
    useProfileMutation();

  // Prefill from userInfo when available
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || "");
      setEmail(userInfo.email || "");
    }
  }, [userInfo]);

  const togglePasswordVisibility = () => setShowPassword((s) => !s);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmShowPassword((s) => !s);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        return toast.error("Passwords do not match!");
      }

      const res = await updateProfile({ name, email, password }).unwrap();

      // Update auth state with new credentials (token/user)
      dispatch(setCredentials({ ...res }));

      // Clear password fields only (keep name/email filled for convenience)
      setPassword("");
      setConfirmPassword("");

      toast.success(res.message || "Profile updated");
    } catch (error) {
      toast.error(error?.data?.message || error?.error || error?.message || "Update failed");
    }
  };

  return (
    <form onSubmit={submitHandler} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full pr-12 px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-2 flex items-center p-2 text-gray-600 dark:text-gray-300"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full pr-12 px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            className="absolute inset-y-0 right-2 flex items-center p-2 text-gray-600 dark:text-gray-300"
          >
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isUpdateProfileLoading}
          className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition
            ${isUpdateProfileLoading ? "bg-lime-300 cursor-wait text-white" : "bg-lime-600 hover:bg-lime-700 text-white shadow-md"}`}
        >
          {isUpdateProfileLoading ? (
            <>
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Updating...
            </>
          ) : (
            "Update"
          )}
        </button>
      </div>

      {isUpdateProfileLoading && (
        <div className="mt-3">
          <Loader />
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
