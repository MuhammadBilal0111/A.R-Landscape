import React from "react";
import OrderItems from "./OrderItems";
function PlaceOrder() {
  return (
    <div className="mb-4 lg:max-w-96 w-full mt-2">
      <OrderItems />
      <div className="flex flex-col gap-1 rounded-lg  text-gray-700 font-semibold bg-gray-300">
        <div className=" flex py-3 items-center px-4 justify-between border-b border-b-gray-100">
          <h1>Subtotal:</h1>
          <h1>Rs. 4350</h1>
        </div>
        <div className="flex py-3 items-center px-4 justify-between border-b border-b-gray-100">
          <h1>Shipping Cost:</h1>
          <h1>Rs. 4350</h1>
        </div>
        <div className="flex py-3 items-center px-4 justify-between">
          <h1>Total:</h1>
          <h1>Rs. 4350</h1>
        </div>
      </div>
      <button className="text-center flex items-center justify-center w-full py-2 px-1 text-md text-white font-md bg-green-900 rounded-md hover:bg-green-950 duration-105 transition-all mt-4">
        Place Your Order
      </button>
    </div>
  );
}

export default PlaceOrder;
