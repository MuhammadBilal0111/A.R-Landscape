import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa6";

function AddToCart() {
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState("");
  const incrementCounter = (e) => {
    setQuantity(quantity + 1);
  };
  const decrementCounter = (e) => {
    if (quantity === 0) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="mt-28">
      <div className="min-h-screen h-auto flex flex-col lg:flex-row justify-center max-w-7xl mx-auto px-5 mb-7 gap-8 ">
        <div className="flex flex-col gap-8 lg:w-1/2">
          <div className="h-[400px] w-full overflow-hidden  bg-red-900">
            <img
              src={image}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div
            className="gap-5 flex flex-wrap lg:flex-row items-center justify-center"
            onClick={(e) => {
              setImage(e.target.getAttribute("src"));
            }}
          >
            <div className="w-full md:h-40 md:w-48 cursor-pointer">
              <img
                src="/plant_5.jpg"
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div
              className="w-full md:h-40 md:w-48 cursor-pointer"
              onClick={(e) => {
                setImage(e.target.getAttribute("src"));
              }}
            >
              <img
                src="/plant_4.jpg"
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div
              className="w-full md:h-40 md:w-48 cursor-pointer"
              onClick={(e) => {
                setImage(e.target.getAttribute("src"));
              }}
            >
              <img
                src="/plant_3.jpg"
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 w-full">
          <h1 className="font-bold text-3xl md:text-6xl mb-5">Snake Plant</h1>
          <h2 className="font-semibold text-xl md:text-3xl text-gray-700 mb-3">
            Deal of the day: <span className="text-yellow-500">15.99 $</span>
          </h2>
          <p className="text-gray-700 text-md">
            A hardy indoor plant that requires minimal care.
          </p>

          <div className="flex items-center me-4 border-b-2 mb-4 border-green-600">
            <input
              type="radio"
              name="method"
              id="method"
              className="cursor-pointer w-4 h-4"
              checked
            />
            <label htmlFor="method">
              <div className="flex items-center ">
                <img src="/cod.png" alt="" className="w-32 h-20" />
                <h1 className="text-red-500 font-medium">
                  Get your greens delivered with ease—order now!!
                </h1>
              </div>
            </label>
          </div>
          <div className="mb-6">
            <p className="text-sm mb-3 text-gray-700 font-semibold">
              Choose quantity:
            </p>
            <div className="flex gap-4 items-center">
              <button
                className="text-white bg-[#A1DD70] p-2 rounded-full focus:ring-[#A1DD70] focus:ring-4 hover:scale-105 duration-75 hover:bg-green-800 transition-all"
                onClick={decrementCounter}
              >
                <FaMinus />
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                className="text-white bg-[#A1DD70] p-2 rounded-full focus:ring-[#A1DD70] focus:ring-4 hover:scale-105 duration-75 hover:bg-green-800 transition-all"
                onClick={incrementCounter}
              >
                <FaPlus />
              </button>
            </div>
          </div>
          <Link to="/">
            <button
              type="button"
              class="w-full focus:outline-none  bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300  rounded-lg  px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 text-yellow-300 text-md"
            >
              Add to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
