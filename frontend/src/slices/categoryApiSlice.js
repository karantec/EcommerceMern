import { CATEGORY_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: ({ limit, skip, search } = {}) => ({
        url: CATEGORY_URL,
        params: { limit, skip, search },
      }),
      providesTags: ["Category"],
    }),
    getAllCategories: builder.query({
      query: () => ({
        url: `${CATEGORY_URL}/all`,
      }),
      providesTags: ["Category"],
    }),
    getCategoryDetails: builder.query({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
      }),
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation({
      query: (categoryData) => ({
        url: CATEGORY_URL,
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: ({ categoryId, ...categoryData }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        body: { ...categoryData },
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    uploadCategoryImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetAllCategoriesQuery,
  useGetCategoryDetailsQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useUploadCategoryImageMutation,
} = categoryApiSlice;
