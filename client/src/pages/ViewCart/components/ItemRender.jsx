import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteItem } from "../../../store/cartSlice";

function ItemRender({ item }) {
  const dispatch = useDispatch();
  const [itemsQuantity, setItemsQuantity] = useState(item.quantity || 1);

  const handleDeleteItem = () => {
    dispatch(deleteItem(item));
  };

  const handleIncrementItemQuantity = () => {
    setItemsQuantity((prevQuantity) => Math.min(prevQuantity + 1, 100)); // Ensuring max limit
  };

  const handleDecrementItemQuantity = () => {
    setItemsQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1)); // Ensuring min limit
  };

  return (
    <div className="flex justify-between items-center py-1 border-b border-b-green-800">
      <div className="h-16 w-18">
        <img
          src="/plant_1.jpg"
          className="w-full h-full object-cover object-center"
          alt={item.title}
          loading="lazy"
        />
      </div>
      <div className="hover:underline text-xl font-semibold w-80 max-w-3xl ">
        <Link to={`/plant/${item?.slug}`}>
          <h1>{item.title}</h1>
        </Link>
      </div>
      <div className="flex items-center">
        <button
          type="button"
          className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-green-900 hover:bg-green-950 focus:outline-none"
          onClick={handleDecrementItemQuantity}
        >
          <svg
            className="h-2.5 w-2.5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="number"
          className="w-10 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none"
          min="1"
          max="100"
          value={itemsQuantity}
          readOnly
        />
        <button
          type="button"
          className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-green-900 hover:bg-green-950 focus:outline-none"
          onClick={handleIncrementItemQuantity}
        >
          <svg
            className="h-2.5 w-2.5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
      <h2 className="text-xl font-semibold">{item.price}$</h2>
      <MdDelete
        className="text-red-800 cursor-pointer hover:text-red-900 hover:shadow-xl text-2xl"
        onClick={handleDeleteItem}
      />
    </div>
  );
}

export default ItemRender;
