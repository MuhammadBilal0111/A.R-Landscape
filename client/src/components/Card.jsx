import React, { useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastSuccess } from "./Toast";
import { useSelector, useDispatch } from "react-redux";
import { addItems } from "../store/cartSlice";

function Card({ item }) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user); // check that the user is logged in

  const handleAddToCart = () => {
    if (currentUser) {
      ToastSuccess("Item added to cart successfully!");
      dispatch(addItems(item));
    } else {
      navigate("/sign-up");
    }
  };
  return (
    <div className="w-56 h-72 rounded-3xl shadow-2xl p-6 ">
      <Link to={`/plant/${item?.slug}`}>
        <div className="w-full h-48 object-cover mb-3">
          <img
            src={item?.imageUrl[0]}
            loading="lazy"
            className="w-full h-full object-cover"
            alt="Image Unavailable"
          />
        </div>
      </Link>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-green-800 font-bold line-clamp-1">
            {item?.title}
          </h1>
          <p className="text-amber-700 font-semibold">Rs. {item?.price}</p>
        </div>
        <Tooltip title="Add to cart" arrow>
          <button className="bg-green-800 p-3 rounded-full text-white">
            <IoCartOutline className="text-lg" onClick={handleAddToCart} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

export default Card;
