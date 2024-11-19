import React from "react";
import { IoCartOutline } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

function Card({ title, image, slug, price }) {
  return (
    <div className="w-56 h-72 rounded-3xl shadow-2xl p-6 ">
      <Link to={`/plant/${slug}`}>
        <div className="w-full h-48 object-cover mb-3">
          <img
            src={image}
            loading="lazy"
            className="w-full h-full object-cover"
            alt="Image Unavailable"
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-green-800 font-bold line-clamp-1">{title}</h1>
            <p className="text-amber-700 font-semibold">{price}</p>
          </div>

          <Tooltip title="Add to cart" arrow>
            <Link to={"/addhv"}>
              <button className="bg-green-800 p-3 rounded-full text-white">
                <IoCartOutline className="text-lg" />
              </button>
            </Link>
          </Tooltip>
        </div>
      </Link>
    </div>
  );
}

export default Card;
