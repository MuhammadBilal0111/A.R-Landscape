import React from "react";
import PersonalContactInfo from "./components/PersonalContactInfo";
import PlaceOrder from "./components/PlaceOrder";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
function Checkout() {
  return (
    <>
      <Link to={"/shop"}>
        <div className="flex items-center gap-2 text-4xl text-gray-700 mt-8 px-5">
          <FaArrowLeft className="cursor-pointer" />
          <h1 className="font-semibold ">Place Your Order</h1>
        </div>
      </Link>
      <div className="flex flex-col lg:flex-row gap-7 px-5 mb-12">
        <PersonalContactInfo />
        <PlaceOrder />
      </div>
    </>
  );
}

export default Checkout;
