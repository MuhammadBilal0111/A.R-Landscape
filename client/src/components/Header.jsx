import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const headerLinks = useRef(null);
  const items = useSelector((state) => state.cart.items);
  const { role } = useSelector((state) => state.user.currentUser.userInfo);
  const isActive = (path) => {
    return location.pathname === path;
  };

  useGSAP(() => {
    if (!toggle) return;
    gsap.from(headerLinks.current.children, {
      x: -150,
      duration: 2,
      ease: "power4.out",
      stagger: 0.1,
    });
  }, [toggle]);

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <header className="w-full h-16 mx-auto flex flex-col justify-between items-center  px-1 border-b bg-green-900 border-slate-600">
        <div className="w-full h-full flex justify-between items-center ">
          <div className="flex gap-x-3 ml-5 items-center ">
            <Link to={"/"}>
              <h1 className="text-2xl font-bold max-md:text-xl  text-yellow-300 transition-all duration-150 ease-linear flex gap-2 items-center">
                <div className="h-14 w-14">
                  <img
                    src="./plant_logo.png"
                    alt="A. R Landscape Logo"
                    className="h-full w-full"
                  />
                </div>
                <span>A. R Landscape</span>
              </h1>
            </Link>
          </div>
          <nav className="mr-5 max-sm:hidden">
            <ul className="flex gap-x-12 font-semibold pt-2 max-lg:gap-x-10 text-[1rem] mr-2  ">
              <li
                className={`${isActive("/") ? "text-yellow-500" : "text-white"} transition-all duration-200 ease-linear`}
              >
                <Link to="/">Home</Link>
              </li>
              <li
                className={`${isActive("/shop") ? "text-yellow-500" : "text-white"} transition-all duration-200 ease-linear`}
              >
                <Link to="/shop">Shop</Link>
              </li>
              <li
                className={`${isActive("/services") ? "text-yellow-500" : "text-white"} transition-all duration-200 ease-linear`}
              >
                <Link to="/services">Services</Link>
              </li>
              {role === "admin" ? (
                <li
                  className={`${isActive("/dashboard") ? "text-yellow-500" : "text-white"} transition-all duration-200 ease-linear`}
                >
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              ) : null}
              <li className="relative hover:text-slate-300 text-white transition-all duration-200 ease-linear">
                <Link to="/cart">
                  <MdOutlineShoppingBag className="sm:text-3xl lg:text-3xl pb-1 cursor-pointer" />
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {items.length}
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="sm:hidden">
            {!toggle ? (
              <IoMenu
                className="text-[35px] mr-5 text-white cursor-pointer"
                onClick={toggleMenu}
              />
            ) : (
              <RxCross2
                className="text-[35px] mr-5 rotate-360 text-white cursor-pointer"
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>
      </header>

      {toggle && (
        <div className="w-full bg-green-900 flex flex-col transition-all duration-1000 ease-in-out sm:hidden">
          <nav>
            <ul
              className="flex flex-col gap-y-2 font-bold py-3 text-white "
              ref={headerLinks}
            >
              <li className="hover:text-slate-500 border-b-2 px-7 py-3">
                <Link to="/" onClick={toggleMenu}>
                  Home
                </Link>
              </li>
              <li className="hover:text-slate-500 border-b-2 px-7 py-3">
                <Link to="/menu" onClick={toggleMenu}>
                  Menu
                </Link>
              </li>
              <li className="hover:text-slate-500 border-b-2 px-7 py-3">
                <Link to="/dashboard" onClick={toggleMenu}>
                  Dashboard
                </Link>
              </li>
              <li className="hover:text-slate-500  px-7 py-3">
                <Link to="/cart" onClick={toggleMenu}>
                  Cart
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
