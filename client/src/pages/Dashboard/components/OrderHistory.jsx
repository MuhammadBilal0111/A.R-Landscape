import React, { useEffect, useState } from "react";
import { getAllOrders } from "../../../services/GlobalApi";
import { ToastFailure } from "../../../components/Toast";
import { CircularProgress } from "@mui/material";
import { capitalizeWords } from "../../../utils/utils";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getAllOrders();
        setOrders(response?.data?.data);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        ToastFailure("Error in fetching the orders");
      }
    };
    fetchOrders();
  }, []);
  return (
    <div className="px-4 py-2 my-4 w-full">
      {loading ? (
        <div className="flex justify-center items-center mt-5">
          <CircularProgress size={"45px"} />
        </div>
      ) : (
        <>
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-4 max-w-3xl mx-auto w-full my-2"
            >
              <div className="text-sm md:text-md flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">
                  OrderId: {order?._id}
                </h3>
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-700">
                  {capitalizeWords(order?.status)}
                </span>
              </div>
              <h3 className="text-sm md:text-md font-semibold text-gray-800">
                Name: {order?.username}
              </h3>
              <div className="mt-4 text-sm md:text-md">
                <p className="text-gray-600">
                  Number of Items:{" "}
                  <strong className="text-gray-800">
                    {order.products.length}
                  </strong>
                </p>
                <p className="text-gray-600">
                  Shipping Cost:
                  <strong className="text-gray-800">
                    {" "}
                    Rs. {order.shippingCost}
                  </strong>
                </p>

                <ol
                  className="text-sm md:text-md list-decimal pl-5 p-3 my-5 border border-t-gray-600
                border-b-gray-600"
                >
                  {order?.products?.map((product) => (
                    <li key={product?._id} className="text-gray-800">
                      <div className="flex justify-between items-center gap-2">
                        <div className="flex items-center gap-3">
                          <p>{product?.title || "Untitled Product"}</p>
                          <span className="rounded-lg p-1 bg-green-950 text-white">
                            x{product.quantity}
                          </span>
                        </div>

                        <strong className="text-gray-800 flex flex-start">
                          Rs. {(product?.price * product.quantity).toFixed(2)}
                        </strong>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="text-gray-600 items-center p-3">
                  <span>Total Cost:</span>
                  <strong className="text-gray-800">
                    {" "}
                    Rs. {(order.totalPrice + order.shippingCost).toFixed(2)}
                  </strong>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default OrderHistory;
