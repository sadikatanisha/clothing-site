// src/components/Footer.jsx
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#800f44] text-white py-10 px-6 md:px-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {/* Brand Section */}
        <div>
          <h1 className="text-2xl font-bold">SM CLOTHING</h1>
          <p className="mt-2 text-gray-200">
            Discover fashion that defines you.
          </p>
          <div className="flex space-x-4 mt-4">
            <FaFacebookF className="cursor-pointer text-xl hover:text-gray-300" />
            <FaInstagram className="cursor-pointer text-xl hover:text-gray-300" />
            <FaTwitter className="cursor-pointer text-xl hover:text-gray-300" />
            <FaYoutube className="cursor-pointer text-xl hover:text-gray-300" />
          </div>
        </div>

        {/* Location Section */}
        <div>
          <h1 className="text-lg font-semibold mb-3">LOCATION</h1>
          <p className="text-gray-200">123 Fashion Street, Dhaka, Bangladesh</p>
        </div>

        {/* Links Section */}
        <div>
          <h1 className="text-lg font-semibold mb-3">LINKS</h1>
          <ul className="space-y-2">
            <Link to="/">
              <li className="hover:text-gray-300 cursor-pointer mb-2">Home</li>
            </Link>
            <Link to="/shop">
              <li className="hover:text-gray-300 cursor-pointer mb-2">Shop</li>
            </Link>
            <Link to="/categories">
              <li className="hover:text-gray-300 cursor-pointer mb-2">
                Categories
              </li>
            </Link>
            <Link to="/about">
              <li className="hover:text-gray-300 cursor-pointer mb-2">About</li>
            </Link>
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <h1 className="text-lg font-semibold mb-3">LEGAL</h1>
          <ul className="space-y-2">
            <Link to="/terms-and-conditions">
              <li className="hover:text-gray-300 cursor-pointer mb-2">
                Privacy Policy
              </li>
            </Link>
            <Link to="/terms-and-conditions">
              <li className="hover:text-gray-300 cursor-pointer mb-2">
                Terms of Service
              </li>
            </Link>

            <Link to="/terms-and-conditions">
              <li className="hover:text-gray-300 cursor-pointer mb-2">
                Refund Policy
              </li>
            </Link>
          </ul>
        </div>

        {/* Help Section */}
        <div>
          <h1 className="text-lg font-semibold mb-3">HELP</h1>
          <ul className="space-y-2">
            <li className="hover:text-gray-300 cursor-pointer">FAQs</li>
            <li className="hover:text-gray-300 cursor-pointer">
              Shipping Info
            </li>
            <li className="hover:text-gray-300 cursor-pointer">Returns</li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-300 mt-6 border-t border-gray-500 pt-4">
        &copy; {new Date().getFullYear()} SM CLOTHING. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
