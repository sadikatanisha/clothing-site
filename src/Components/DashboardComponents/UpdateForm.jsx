import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

// Helper function to generate a slug from the product name

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

const UpdateForm = ({
  initialProduct = {},
  onSubmitData,
  submitButtonText,
}) => {
  const [product, setProduct] = useState({
    name: "",
    slug: "",
    description: "",
    sku: "",
    price: "",
    discountPrice: "",
    category: "",
    brand: "",
    countInStock: "",
    isCustomizable: false,
    featured: false,
    tags: "",
    ...initialProduct,
  });

  // For image uploads
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) =>
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ),
  });

  // Dynamic color inputs: store as an array of objects {name, hex}
  const [colorName, setColorName] = useState("");
  const [colorHex, setColorHex] = useState("");
  const [colors, setColors] = useState(initialProduct.availableColors || []);
  // Dynamic sizes as an array of strings
  const [sizeInput, setSizeInput] = useState("");
  const [sizes, setSizes] = useState(initialProduct.availableSizes || []);

  // When the initialProduct changes, update state accordingly
  useEffect(() => {
    setProduct((prev) => ({
      ...prev,
      ...initialProduct,
    }));
    setColors(initialProduct.availableColors || []);
    setSizes(initialProduct.availableSizes || []);
  }, [initialProduct]);

  // Auto-generate slug if not provided
  useEffect(() => {
    if (product.name && !product.slug) {
      setProduct((prev) => ({ ...prev, slug: generateSlug(prev.name) }));
    }
  }, [product.name, product.slug]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add color with hex value
  const addColor = (e) => {
    e.preventDefault();
    if (
      colorName.trim() &&
      colorHex.trim() &&
      !colors.some(
        (color) =>
          color.name.toLowerCase() === colorName.trim().toLowerCase() &&
          color.hex.toLowerCase() === colorHex.trim().toLowerCase()
      )
    ) {
      setColors([...colors, { name: colorName.trim(), hex: colorHex.trim() }]);
      setColorName("");
      setColorHex("");
    }
  };

  const removeColor = (colorToRemove) => {
    setColors(
      colors.filter(
        (color) =>
          !(
            color.name === colorToRemove.name && color.hex === colorToRemove.hex
          )
      )
    );
  };

  // Add and remove sizes
  const addSize = (e) => {
    e.preventDefault();
    if (sizeInput.trim() && !sizes.includes(sizeInput.trim())) {
      setSizes([...sizes, sizeInput.trim()]);
      setSizeInput("");
    }
  };

  const removeSize = (size) => {
    setSizes(sizes.filter((s) => s !== size));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare updated product data.
    const updatedProduct = {
      ...product,
      // Convert dynamic colors to JSON and sizes to comma-separated string.
      availableColors: JSON.stringify(colors),
      availableSizes: sizes.join(","),
    };

    // Prepare FormData for file uploads.
    const formData = new FormData();
    Object.entries(updatedProduct).forEach(([key, value]) => {
      formData.append(key, value);
    });
    files.forEach((file) => {
      formData.append("images", file);
    });

    onSubmitData(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Basic fields */}
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        className="w-full p-2 border border-gray-200 rounded"
        required
      />
      <input
        type="text"
        name="slug"
        placeholder="Slug"
        value={product.slug}
        onChange={handleChange}
        className="w-full p-2 border border-gray-200 rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        className="w-full p-2 border border-gray-200 rounded"
        rows="4"
        required
      ></textarea>
      <input
        type="text"
        name="sku"
        placeholder="SKU"
        value={product.sku}
        onChange={handleChange}
        className="w-full p-2 border border-gray-200 rounded"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        className="w-full p-2 border border-gray-200 rounded"
        required
      />
      <input
        type="number"
        name="discountPrice"
        placeholder="Discount Price"
        value={product.discountPrice}
        onChange={handleChange}
        className="w-full p-2 border border-gray-200 rounded"
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={product.category}
        onChange={handleChange}
        className="w-full p-2 border border-gray-200 rounded"
        required
      />
      <input
        type="text"
        name="brand"
        placeholder="Brand"
        value={product.brand}
        onChange={handleChange}
        className="w-full p-2 border border-gray-200 rounded"
      />
      <input
        type="number"
        name="countInStock"
        placeholder="Count in Stock"
        value={product.countInStock}
        onChange={handleChange}
        className="w-full p-2 border border-gray-200 rounded"
        required
      />
      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isCustomizable"
            checked={product.isCustomizable}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <span>Customizable</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="featured"
            checked={product.featured}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <span>Featured Product</span>
        </label>
      </div>
      {/* Dynamic Colors */}
      <div>
        <label className="block mb-1 font-medium">Available Colors</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Color Name"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded"
          />
          <input
            type="text"
            placeholder="Hex Value (e.g., #ff0000)"
            value={colorHex}
            onChange={(e) => setColorHex(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded"
          />
          <button
            onClick={addColor}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {colors.map((color, idx) => (
            <div
              key={idx}
              className="bg-gray-200 px-3 py-1 rounded-full flex items-center"
            >
              <span>
                {color.name} ({color.hex})
              </span>
              <button
                type="button"
                onClick={() => removeColor(color)}
                className="ml-1 text-red-500"
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Dynamic Sizes */}
      <div>
        <label className="block mb-1 font-medium">Available Sizes</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter size"
            value={sizeInput}
            onChange={(e) => setSizeInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addSize(e);
            }}
            className="w-full p-2 border border-gray-200 rounded"
          />
          <button
            onClick={addSize}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {sizes.map((size) => (
            <div
              key={size}
              className="bg-gray-200 px-3 py-1 rounded-full flex items-center"
            >
              <span>{size}</span>
              <button
                type="button"
                onClick={() => removeSize(size)}
                className="ml-1 text-red-500"
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Tags */}
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        value={product.tags}
        onChange={handleChange}
        className="w-full p-2 border border-gray-200 rounded"
      />
      {/* Images */}
      <div className="border-dashed border-2 border-gray-300 p-4 rounded">
        <div {...getRootProps()} className="cursor-pointer">
          <input {...getInputProps()} />
          <p className="text-center text-gray-600">
            Drag & drop images here, or click to select files
          </p>
        </div>
        {files.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {files.map((file) => (
              <div key={file.name} className="relative w-24 h-24">
                <img
                  src={file.preview}
                  alt={file.name}
                  className="w-full h-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFiles((currFiles) =>
                      currFiles.filter((f) => f.name !== file.name)
                    );
                  }}
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        {submitButtonText}
      </button>
    </form>
  );
};

export default UpdateForm;
