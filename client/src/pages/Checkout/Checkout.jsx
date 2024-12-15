import React, { useState } from "react";
import PersonalContactInfo from "./components/PersonalContactInfo";
import PlaceOrder from "./components/PlaceOrder";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastSuccess, ToastFailure } from "../../components/Toast";
import { order } from "../../services/GlobalApi";

function Checkout() {
  const { items, total_item, totalPrice } = useSelector((state) => state.cart);
  const [errors, setErrors] = useState({}); // error handling
  const [orderDetails, setOrderDetails] = useState({});
  const handleContactInfo = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.id]: e.target.value });
  };
  // validate that input fields are present
  const validateInputs = () => {
    const requiredFields = ["fullName", "email", "phoneNumber", "address"];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!orderDetails[field]) {
        newErrors[field] = `${field} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  // submit order
  const onSubmitOrder = async (e) => {
    if (validateInputs()) {
      try {
        // const response = await order();
        const newObject = {
          ...orderDetails,
          products: items,
          totalPrice,
          total_item,
        };
        const response = await order(newObject);
        // console.log(response.message);
      } catch (err) {
        ToastFailure("Order in not sent");
      }

      ToastSuccess("Order Submitted Successfully:");
      // Proceed to API call or further logic
    } else {
      ToastFailure("Fill all the fields!");
    }
  };
  return (
    <>
      <Link to={"/shop"}>
        <div className="flex items-center gap-2 text-4xl text-gray-700 mt-8 px-5">
          <FaArrowLeft className="cursor-pointer" />
          <h1 className="font-semibold ">Place Your Order</h1>
        </div>
      </Link>
      <div className="flex flex-col lg:flex-row gap-7 px-5 mb-12">
        <PersonalContactInfo handleContactChange={handleContactInfo} />
        <PlaceOrder handleSubmit={onSubmitOrder} />
      </div>
    </>
  );
}

export default Checkout;
