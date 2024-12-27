import React, { useEffect, useState } from "react";
import { getpendingOrders } from "../../../services/GlobalApi";
import { io } from "socket.io-client";
import { CircularProgress } from "@mui/material";
import { ToastSuccess } from "../../../components/Toast";
import { completeOrder } from "../../../services/GlobalApi";
import OrderRender from "./OrderRender";

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
        const orders = await getpendingOrders();
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
      setOrderCompletedLoader(true);
      const socket = io("http://localhost:3000");
      socket.on("updatedOrder", (orderInfo) => {
        setNewOrders(orderInfo);
      });
      const response = await completeOrder(orderId);
      socket.on("updatedOrder", (orderInfo) => {
     
        setNewOrders(orderInfo); // updating the orders
      });
      setOrderCompletedLoader(false);
      ToastSuccess(response?.data?.message);
    } catch (err) {
      console.log("Error in completing the order", err);
    }
  };

  return (
    <div>
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
                <OrderRender
                  order={order}
                  handleCompleteOrder={handleCompleteOrder}
                  orderCompletedLoader={orderCompletedLoader}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-800">No new orders yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Order;
