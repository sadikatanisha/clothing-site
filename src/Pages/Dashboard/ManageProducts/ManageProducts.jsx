import React, { useState } from "react";
import {
  useGetAdminProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../../../redux/apiSlice";
import UpdateForm from "../../../Components/DashboardComponents/UpdateForm";

const ManageProducts = () => {
  const { data, isLoading, isError, error, refetch } =
    useGetAdminProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [editingProduct, setEditingProduct] = useState(null);

  if (isLoading)
    return <div className="p-6 text-center">Loading products...</div>;
  if (isError)
    return (
      <div className="p-6 text-center text-red-500">
        Error: {error?.data?.message || error.message}
      </div>
    );

  // Assuming API returns an array directly or within a "products" property
  const products = Array.isArray(data) ? data : data.products || [];

  // Delete handler
  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId).unwrap();
        console.log("Product deleted:", productId);
      } catch (err) {
        console.error("Failed to delete product:", err);
      }
    }
  };

  // Edit handler
  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  // Update handler for the update form
  const handleUpdate = async (formData) => {
    try {
      await updateProduct({ id: editingProduct._id, data: formData }).unwrap();
      console.log("Product updated");
      setEditingProduct(null);
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  // Toggle the featured flag inline using a custom toggle switch
  const handleToggleFeatured = async (product) => {
    try {
      await updateProduct({
        id: product._id,
        data: { featured: !product.featured },
      }).unwrap();
      console.log("Featured status updated for:", product._id, data);
      refetch();
    } catch (err) {
      console.error("Failed to update featured status", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        // List view for products
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex items-center bg-white p-4 rounded shadow border border-gray-100"
            >
              {/* Thumbnail */}
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="w-16 h-16 object-cover rounded mr-4"
              />
              {/* Details */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600">
                  {product.description.length > 60
                    ? `${product.description.substring(0, 60)}...`
                    : product.description}
                </p>
                <div className="mt-1 text-green-600 font-bold">
                  {product.discountPrice ? (
                    <>
                      <span className="line-through text-gray-400">
                        ৳{product.price}
                      </span>{" "}
                      <span className="text-red-500">
                        ৳{product.discountPrice}
                      </span>
                    </>
                  ) : (
                    `৳${product.price}`
                  )}
                </div>
              </div>
              {/* Inline Controls */}
              <div className="flex items-center space-x-4">
                {/* Featured Toggle */}
                <div className="flex flex-col items-center">
                  <span className="text-sm mb-1">Featured</span>
                  <div
                    onClick={() => handleToggleFeatured(product)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      product.featured ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        product.featured ? "translate-x-6" : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                </div>
                {/* Quantity Display */}
                <div className="flex flex-col items-center">
                  <span className="text-sm mb-1">Quantity</span>
                  <p className="w-16 border border-gray-100 rounded p-1 text-center">
                    {product.countInStock}
                  </p>
                </div>
                {/* Actions */}
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingProduct && (
        <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative m-6">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setEditingProduct(null)}
            >
              ✖
            </button>
            <h2 className="text-2xl font-semibold text-center mb-6">
              Update Product
            </h2>
            <UpdateForm
              initialProduct={editingProduct}
              onSubmitData={handleUpdate}
              submitButtonText="Update Product"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
