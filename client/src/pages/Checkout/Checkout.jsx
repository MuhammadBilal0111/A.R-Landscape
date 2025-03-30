import React, { useState } from "react";
import PersonalContactInfo from "./components/PersonalContactInfo";
import PlaceOrder from "./components/PlaceOrder";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastSuccess, ToastFailure } from "../../components/Toast";
import { order } from "../../services/GlobalApi";
import { emptyContainer } from "../../store/cartSlice.js";
import { useDispatch } from "react-redux";
import SEO from "../../components/SEO.jsx";
import { validatePhoneNumber, validateEmail } from "../../utils/utils.js";
function Checkout() {
  const { items, total_item, totalPrice, shippingCost } = useSelector(
    (state) => state.cart
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({}); // error handling
  const [loading, setLoading] = useState(false);

  const [personalDetails, setOrderDetails] = useState({});
  const handleContactInfo = (e) => {
    setOrderDetails({ ...personalDetails, [e.target.id]: e.target.value });
  };

  // validate that input fields are present
  const validateInputs = () => {
    const requiredFields = ["username", "email", "phoneNumber", "address"];
    const newErrors = {};

    requiredFields.forEach((field) => {
      if (!personalDetails[field]) {
        newErrors[field] = `${field} is required`;
      }
    });
    if (!shippingCost) {
      newErrors["shipping Cost"] = "Shipping cost is a required field";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  // submit order
  const onSubmitOrder = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return ToastFailure("Fill all the fields!");
    }

    if (!validateEmail(personalDetails?.email)) {
      return ToastFailure("Email is not valid");
    }

    if (!validatePhoneNumber(personalDetails?.phoneNumber)) {
      return ToastFailure("Phone Number is not valid");
    }
    try {
      setLoading(true);
      const newObject = {
        ...personalDetails,
        status: "pending",
        products: items,
        totalPrice,
        shippingCost,
      };
      const response = await order(newObject);
      dispatch(emptyContainer());
      ToastSuccess(response?.data?.message);
      navigate("/shop");
    } catch (err) {
      console.log(err);
      ToastFailure("Order in not sent");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <SEO
        title="A.R. Landscape - Checkout"
        description="Secure your purchase at A.R. Landscape. Complete your order for plants, pots, and landscaping tools to transform your outdoor space."
      />
      <div className="min-h-screen h-auto">
        <Link to={"/shop"}>
          <div className="flex items-center gap-2 text-4xl text-gray-700 mt-8 px-5">
            <FaArrowLeft className="cursor-pointer" />
            <h1 className="font-semibold">Place Your Order</h1>
          </div>
        </Link>
        <div className="flex flex-col lg:flex-row gap-7 px-5 mb-12">
          <PersonalContactInfo handleContactChange={handleContactInfo} />
          <PlaceOrder handleSubmit={onSubmitOrder} loading={loading} />
        </div>
      </div>
    </>
  );
}

export default Checkout;
