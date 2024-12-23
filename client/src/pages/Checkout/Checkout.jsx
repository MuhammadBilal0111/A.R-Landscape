import React, { useState } from "react";
import PersonalContactInfo from "./components/PersonalContactInfo";
import PlaceOrder from "./components/PlaceOrder";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastSuccess, ToastFailure } from "../../components/Toast";
import { order } from "../../services/GlobalApi";
import SignIn from "./../register/SignIn";
import { emptyContainer } from "../../store/cartSlice.js";
import { useDispatch } from "react-redux";

function Checkout() {
  const { items, total_item, totalPrice } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({}); // error handling
  const [loading, setLoading] = useState(false);

  const [orderDetails, setOrderDetails] = useState({
    username: userInfo.username,
    email: userInfo.email,
  });

  const handleContactInfo = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.id]: e.target.value });
  };
  // validate that input fields are present
  const validateInputs = () => {
    const requiredFields = ["username", "email", "phoneNumber", "address"];
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
        setLoading(true);
        const newObject = {
          ...orderDetails,
          status: "pending",
          products: items,
          totalPrice,
          total_item,
        };
        const response = await order(newObject);
        dispatch(emptyContainer());
        setLoading(false);
        ToastSuccess(response?.data?.message);
      } catch (err) {
        setLoading(false);
        console.log(err);
        ToastFailure("Order in not sent");
      }

      // Proceed to API call or further logic
    } else {
      ToastFailure("Fill all the fields!");
    }
  };
  return (
    <>
      {userInfo ? (
        <div>
          <Link to={"/shop"}>
            <div className="flex items-center gap-2 text-4xl text-gray-700 mt-8 px-5">
              <FaArrowLeft className="cursor-pointer" />
              <h1 className="font-semibold">Place Your Order</h1>
            </div>
          </Link>
          <div className="flex flex-col lg:flex-row gap-7 px-5 mb-12">
            <PersonalContactInfo
              handleContactChange={handleContactInfo}
              orderDetails={orderDetails}
            />
            <PlaceOrder handleSubmit={onSubmitOrder} loading={loading} />
          </div>
        </div>
      ) : (
        <SignIn />
      )}
    </>
  );
}

export default Checkout;
