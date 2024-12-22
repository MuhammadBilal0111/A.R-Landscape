import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPlantsDetails } from "../../services/GlobalApi";
import { useDispatch, useSelector } from "react-redux";
import {
  addItems,
  incrementQuantity,
  decrementQuantity,
} from "../../store/cartSlice";
import { CircularProgress } from "@mui/material";
import { ToastSuccess } from "../../components/Toast";

function AddToCart() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [itemData, setItemData] = useState({});
  const [itemsQuantity, setItemsQuantity] = useState(itemData?.quantity || 1);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const { plantSlug } = useParams();
  console.log(itemData);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getPlantsDetails(`?slug=${plantSlug}`);
        setLoading(false);
        const imageUrl = response?.data?.data[0]?.imageUrl[0];
        setItemData({
          ...response?.data?.data[0],
          ["quantity"]: itemsQuantity,
        });
        setImage(imageUrl);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [plantSlug]);

  const handleAddToCart = (e) => {
    ToastSuccess("Item added to Cart!");
    dispatch(addItems(itemData));
  };
  
  return (
    <div className="mt-28 min-h-screen h-auto">
      {loading ? (
        <div className="flex justify-center">
          <CircularProgress color="success" size={"4rem"} />
        </div>
      ) : (
        <>
          <div className=" flex flex-col lg:flex-row justify-center max-w-7xl mx-auto px-5 mb-7 gap-8 ">
            <div className="flex flex-col gap-8 lg:w-1/2">
              <div className="h-[400px] w-full">
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className="gap-5 flex flex-wrap lg:flex-row items-center justify-center"
                onClick={(e) => {
                  setImage(e.target.getAttribute("src"));
                }}
              >
                <div className="w-full md:h-40 md:w-48 cursor-pointer">
                  <img
                    src={itemData?.imageUrl?.[0]}
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div
                  className="w-full md:h-40 md:w-48 cursor-pointer"
                  onClick={(e) => {
                    setImage(e.target.getAttribute("src"));
                  }}
                >
                  <img
                    src={itemData?.imageUrl?.[1]}
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div
                  className="w-full md:h-40 md:w-48 cursor-pointer"
                  onClick={(e) => {
                    setImage(e.target.getAttribute("src"));
                  }}
                >
                  <img
                    src={itemData?.imageUrl?.[2]}
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 w-full">
              <h1 className="font-bold text-3xl md:text-6xl mb-5">
                {itemData?.title}
              </h1>
              <h2 className="font-semibold text-xl md:text-3xl text-gray-700 mb-3">
                Deal of the day:{" "}
                <span className="text-yellow-500">Rs. {itemData?.price}</span>
              </h2>

              <div className="flex items-center me-4 border-b-2 mb-4 border-green-600">
                <input
                  type="radio"
                  name="method"
                  id="method"
                  className="cursor-pointer w-4 h-4 accent-green-900"
                  checked
                  readOnly
                />
                <label htmlFor="method">
                  <div className="flex items-center ">
                    <img src="/cod.png" alt="" className="w-32 h-20 " />
                    <h1 className="text-red-500 font-medium">
                      Get your greens delivered with ease—order now!!
                    </h1>
                  </div>
                </label>
              </div>
              
              <button
                type="button"
                className="w-full focus:outline-none  bg-green-900 hover:bg-green-950  rounded-lg  px-5 py-2.5 me-2 mb-2 text-white text-md hover:text-yellow-400 duration-75"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-5 my-16">
            <h1 className="text-5xl text-md font-semibold md:font-bold mb-5 underline">
              Description
            </h1>
            <div
              className="w-full"
              dangerouslySetInnerHTML={{
                __html: itemData && itemData?.description,
              }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
}

export default AddToCart;
