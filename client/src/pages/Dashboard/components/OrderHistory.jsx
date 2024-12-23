import React, { useEffect, useState } from "react";
import { getAllOrders } from "../../../services/GlobalApi";
import { ToastFailure } from "../../../components/Toast";
import { CircularProgress } from "@mui/material";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getAllOrders();
        setOrders(response?.data?.data);
        console.log(response?.data?.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        ToastFailure("Error in fetching the orders");
      }
    };
    fetchOrders();
  }, []);
  return (
    <div className="px-4 py-2">
      {loading ? (
        <div className="flex justify-center items-center mt-5">
          <CircularProgress size={"45px"} />
        </div>
      ) : (
        <>
          {orders.map((order) => (
            <div class="bg-white border border-gray-200 rounded-lg shadow-md p-4 max-w-3xl mx-auto w-full my-2">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-gray-800">
                  {order?._id}
                </h3>
                <span class="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-700">
                  {order?.status}
                </span>
              </div>
              <h3 class="text-lg font-semibold text-gray-800">
                {order?.username}
              </h3>
              <div class="mt-4">
                <p class="text-gray-600">
                  Number of Items:{" "}
                  <strong class="text-gray-800">{order.products.length}</strong>
                </p>
                {order.products.map((product) => (
                  <h3 class="text-lg font-semibold text-gray-800">
                    {product?.title}
                  </h3>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default OrderHistory;
