import React from "react";

const Banner = () => {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.pexels.com/photos/25185004/pexels-photo-25185004/free-photo-of-model-in-traditional-blue-dress-with-embroidery-and-scarf.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Fashion Model"
        className="absolute w-full h-full object-cover brightness-75"
      />

      {/* Overlay & Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-2xl">
        <h1 className="text-5xl font-bold mb-4 uppercase tracking-wide">
          Elevate Your Style
        </h1>
        <p className="text-lg mb-6">
          Discover timeless fashion pieces that redefine elegance & confidence.
        </p>
        <button className="bg-white text-gray-900 font-semibold py-3 px-6 rounded-full shadow-md hover:bg-gray-200 transition-all">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Banner;
