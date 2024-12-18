import React, { useEffect, useState } from "react";
import { getAllOrders } from "../../../services/GlobalApi";
import { io } from "socket.io-client";
import { CircularProgress } from "@mui/material";
import { ToastSuccess } from "../../../components/Toast";
import { completeOrder } from "../../../services/GlobalApi";

function Order() {
  const [newOrders, setNewOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderCompletedLoader, setOrderCompletedLoader] = useState(false);

  useEffect(() => {
    // Initialize Socket.IO connection
    const socket = io("http://localhost:3000");

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const orders = await getAllOrders();
        setNewOrders(orders.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    };

    fetchOrder();

    // Listen for new orders via Socket.IO
    socket.on("orderPlaced", (orderInfo) => {
      setNewOrders((prevOrders) => [orderInfo, ...prevOrders]);
    });

    // Cleanup: Close the socket connection
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleCompleteOrder = async (orderId) => {
    try {
      const socket = io("http://localhost:3000");
      socket.on("deleteOrder", (orderInfo) => {
        setNewOrders(orderInfo);
      });
      const response = await completeOrder(orderId);
      socket.on("deleteOrder", (orderInfo) => {
        setNewOrders(orderInfo); // updating the orders
      });
      ToastSuccess(response?.data?.message);
    } catch (err) {
      console.log("Error in completing the order", err);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center w-full h-60 my-4">
          <CircularProgress size={"70px"} />
        </div>
      ) : (
        <div className="p-8 bg-gray-100 min-h-screen">
          <h1 className="text-4xl font-bold text-green-900 mb-6 text-center">
            New Orders
          </h1>
          {newOrders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full lg:w-7xl">
              {newOrders.map((order) => (
                <div
                  key={order._id} // Use unique identifiers like `order._id` instead of `index`
                  className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-900"
                >
                  <h1 className="text-lg font-bold truncate line-clamp-1 text-gray-800">
                    Order ID: <span className="font-normal">{order._id}</span>
                  </h1>
                  <p className="text-lg font-bold text-gray-800">
                    Customer:{" "}
                    <span className="font-normal">
                      {order?.fullName?.toUpperCase()}
                    </span>
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    Total Price:{" "}
                    <span className="font-normal">${order.totalPrice}</span>
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
                            {"Rs." +
                              (product.price * product.quantity).toFixed(2)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <button
                    className="text-center flex items-center justify-center w-full py-2 px-1 text-md text-white font-md bg-green-900 rounded-md hover:bg-green-950 duration-105 transition-all mt-4 hover:text-yellow-400"
                    onClick={() => handleCompleteOrder(order._id)}
                  >
                    {orderCompletedLoader ? (
                      <CircularProgress size={"30px"} />
                    ) : (
                      "Order Done"
                    )}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-800">No new orders yet.</p>
          )}
        </div>
      )}
    </>
  );
}

export default Order;
