import React from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";

function PersonalContactInfo({ handleContactChange }) {
  return (
    <div className="h-auto w-full ">
      <form className="flex flex-col gap-3 bg-gray-300  my-4 p-5 rounded-md text-gray-700">
        <h1 className="font-semibold text-2xl">Contact Information</h1>
        <TextField
          id="fullName"
          label="Full name"
          variant="outlined"
          required
          onChange={handleContactChange}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          required
          onChange={handleContactChange}
        />
        <TextField
          id="phoneNumber"
          label="Phone Number"
          variant="outlined"
          required
          onChange={handleContactChange}
        />
        <TextField
          id="address"
          label="Address"
          variant="outlined"
          required
          onChange={handleContactChange}
        />
        <TextField
          id="instruction"
          label="Special Instruction (Optional)"
          variant="outlined"
          onChange={handleContactChange}
        />
      </form>
      <Link to="/shop">
        <button
          type="button"
          className="text-center flex items-center justify-center w-full py-2 px-1 text-md text-white font-md bg-green-900 rounded-md hover:bg-green-950 duration-105 transition-all hover:text-yellow-400"
        >
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}

export default PersonalContactInfo;
