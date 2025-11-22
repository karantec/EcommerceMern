// src/pages/Admin/ProductFormPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useCreateProductMutation,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";

import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Meta from "../../components/Meta";

const ProductFormPage = () => {
  const { id: productId } = useParams();
  const isUpdateMode = !!productId;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");

  const fileInputRef = useRef(null);
  const readerRef = useRef(null);

  const getProductQueryResult = useGetProductDetailsQuery(productId);
  const { data: product, isLoading, error } = isUpdateMode
    ? getProductQueryResult
    : { data: null, isLoading: false, error: null };

  const [createProduct, { isLoading: isCreateProductLoading }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdateProductLoading }] =
    useUpdateProductMutation();
  const [uploadProductImage, { isLoading: isUploadImageLoading }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  // populate form when editing
  useEffect(() => {
    if (isUpdateMode && product) {
      setName(product.name || "");
      setImage(product.image || "");
      setImagePreview(product.image || "");
      setDescription(product.description || "");
      setBrand(product.brand || "");
      setCategory(product.category || "");
      setPrice(product.price != null ? String(product.price) : "");
      setCountInStock(
        product.countInStock != null ? String(product.countInStock) : ""
      );
    }

    // cleanup on unmount: abort any active FileReader
    return () => {
      if (readerRef.current && typeof readerRef.current.abort === "function") {
        try {
          readerRef.current.abort();
        } catch (e) {
          /* ignore */
        }
      }
    };
  }, [isUpdateMode, product]);

  const uploadFileHandler = async (e) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    // show local preview via FileReader (safe usage)
    const reader = new FileReader();
    readerRef.current = reader;
    reader.onload = (ev) => setImagePreview(ev.target?.result || "");
    reader.onerror = () => {
      toast.error("Failed to read the image file for preview.");
      setImagePreview("");
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      // Accept multiple possible shapes from server
      const imageUrl = res?.imageUrl || res?.image || "";
      if (!imageUrl) {
        toast.warn("Image uploaded but server didn't return a URL.");
      }
      setImage(imageUrl);
      toast.success(res?.message || "Image uploaded");
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "Image upload failed");
      // fallback: keep local preview, but clear image URL
      setImage("");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // basic front-end validation
    if (!name.trim()) {
      toast.error("Product name is required.");
      return;
    }
    if (!price && price !== 0 && price !== "0") {
      toast.error("Price is required.");
      return;
    }
    if (!image) {
      toast.error("Please upload an image for the product.");
      return;
    }

    try {
      const productData = {
        name: name.trim(),
        image,
        description: description.trim(),
        brand: brand.trim(),
        category: category.trim(),
        price: Number(price) || 0,
        countInStock: Number(countInStock) || 0,
      };

      if (isUpdateMode) {
        const { data } = await updateProduct({ productId, ...productData }).unwrap();
        toast.success(data?.message || "Product updated");
      } else {
        const { data } = await createProduct(productData).unwrap();
        toast.success(data?.message || "Product created");
      }

      navigate("/admin/product-list");
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "Operation failed");
    }
  };

  const loadingAny =
    isLoading || isCreateProductLoading || isUpdateProductLoading || isUploadImageLoading;

  return (
    <>
      <Meta title="Product Form" />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Link
          to="/admin/product-list"
          className="inline-block text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-3 py-2 rounded-lg shadow-sm hover:shadow-md"
        >
          ← Go Back
        </Link>

        {loadingAny && (
          <div className="my-6">
            <Loader />
          </div>
        )}

        {isLoading ? (
          <div className="my-6">
            <Loader />
          </div>
        ) : error ? (
          <div className="my-6">
            <Message variant="danger">{error?.data?.message || error?.error || "Failed to load product"}</Message>
          </div>
        ) : (
          <FormContainer>
            <div className="w-full bg-white dark:bg-slate-800 rounded-2xl shadow p-6 sm:p-8">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {isUpdateMode ? "Update Product" : "Create Product"}
              </h1>

              <form onSubmit={submitHandler} className="space-y-5">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
                  />
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
                  />
                </div>

                {/* Image upload + preview */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Image</label>

                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-lime-600 hover:bg-lime-700 text-white">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={uploadFileHandler}
                        className="hidden"
                      />
                      Upload Image
                    </label>

                    {imagePreview ? (
                      <div className="w-28 h-28 rounded-md overflow-hidden border border-gray-200 dark:border-slate-700">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    ) : image ? (
                      <div className="w-28 h-28 rounded-md overflow-hidden border border-gray-200 dark:border-slate-700">
                        <img src={image} alt="Image" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-28 h-28 rounded-md flex items-center justify-center bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-sm text-gray-500">
                        No image
                      </div>
                    )}
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <label htmlFor="brand" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Brand
                  </label>
                  <input
                    id="brand"
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Brand"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
                  />
                </div>

                {/* Count In Stock */}
                <div>
                  <label htmlFor="countInStock" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Count In Stock
                  </label>
                  <input
                    id="countInStock"
                    type="number"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Category
                  </label>
                  <input
                    id="category"
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short description..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 transition"
                  />
                </div>

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    disabled={isCreateProductLoading || isUpdateProductLoading || isUploadImageLoading}
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition
                      ${isCreateProductLoading || isUpdateProductLoading || isUploadImageLoading
                        ? "bg-lime-300 cursor-wait text-white"
                        : "bg-lime-600 hover:bg-lime-700 text-white shadow-md"}`}
                  >
                    {isUpdateMode ? "Update Product" : "Create Product"}
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

export default ProductFormPage;
