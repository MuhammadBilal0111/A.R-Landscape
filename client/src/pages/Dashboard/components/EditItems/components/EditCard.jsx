import React, { useState } from "react";
import { Link } from "react-router-dom";

const EditCard = ({ category, title, image, slug, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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
        <Link to={`/product/${slug}`} className="hover:underline">
          <h3 className="text-xl font-bold text-gray-900 mt-2">{title}</h3>
        </Link>

        <p className="text-sm font-semibold text-gray-500">{category}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row w-full md:w-36 gap-2 mt-4 md:mt-0">
        <button
          className="px-4 py-2 text-white bg-green-800 rounded-md hover:bg-green-900"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
          onClick={openModal}
        >
          Delete
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-gray-400 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="bg-white rounded-lg shadow border py-2">
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center m-2"
              >
                <svg
                  className="w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                  aria-hidden="true"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-800">
                  Are you sure you want to delete this product?
                </h3>
                <button
                  onClick={() => {
                    onDelete();
                    closeModal();
                  }}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-100"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCard;
