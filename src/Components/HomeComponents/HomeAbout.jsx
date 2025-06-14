import React from "react";
import { Link } from "react-router-dom";

const HomeAbout = () => {
  return (
    <div className="px-4 sm:px-10 py-10">
      <div className="bg-gray-100 flex flex-col lg:flex-row gap-6 items-center justify-between rounded-lg p-6">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <img
            src="https://images.pexels.com/photos/25184955/pexels-photo-25184955/free-photo-of-model-in-a-purple-dress-with-a-scarf-over-her-shoulder.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="rounded-lg w-full object-cover"
            alt="Unique Clothing Piece"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 uppercase tracking-tight text-gray-900">
            Discover <span className="text-[#800f44]">One-of-a-Kind</span> Style
          </h2>
          <p className="text-gray-700 mb-4 text-base">
            Every piece is handcrafted, so you’re guaranteed an exclusive look.
          </p>
          <div className="border-b-2 border-gray-200 my-4"></div>
          <Link
            to="/shop"
            className="inline-block bg-[#800f44] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#661133] transition"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;
