// src/components/Customize.jsx
import React from "react";
import { FaTools } from "react-icons/fa";

const Customize = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
      {/* Pulsing wrench icon */}
      <FaTools className="text-6xl text-[#800f2f] animate-pulse mb-6" />

      {/* Main heading */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
        Coming Soon
      </h1>

      {/* Subtext */}
      <p className="text-lg text-gray-600 text-center max-w-md">
        Our customization suite is currently under construction. Check back soon
        to design your own unique pieces!
      </p>
    </div>
  );
};

export default Customize;
