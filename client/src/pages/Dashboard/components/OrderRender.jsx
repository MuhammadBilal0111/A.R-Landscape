import React from "react";
// import { CircularProgress } from "@mui/material";

function OrderRender({ order, handleCompleteOrder, orderCompletedLoader }) {
  return (
    <div>
      <div
        key={order._id} // Use unique identifiers like `order._id` instead of index
        className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-900"
      >
        <h1 className="text-lg font-bold truncate line-clamp-1 text-gray-800">
          Order ID: <span className="font-normal">{order._id}</span>
        </h1>
        <p className="text-lg font-bold text-gray-800">
          Customer:{" "}
          <span className="font-normal">{order?.fullName?.toUpperCase()}</span>
        </p>
        <p className="text-lg font-bold text-gray-800">
          Total Price: <span className="font-normal">${order.totalPrice}</span>
        </p>
        <p className="text-gray-600 mt-2">
          <strong>Address:</strong> {order.address}
        </p>
        <ol className="list-decimal text-md font-semibold text-green-900 mt-3 ml-4 min-h-20">
          {order.products.map((product) => (
            <li key={product._id} className="mb-2">
              <div className="flex justify-between">
                <div className="flex">
                  {product.title}
                  <span className="ml-2 text-yellow-400 bg-green-800 px-2 py-1 rounded-md text-sm">
                    x{product.quantity}
                  </span>
                </div>
                <span>
                  {"Rs." + (product.price * product.quantity).toFixed(2)}
                </span>
              </div>
            </li>
          ))}
        </ol>
        <button
          className="text-center flex items-center justify-center w-full py-2 px-1 text-md text-white font-md bg-green-900 rounded-md hover:bg-green-950 duration-105 transition-all mt-4 hover:text-yellow-400"
          disabled={orderCompletedLoader}
          onClick={() => handleCompleteOrder(order._id)}
        >
          {/* {orderCompletedLoader ? (
            <CircularProgress size={"30px"} />
          ) : (
            "Order Done"
          )} */}
          Order Done
        </button>
      </div>
    </div>
  );
}

export default OrderRender;
