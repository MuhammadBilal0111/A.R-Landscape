import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { provincePrices } from "../../../services/GlobalApi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setShippingCost } from "../../../store/cartSlice";

function PersonalContactInfo({ handleContactChange }) {
  const dispatch = useDispatch();
  const [provinceDetails, setProvinceDetails] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState(""); // by default sidh will be selected

  useEffect(() => {
    const fetchProvincePrices = async () => {
      const response = await provincePrices();
      setProvinceDetails(response.data);
    };
    fetchProvincePrices();
  }, []);
  // function to handle shipping cost
  const handleShippingCost = (e) => {
    const selectedId = e.target.value;
    const selectedProvince = provinceDetails.find(
      (province) => province._id === selectedId
    );
    setSelectedProvinceId(selectedId); // Update the selected province id in state
    if (selectedProvince) {
      dispatch(setShippingCost(selectedProvince.price)); // Store only the price in Redux
    }
  };

  return (
    <div className="flex flex-col h-auto w-full mb-4">
      <form className="flex flex-col gap-3 bg-gray-300  my-4 p-5 rounded-md text-gray-700">
        <h1 className="font-semibold text-2xl">Contact Information</h1>
        <TextField
          id="username"
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
          placeholder="johndoe@gmail.com"
          onChange={handleContactChange}
        />
        <TextField
          id="phoneNumber"
          label="Phone Number"
          variant="outlined"
          required
          placeholder="+923225532129"
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
        <>
          <h1 className="text-xl md:text-2xl font-bold my-2">
            Choose Province for Shipment
          </h1>
          <FormControl className="w-full">
            <Select value={selectedProvinceId} onChange={handleShippingCost}>
              {provinceDetails.map((province) => (
                <MenuItem key={province._id} value={province._id}>
                  {province.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
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
