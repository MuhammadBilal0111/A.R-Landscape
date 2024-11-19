import React from "react";
import { Link } from "react-router-dom";
// {
//   "title": "Snake Plant",
//   "description": "A hardy indoor plant that requires minimal care.",
//   "category": "Indoor",
//   "price": 15.99,
//   "stockQuantity": 20,
//   "imageUrl": "https://example.com/images/snake-plant.jpg",
//   "dateAdded": "2024-11-18T12:00:00Z"
// }
function AddToCart() {
  return (
    <div className="mt-28">
      <div className="min-h-screen h-auto flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-5 mb-7 gap-8">
        <div className="h-[500px] flex-1">
          <img src="./plant_4.jpg" alt="" className="h-full w-full" />
        </div>
        <div className="flex-1">
          <h1 className="font-bold text-4xl md:text-7xl mb-5">Snake Plant</h1>
          <h2 className="font-semibold text-2xl md:text-4xl text-gray-700 mb-3">
            Deal of the day: <span className="text-yellow-500">15.99 $</span>
          </h2>
          <p className="text-gray-700 text-xl">
            A hardy indoor plant that requires minimal care.
          </p>
          <div className="flex items-center justify-center border-b-2 mb-4 border-green-600">
            <img src="cod.png" alt="" className="w-32 h-20" />
            <h1 className="text-red-500 font-medium">
              Get your greens delivered with ease—order now!!
            </h1>
          </div>
          <Link to="/">
            <button
              type="button"
              class="w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Add to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
