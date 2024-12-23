import React, { useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { signOutSuccess, signOutFailure } from "../store/userSlice";
import { signOut } from "../services/GlobalApi";
import { ToastSuccess } from "./Toast";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart.items);
  const role = useSelector((state) => state?.user?.currentUser?.userInfo?.role);
  console.log(role);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [signout, setSignOut] = useState(null);
  const headerLinksRef = useRef(null);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const res = await signOut(currentUser.userInfo._id);
      dispatch(signOutSuccess());
      ToastSuccess("Log out successfully!");
      navigate("/sign-up");
    } catch (err) {
      setSignOut(err.message);
      dispatch(signOutFailure(err.message));
    }
  };
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
            <h1 className="text-2xl font-bold text-yellow-300 flex items-center gap-2">
              <img
                src="./plant_logo.png"
                alt="A. R Landscape Logo"
                className="h-14 w-14"
              />
              <span>A. R Landscape</span>
            </h1>
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
            {role && role === "admin" && (
              <li
                className={
                  isActive("/dashboard")
                    ? "text-yellow-500"
                    : "hover:text-gray-400"
                }
              >
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
            {currentUser ? (
              <li
                className={
                  isActive("/logout")
                    ? "text-yellow-500"
                    : "hover:text-gray-400"
                }
              >
                <button onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <li
                className={
                  isActive("/sign-up")
                    ? "text-yellow-500"
                    : "hover:text-gray-400"
                }
              >
                <Link to="/sign-up">Get Started</Link>
              </li>
            )}
            {currentUser && (
              <li className="relative">
                <Link to="/cart">
                  <MdOutlineShoppingBag className="text-3xl" />
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </div>
                </Link>
              </li>
            )}
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
            <li
              onClick={toggleMenu}
              className={
                isActive("/logout") ? "text-yellow-500" : "hover:text-gray-400"
              }
            >
              <button onClick={handleLogout}>Logout</button>
            </li>

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
