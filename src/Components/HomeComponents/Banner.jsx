import React from "react";
import { useGetBannerQuery } from "../../redux/apiSlice";

const Banner = () => {
  const { data, isLoading, isError, error } = useGetBannerQuery();

  // Loading & error states
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error?.message || "An error occurred"}</div>;
  }

  // Ensure there is data and at least one banner exists
  if (!data || !data.length) {
    return <div>No banner available</div>;
  }

  const banner = data[0];

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Background Image */}
      <img
        src={banner.image}
        alt="Fashion Model"
        className="absolute w-full h-full object-cover brightness-75"
      />

      {/* Overlay & Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-2xl">
        <h1 className="text-5xl font-bold mb-4 uppercase tracking-wide">
          {banner.header}
        </h1>
        <p className="text-lg mb-6">{banner.subHeader}</p>
        <button className="bg-white text-gray-900 font-semibold py-3 px-6 rounded-full shadow-md hover:bg-gray-200 transition-all">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Banner;
