import React from "react";
import { TextField } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
function PersonalContactInfo() {
  return (
    <div className="my-8 min-h-screen h-auto">
      <div className="flex items-center gap-2 text-4xl text-gray-700">
        <FaArrowLeft className="cursor-pointer" />
        <h1 className="font-semibold ">Place Your Order</h1>
      </div>
      <div className="flex flex-col gap-3 bg-gray-300  my-4 p-5 rounded-md text-gray-700">
        <h1 className="font-semibold text-2xl">Contact Information</h1>
        <TextField id="outlined-basic" label="Full name" variant="outlined" />
        <TextField id="outlined-basic" label="Email" variant="outlined" />
        <TextField
          id="outlined-basic"
          label="Phone Number"
          variant="outlined"
        />
        <TextField id="outlined-basic" label="Address" variant="outlined" />
        <TextField
          id="outlined-basic"
          label="Special Instruction"
          variant="outlined"
        />
      </div>
      <Link to="/">
        <button
          type="button"
          className="w-full focus:outline-none  bg-green-800 hover:bg-green-900 focus:ring-2 focus:ring-green-900  rounded-md  px-5 py-2.5 me-2 mb-2 dark:bg-green-800 dark:hover:bg-green-900 text-white text-md transition all duration-100"
          // onClick={handleAddToCart}
        >
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}

export default PersonalContactInfo;
