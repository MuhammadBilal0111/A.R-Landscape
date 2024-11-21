import React from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";

function PersonalContactInfo() {
  return (
    <div className="h-auto w-full ">
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
          className="text-center flex items-center justify-center w-full py-2 px-1 text-md text-white font-md bg-green-900 rounded-md hover:bg-green-950 duration-105 transition-all"
          // onClick={handleAddToCart}
        >
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}

export default PersonalContactInfo;
