import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { provincePrices } from "../../../utils/constant";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setShippingCost } from "../../../store/cartSlice";

function PersonalContactInfo({ handleContactChange, orderDetails }) {
  const dispatch = useDispatch();
  const { shippingCost } = useSelector((state) => state.cart);

  const [item, setItem] = useState(shippingCost); // by default sidh will be selected

  const handleShippingCost = (e) => {
    setItem(e.target.value);
    dispatch(setShippingCost(e.target.value));
  };
  return (
    <div className="flex flex-col h-auto w-full">
      <form className="flex flex-col gap-3 bg-gray-300  my-4 p-5 rounded-md text-gray-700">
        <h1 className="font-semibold text-2xl">Contact Information</h1>
        <TextField
          id="username"
          label="Full name"
          variant="outlined"
          value={orderDetails?.username}
          required
          onChange={handleContactChange}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={orderDetails?.email}
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
        <div className="">
          <h1 className="text-xl md:text-2xl font-bold my-2">
            Choose Province for Shipment
          </h1>
          <FormControl className="w-full">
            <Select value={item} onChange={handleShippingCost}>
              {provincePrices.map((province) => (
                <MenuItem key={province.id} value={province.price}>
                  {province.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
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
