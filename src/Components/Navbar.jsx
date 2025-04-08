import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { RxPerson } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import AuthModal from "./AuthModal";
import CartSlider from "./CartSLider";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart);
  const totalQty = cartItems.ids.length;

  const [menuOpen, setMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState(null);
  const [showCart, setShowCart] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const openAuth = (mode) => setAuthMode(mode);
  const closeAuth = () => setAuthMode(null);
  const switchAuthMode = (mode) => setAuthMode(mode);

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
            to="/shop"
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

        {/* Right: Icons */}
        <div className="flex justify-end items-center gap-3.5">
          <Link>
            <IoIosSearch className="text-3xl" />
          </Link>

          {user ? (
            <h1>Profile</h1>
          ) : (
            <button onClick={() => openAuth("login")}>
              <RxPerson className="text-4xl p-2 border rounded-full bg-gray-200" />
            </button>
          )}

          <button className="relative" onClick={() => setShowCart(true)}>
            <IoCartOutline className="text-3xl" />
            {totalQty > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </button>
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
        } bg-white z-30`}
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
            Home
          </NavLink>
        </div>
      </div>

      {/* Backdrop for Cart Slider */}
      {showCart && (
        <div
          className="fixed inset-0 bg-black/20 bg-opacity-40 z-40"
          onClick={() => setShowCart(false)}
        />
      )}

      {/* Cart Slider Drawer */}
      <CartSlider isOpen={showCart} onClose={() => setShowCart(false)} />

      {/* Auth Modal Popup */}
      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={closeAuth}
          onSwitchMode={switchAuthMode}
        />
      )}
    </nav>
  );
};

export default Navbar;
