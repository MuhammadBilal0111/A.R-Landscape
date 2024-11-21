import React from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
function ViewCart() {
  return (
    <div className="px-5 w-full max-w-3xl mx-auto my-8 min-h-screen h-auto">
      <h1 className="font-bold text-2xl mb-4">Shopping Cart</h1>
      <div className="flex justify-between items-center py-1  border-b border-b-green-800 ">
        <div className="h-16 w-18">
          <img
            src="/plant_1.jpg"
            className="w-full h-full object-cover object-center"
            alt="/plant_1.jpg"
            loading="lazy"
          />
        </div>
        <div className="hover:underline text-xl font-semibold">
          <Link to="">
            <h1>Apple Mobile</h1>
          </Link>
        </div>
        <div className="flex items-center">
          <button
            type="button"
            id="decrement-button-5"
            data-input-counter-decrement="counter-input-5"
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md  bg-green-900 focus:outline-none focus:ring-1 focus:ring-green-900 
            hover:bg-green-950 "
          >
            <svg
              className="h-2.5 w-2.5 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <input
            type="text"
            className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
            // value="1"
            required
          />
          <button
            type="button"
            id="increment-button-5"
            data-input-counter-increment="counter-input-5"
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md  bg-green-900 focus:outline-none focus:ring-1 focus:ring-green-900 
            hover:bg-green-950"
          >
            <svg
              className="h-2.5 w-2.5 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
        <h2 className="text-xl font-semibold">200$</h2>
        <MdDelete className="text-red-800 cursor-pointer hover:text-red-900 hover:shadow-xl text-2xl" />
      </div>

      <div className="mt-4 space-y-2 font-semibold">
        <div className="flex justify-between">
          <span className="text-gray-600">Original price</span>
          <span className="text-gray-800">$10,691.00</span>
        </div>

        <div className="flex justify-between font-semibold">
          <span className="text-gray-600">Store Pickup</span>
          <span className="text-gray-800">$99</span>
        </div>

        <div className="flex justify-between font-semibold">
          <span className="text-gray-600">Tax</span>
          <span className=" text-gray-800">$799</span>
        </div>
      </div>

      <div className="mt-4 border-t border-t-green-800 "></div>
      <div class="flex justify-between mt-4">
        <span class="text-lg font-semibold text-gray-800">Total</span>
        <span class="text-lg font-bold text-yellow-500">$11,888.00</span>
      </div>
    </div>
  );
}

export default ViewCart;
