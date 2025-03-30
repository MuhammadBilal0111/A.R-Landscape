import { CircularProgress } from "@mui/material";
import React from "react";
// import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

function OrderRender({ order, handleCompleteOrder, loadingIndex }) {
  return (
    <div
      key={order._id}
      className="bg-gray-100 rounded-lg shadow-xl pt-4 shadow-slate-300 p-4 border-t-4 border-green-900 w-[360px]"
    >
      <h1 className="text-md md:text-lg font-bold line-clamp-2 text-gray-600">
        Order ID: <span className="font-normal">{order._id}</span>
      </h1>
      <p className="text-md md:text-lg text-gray-600 mt-1">
        <strong>User Name:</strong> {order.username}
      </p>
      <p className="text-md md:text-lg text-gray-600 mt-1">
        <strong>Total Price:</strong> Rs.{order.totalPrice}
      </p>
      <p className="text-md md:text-lg text-gray-600 mt-1">
        <strong>Email:</strong> {order.email}
      </p>
      <p className="text-md md:text-lg text-gray-600 mt-1">
        <strong>Phone No:</strong> {order.phoneNumber}
      </p>
      <p className="text-md md:text-lg text-gray-600 mt-1">
        <strong>Address:</strong> {order.address}
      </p>
      <p className="text-md md:text-lg text-gray-600 mt-1">
        <strong>Shipping Cost:</strong> Rs.{order.shippingCost}
      </p>
      <hr className="my-2" />
      <ol className="list-decimal text-md font-semibold text-green-900 mt-3 ml-4 min-h-20">
        {order.products.map((product) => (
          <li key={product._id} className="mb-2">
            <div className="flex justify-between items-center">
              <div className="flex mr-3 justify-between flex-1 items-center">
                <Link
                  to={`/product/${product?.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="line-clamp-1 hover:underline">
                    {product.title}
                  </span>
                </Link>
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
        disabled={order._id === loadingIndex}
        onClick={() => handleCompleteOrder(order._id)}
      >
        {order._id === loadingIndex ? (
          <CircularProgress size={"20px"} />
        ) : (
          "Order Done"
        )}
      </button>
    </div>
  );
}

export default OrderRender;
