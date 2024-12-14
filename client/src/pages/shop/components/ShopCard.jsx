import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { addItems } from "../../../store/cartSlice";
import { useDispatch } from "react-redux";
import { ToastSuccess } from "../../../components/Toast";

function ShopCard({ item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCart = (e) => {
    ToastSuccess("Item added to cart Successfully!");
    dispatch(addItems(item));
  };
  return (
    <div className="ecommerce-card bg-white outline-2 shadow-xl  rounded-lg flex flex-col items-center w-full md:w-[45%] lg:w-[27%] h-auto overflow-hidden">
      <div className="w-full">
        <img
          src={item?.imageUrl || "default-image.jpg"} // Use item.imageUrl or fallback
          alt={item?.title}
          className="w-full h-44 object-cover mb-4"
        />
      </div>
      <div className="p-3 flex flex-col items-center justify-center w-full">
        <h2 className="text-2xl font-semibold mb-2 hover:underline">
          <Link to={`/plant/${item?.slug}`}>{item?.title}</Link>
        </h2>
        <p className="text-gray-600 text-center h-14">
          {item?.description || "No description available."}
        </p>
        <div className="flex w-full items-center justify-center gap-3 mt-2">
          <button
            type="button"
            className="text-black hover:text-green-900 text-md py-2 px-1 rounded-md transition-all duration-150 w-full border hover:bg-gray-100 shadow-md"
            onClick={() => navigate(`/plant/${item?.slug}`)}
          >
            View
          </button>
          <button
            type="button"
            className="bg-green-900 hover:bg-green-950 text-white py-2 px-3 rounded-md transition-all duration-150 w-full font-medium focus:border-green-700 focus:outline-2 hover:text-yellow-500"
            onClick={handleCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShopCard;
