import React, { useState } from "react";
import { Link } from "react-router-dom";
const EditCard = ({ category, title, image, onEdit, onDelete }) => {
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg border border-gray-200 flex flex-col md:flex-row items-center gap-4 my-6 px-4">
      {/* Image Section */}
      <div className="w-full md:w-1/3">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-md"
        />
      </div>

      {/* Content Section */}
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mt-2">{title}</h3>
        <p className="text-sm font-semibold text-gray-500">{category}</p>
      </div>

      <div className="flex flex-col md:flex-row w-full md:w-36 gap-2 mt-4 md:mt-0">
        <button
          className="px-4 py-2 text-white bg-green-800 rounded-md hover:bg-green-900"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EditCard;
