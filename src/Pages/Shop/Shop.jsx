import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetAdminProductsQuery } from "../../redux/apiSlice";
import ProductCard from "../../Components/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();

  const params = useMemo(() => new URLSearchParams(search), [search]);
  const initialCategory = params.get("category") || "";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedColor, setSelectedColor] = useState("");
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useGetAdminProductsQuery();

  const visibleProducts = useMemo(() => {
    if (!products) return [];

    return (
      products

        .filter((p) =>
          p.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
        )

        .filter((p) =>
          selectedCategory ? p.category === selectedCategory : true
        )

        .filter((p) =>
          selectedColor
            ? p.availableColors?.some((c) => c.name === selectedColor)
            : true
        )
        // d) Sort final array
        .sort((a, b) => {
          if (sortOption === "priceLowHigh") {
            return (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price);
          }
          if (sortOption === "priceHighLow") {
            return (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price);
          }
          return 0;
        })
    );
  }, [products, searchTerm, selectedCategory, selectedColor, sortOption]);

  const handleCategoryChange = (e) => {
    const newCat = e.target.value;
    setSelectedCategory(newCat);

    if (newCat) {
      navigate(`/shop?category=${encodeURIComponent(newCat)}`, {
        replace: true,
      });
    } else {
      navigate("/shop", { replace: true });
    }
  };

  if (isLoading) {
    return (
      <div className="text-center text-gray-500 py-8">Loading products...</div>
    );
  }
  if (isError) {
    return (
      <div className="text-center text-red-500 py-8">
        {error?.data?.message || "Failed to load products."}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      {/* ─────────────── Filters ─────────────── */}
      <div className="md:col-span-1 space-y-6">
        <h2 className="text-xl font-semibold">Filters</h2>

        {/* Search */}
        <div>
          <label htmlFor="search" className="font-medium">
            Search
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search products..."
            className="w-full mt-1 p-2 border border-gray-100 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="font-medium">Category</label>
          <select
            className="w-full mt-1 p-2 border border-gray-100 rounded"
            value={selectedCategory}
            onChange={handleCategoryChange} // updates URL + state
          >
            <option value="">All</option>
            {[...new Set(products.map((p) => p.category))].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Color Dropdown */}
        <div>
          <label className="font-medium">Color</label>
          <select
            className="w-full mt-1 p-2 border border-gray-100 rounded"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="">All</option>
            {[
              ...new Set(
                products.flatMap(
                  (p) => p.availableColors?.map((c) => c.name) || []
                )
              ),
            ].map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="font-medium">Sort By</label>
          <select
            className="w-full mt-1 p-2 border border-gray-100 rounded"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* ─────────────── Product Grid ─────────────── */}
      <div className="md:col-span-3">
        {visibleProducts.length === 0 ? (
          <div className="text-center text-gray-500">No products found.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-16">
            {visibleProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
