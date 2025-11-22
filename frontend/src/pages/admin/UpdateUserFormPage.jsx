// src/pages/Admin/UpdateUserFormPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useUpdateUserMutation,
  useGetUserByIdQuery,
} from "../../slices/usersApiSlice";

import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Meta from "../../components/Meta";

const UpdateUserFormPage = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { data: user, isLoading, error } = useGetUserByIdQuery(userId);

  const [updateUser, { isLoading: isUpdateUserLoading }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setIsAdmin(Boolean(user.isAdmin));
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const userData = { name, email, isAdmin };
      const { data } = await updateUser({ userId, ...userData }).unwrap();
      toast.success(data?.message || "User updated");
      navigate("/admin/user-list");
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "Update failed");
    }
  };

  const loadingAny = isLoading || isUpdateUserLoading;

  return (
    <>
      <Meta title="User Update Form" />

      <div className="max-w-3xl mx-auto px-4 py-6">
        <Link
          to="/admin/user-list"
          className="inline-block mb-4 text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-3 py-2 rounded-lg shadow-sm hover:shadow-md text-slate-800 dark:text-slate-100"
        >
          ← Go Back
        </Link>

        {loadingAny && (
          <div className="mb-4">
            <Loader />
          </div>
        )}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="mb-4">
            <Message variant="danger">{error?.data?.message || error?.error || "Failed to load user"}</Message>
          </div>
        ) : (
          <FormContainer>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6 sm:p-8">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Update User
              </h1>

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
                    placeholder="Full name"
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

                <div className="flex items-center gap-3">
                  <input
                    id="isAdmin"
                    type="checkbox"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-lime-600 focus:ring-lime-500"
                  />
                  <label htmlFor="isAdmin" className="text-sm text-gray-700 dark:text-gray-200">
                    Is Admin
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isUpdateUserLoading}
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition
                      ${isUpdateUserLoading ? "bg-lime-300 cursor-wait text-white" : "bg-lime-600 hover:bg-lime-700 text-white shadow-md"}`}
                  >
                    {isUpdateUserLoading ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </FormContainer>
        )}
      </div>
    </>
  );
};

export default UpdateUserFormPage;
