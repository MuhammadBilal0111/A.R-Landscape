import React from "react";
import { useSelector } from "react-redux";
import ItemRender from "./components/ItemRender.jsx";
import { Link } from "react-router-dom";
function ViewCart() {
  const { items, totalPrice } = useSelector((state) => state.cart);

  return (
    <>
      <div className="h-auto min-h-screen">
        {items && items.length > 0 ? (
          <div className="px-5 w-full max-w-3xl mx-auto my-8 shadow-2xl py-8 rounded-lg">
            <h1 className="font-bold text-3xl mb-4">Shopping Cart</h1>
            {items &&
              items.length > 0 &&
              items.map((item) => <ItemRender key={item._id} item={item} />)}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-gray-800">Original price</span>
                <span className="text-gray-800">Rs. {totalPrice}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-gray-800">Shipping Cost:</span>
                <span className="text-gray-800">$799</span>
              </div>
              <div className="mt-4 border-t border-t-green-800 "></div>
              <div className="flex justify-between mt-2">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-lg  text-yellow-500 font-bold">
                  Rs. {totalPrice}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center gap-4 flex-col sm:flex-row w-full mt-4">
              <div className="w-full">
                <Link to={"/shop"}>
                  <button
                    type="button"
                    className="text-black hover:text-green-900 font-medium py-2 px-3 rounded-md transition-all duration-150 w-full border hover:bg-gray-100"
                  >
                    Continue Shopping
                  </button>
                </Link>
              </div>
              <div className="w-full">
                <Link to={"/checkout"}>
                  <button
                    type="button"
                    className="bg-green-900 hover:bg-green-950 text-white py-2 px-3 rounded-md transition-all duration-150 w-full font-medium focus:border-green-700 focus:outline-2"
                  >
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="my-12 flex flex-col justify-center items-center max-w-xl mx-auto py-8 px-5">
            <img
              src="/emptyCart.png"
              alt="/emptyCart.jpg"
              className="w-96 h-96"
            />
            <h1 className="w-full text-3xl font-bold mb-5 text-green-900 text-center">
              Your Cart is currently empty!
            </h1>
            <div className="w-full">
              <Link to={"/shop"}>
                <button
                  type="button"
                  className="text-white font-medium py-2 px-3 rounded-md transition-all duration-150 border hover:bg-green-950 bg-green-900 w-full hover:text-yellow-400"
                >
                  Add something to make me happy : &#41;
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ViewCart;
