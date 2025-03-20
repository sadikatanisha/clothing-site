import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { RxPerson } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="sticky top-0 w-full px-10 py-4 z-30 bg-white text-black border-b-2 border-gray-200">
      {/* Desktop Navbar */}
      <div className="hidden lg:flex items-center">
        {/* Left: Logo */}
        <div className="flex justify-start">
          <NavLink to="/">
            <h1>SM CLOTHING</h1>
          </NavLink>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex-1 flex justify-center gap-10 items-center text-lg">
          <NavLink
            to="/"
            className="hover:text-[#D98581] transition duration-300"
          >
            Home
          </NavLink>
          <NavLink
            to="/"
            className="hover:text-[#D98581] transition duration-300"
          >
            All Products
          </NavLink>
          <NavLink
            to="/"
            className="hover:text-[#D98581] transition duration-300"
          >
            Categories
          </NavLink>
          <NavLink
            to="/"
            className="hover:text-[#D98581] transition duration-300"
          >
            Offer
          </NavLink>
          <NavLink
            to="/"
            className="hover:text-[#D98581] transition duration-300"
          >
            Customize
          </NavLink>
        </div>

        {/* Right: Contact Button */}
        <div className="flex justify-end items-center gap-3.5">
          <Link>
            <IoIosSearch className="text-3xl " />
          </Link>
          <Link>
            <RxPerson className="text-4xl p-2 border rounded-full bg-gray-200" />
          </Link>

          <Link>
            <IoCartOutline className="text-3xl" />
          </Link>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex lg:hidden items-center justify-between">
        <div>
          <NavLink to="/">
            <h1>SM CLOTHING</h1>
          </NavLink>
        </div>
        <div className="text-2xl cursor-pointer" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full shadow-lg transform transition-transform duration-500 lg:hidden ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        } bg-white`}
      >
        <div className="flex justify-end p-4">
          <FaTimes
            className="text-2xl cursor-pointer text-black mr-2"
            onClick={toggleMenu}
          />
        </div>
        <div className="flex flex-col items-center space-y-6 pb-6 text-lg">
          <NavLink
            onClick={toggleMenu}
            to="/"
            className="hover:text-[#D98581] text-black"
          >
            Services
          </NavLink>
          <NavLink
            onClick={toggleMenu}
            to="/"
            className="hover:text-[#D98581] text-black"
          >
            Home
          </NavLink>
          <NavLink
            onClick={toggleMenu}
            to="/="
            className="hover:text-[#D98581] text-black"
          >
            About Us
          </NavLink>
          <NavLink
            onClick={toggleMenu}
            to="/"
            className="hover:text-[#D98581] text-black"
          >
            Contact
          </NavLink>
          <NavLink
            onClick={toggleMenu}
            to="/impressum-and-datenschutz"
            className="hover:text-[#D98581] text-black"
          >
            Terms& C
          </NavLink>
          <div>
            <Link
              className="px-6 py-2 font-semibold text-lg rounded-full transition duration-300 bg-black text-white hover:bg-gray-100 hover:text-black"
              to="/"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
