import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "./authSlice";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Product", "Users"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { token: customToken, user: userData } = data;

          // Use the imported auth instance
          const userCredential = await signInWithCustomToken(auth, customToken);
          const idToken = await userCredential.user.getIdToken(true);
          dispatch(setUser({ user: userData, token: idToken }));
        } catch (error) {
          console.error("Signup error:", error);
        }
      },
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted({ email, password }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { token: customToken, user: userData } = data;
          const userCredential = await signInWithCustomToken(auth, customToken);
          const idToken = await userCredential.user.getIdToken(true);
          dispatch(setUser({ user: userData, token: idToken }));
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),

    // USER
    getProductDetails: builder.query({
      query: (id) => `/user/products/${id}`,
    }),

    // ADMIN
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/admin/create-product",
        method: "POST",
        body: formData,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin/update-product/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),
    toggleFeatured: builder.mutation({
      query: ({ featured, id }) => ({
        url: `/admin/products/${id}/toggle-featured`,
        method: "PATCH",
        body: { featured },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/admin/delete-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    getAdminProducts: builder.query({
      query: () => `/admin/`,
      providesTags: (result = [], error, arg) => [
        ...result.map(({ _id }) => ({ type: "Product", id: _id })),
        { type: "Product", id: "LIST" },
      ],
    }),
    // USER
    getAllUsers: builder.query({
      query: () => "/admin/users",
      providesTags: (result = []) => [
        ...result.map((user) => ({ type: "Users", id: user._id })),
        { type: "Users", id: "LIST" },
      ],
    }),
    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/admin/users/${id}/role`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Users", id },
        { type: "Users", id: "LIST" },
      ],
    }),

    // Banner
    getBanner: builder.query({
      query: () => `/admin/get-banner`,
    }),
    getBannerById: builder.query({
      query: (id) => `/admin/get-banner/${id}`,
    }),
    createBanner: builder.mutation({
      query: (formData) => ({
        url: "/admin/create-banner",
        method: "POST",
        body: formData,
      }),
    }),
    updateBanner: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/update-banner/${id}`,
        method: "PATCH",
        body: formData,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  // USER
  useGetProductDetailsQuery,
  // ADMIN product
  useCreateProductMutation,
  useUpdateProductMutation,
  useToggleFeaturedMutation,
  useDeleteProductMutation,
  useGetAdminProductsQuery,
  // Users
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,

  useCreateBannerMutation,
  useUpdateBannerMutation,
  useGetBannerQuery,
  useGetBannerByIdQuery,
} = apiSlice;
