import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

function Order() {
  const [newOrders, setNewOrders] = useState([]);
  const socket = io("http://localhost:3000");

  useEffect(() => {
    // Connect to the Socket.IO server
    socket.on("connection", (socket) => {
      console.log(socket);
    });
    
    // Listen for orderPlaced events
  }, []);
  socket.on("orderPlaced", (orderInfo) => {
    setNewOrders((prevOrders) => [...prevOrders, orderInfo]);
    console.log("chala");
  });
  console.log(newOrders);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-green-900 mb-6 text-center">
        New Orders
      </h1>
      {newOrders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newOrders.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-900"
            >
              <p className="text-green-900 text-lg font-semibold">
                Order ID: <span className="font-normal">{order._id}</span>
              </p>
              <p className="text-green-900 text-lg font-semibold">
                Customer: <span className="font-normal">{order.fullName}</span>
              </p>
              <p className="text-green-900 text-lg font-semibold">
                Total Price:{" "}
                <span className="font-normal">${order.totalPrice}</span>
              </p>
              <p className="text-gray-600 mt-2">
                <strong>Address:</strong> {order.address}
              </p>
              <p className="text-gray-600 mt-2">
                <strong>Special Instructions:</strong>{" "}
                {order.specialInstructions || "None"}
              </p>
              <button className="mt-4 bg-green-900 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition">
                Order Done
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No new orders yet.</p>
      )}
    </div>
  );
}

export default Order;
