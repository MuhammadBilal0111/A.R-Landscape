import React, { useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const role = useSelector((state) => state?.user?.currentUser?.userInfo?.role);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerLinksRef = useRef(null);
  const location = useLocation();

  // Get items from Redux store

  // Active link checker
  const isActive = (path) => location.pathname === path;

  // GSAP animation for menu links
  useGSAP(() => {
    if (!isMenuOpen) return;
    gsap.from(headerLinksRef.current.children, {
      x: -150,
      duration: 0.5,
      ease: "power4.out",
      stagger: 0.1,
    });
  }, [isMenuOpen]);

  // Toggle menu visibility
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      {/* Header */}
      <header className="w-full h-16 flex justify-between items-center px-4 bg-green-900 border-b border-slate-600">
        {/* Logo */}
        <div className="flex items-center gap-x-3">
          <Link to="/">
            <div className="flex items-center gap-2">
              <div className="h-14 w-14 rounded-full overflow-hidden">
                <img
                  src="./plant_logo.png"
                  alt="A.R Landscape Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = "/fallbacklogo.jpg"; // Fallback image URL
                  }}
                />
              </div>
              <span className="text-2xl font-bold text-yellow-300">
                A.R Landscape
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:block">
          <ul className="flex gap-x-8 font-semibold text-white">
            <li
              className={
                isActive("/") ? "text-yellow-500" : "hover:text-gray-400"
              }
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className={
                isActive("/shop") ? "text-yellow-500" : "hover:text-gray-400"
              }
            >
              <Link to="/shop">Shop</Link>
            </li>
            <li
              className={
                isActive("/services")
                  ? "text-yellow-500"
                  : "hover:text-gray-400"
              }
            >
              <Link to="/services">Services</Link>
            </li>
            <li className="relative">
              <Link to="/cart">
                <MdOutlineShoppingBag className="text-3xl" />
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </div>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden">
          {!isMenuOpen ? (
            <IoMenu
              className="text-3xl text-white cursor-pointer"
              onClick={toggleMenu}
            />
          ) : (
            <RxCross2
              className="text-3xl text-white cursor-pointer"
              onClick={toggleMenu}
            />
          )}
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="w-full bg-green-900 text-white sm:hidden">
          <ul ref={headerLinksRef} className="flex flex-col gap-y-2 p-4">
            <li
              onClick={toggleMenu}
              className={
                isActive("/") ? "text-yellow-500" : "hover:text-gray-400"
              }
            >
              <Link to="/">Home</Link>
            </li>
            <li
              onClick={toggleMenu}
              className={
                isActive("/shop") ? "text-yellow-500" : "hover:text-gray-400"
              }
            >
              <Link to="/shop">Shop</Link>
            </li>
            <li
              onClick={toggleMenu}
              className={
                isActive("/services")
                  ? "text-yellow-500"
                  : "hover:text-gray-400"
              }
            >
              <Link to="/services">Services</Link>
            </li>
            {role && role === "admin" && (
              <li
                onClick={toggleMenu}
                className={
                  isActive("/dashboard")
                    ? "text-yellow-500"
                    : "hover:text-gray-400"
                }
              >
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
            <li onClick={toggleMenu} className="py-2 hover:text-gray-400">
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Header;
