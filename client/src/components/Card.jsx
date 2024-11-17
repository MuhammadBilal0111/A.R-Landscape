import React from "react";
import { IoCartOutline } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

function Card() {
  return (
    <div className="w-56 h-64 rounded-3xl shadow-2xl p-6">
      <div className="w-full">
        <img
          src="/plant_1.jpg"
          loading="lazy"
          className="w-full object-cover"
          alt="Image Unavailable"
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-green-800 font-bold">Cactus Sam</h1>
          <p className="text-amber-700 font-semibold">$210.00</p>
        </div>

        <Tooltip title="Add to cart" arrow>
          <Link to={"/"}>
            <button className="bg-green-800 p-3 rounded-full text-white">
              <IoCartOutline className="text-lg" />
            </button>
          </Link>
        </Tooltip>
      </div>
    </div>
  );
}

export default Card;
