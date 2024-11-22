import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { getPlantsDetails } from "../services/GlobalApi";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../store/cartSlice";
import { CircularProgress } from "@mui/material";

function AddToCart() {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const [plantData, setPlantData] = useState({});
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const { plantSlug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getPlantsDetails(`?slug=${plantSlug}`);
        setLoading(false);
        const imageUrl = response?.data?.data[0]?.imageUrl;
        setPlantData(response?.data?.data[0]);
        setImage(imageUrl);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [plantSlug]);

  const handleAddToCart = (e) => {
    dispatch(addItems(plantData));
  };
  const incrementCounter = (e) => {
    setQuantity(quantity + 1);
  };
  const decrementCounter = (e) => {
    if (quantity === 0) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
    }
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
              <div className="h-[400px] w-full overflow-hidden">
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover object-center"
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
                    src="/plant_5.jpg"
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
                    src="/plant_4.jpg"
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
                    src="/plant_3.jpg"
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 w-full">
              <h1 className="font-bold text-3xl md:text-6xl mb-5">
                {plantData?.title}
              </h1>
              <h2 className="font-semibold text-xl md:text-3xl text-gray-700 mb-3">
                Deal of the day:{" "}
                <span className="text-yellow-500">{plantData?.price} $</span>
              </h2>

              <div className="flex items-center me-4 border-b-2 mb-4 border-green-600">
                <input
                  type="radio"
                  name="method"
                  id="method"
                  className="cursor-pointer w-4 h-4 accent-green-900"
                  checked
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
              <div className="mb-6">
                <p className="text-sm mb-3 text-gray-700 font-semibold">
                  Choose quantity:
                </p>
                <div className="flex gap-4 items-center">
                  <button
                    className="text-white bg-[#A1DD70] p-2 rounded-full focus:ring-[#A1DD70] focus:ring-4 hover:scale-105 duration-75 hover:bg-green-800 transition-all"
                    onClick={decrementCounter}
                  >
                    <FaMinus />
                  </button>
                  <span className="text-lg font-semibold">{quantity}</span>
                  <button
                    className="text-white bg-[#A1DD70] p-2 rounded-full focus:ring-[#A1DD70] focus:ring-4 hover:scale-105 duration-75 hover:bg-green-800 transition-all"
                    onClick={incrementCounter}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
              <Link to="/">
                <button
                  type="button"
                  className="w-full focus:outline-none  bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300  rounded-lg  px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 text-yellow-300 text-md"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </Link>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-5 my-16">
            <h1 className="text-5xl text-md font-semibold md:font-bold mb-5 underline">
              Description
            </h1>
            <p>
              {plantData?.description}Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Voluptatem numquam perferendis, sapiente quidem
              nemo ipsam sed saepe! Harum tempora reprehenderit recusandae.
              Placeat repellendus amet totam commodi ad quam ratione dolorum.
              Inventore mollitia repudiandae cum tempora illum accusantium,
              porro dolorem excepturi labore aspernatur ex autem sequi
              cupiditate repellendus deserunt est facilis. Eius, voluptas.
              Quaerat sed at, possimus corrupti perspiciatis nulla. Optio! Ipsa,
              assumenda delectus? Repellendus qui alias ex ipsum quod
              necessitatibus cumque, dolor explicabo tempore impedit reiciendis
              aliquam quia consequuntur voluptatum eum doloribus eaque inventore
              exercitationem repellat enim! Sint, animi voluptates? Earum natus
              reiciendis cupiditate omnis a eius quam ex optio exercitationem
              voluptates, expedita debitis officia est porro asperiores qui
              ducimus corrupti nulla quo cumque illo. Voluptas quidem corporis
              blanditiis labore! Itaque adipisci eum modi, fugiat id est autem
              eaque assumenda eligendi totam quae deserunt saepe eveniet tempore
              dolor aliquid amet alias incidunt, ab inventore nulla! Cumque non
              cupiditate nihil voluptatibus. Iste voluptate vitae ratione rem
              temporibus quos quaerat ut tempore voluptatem recusandae a dolores
              esse modi perferendis soluta, error, facilis delectus aspernatur
              vel culpa! Similique ipsam nemo voluptatem. Quo, corporis.
              Aliquam, qui possimus. Explicabo molestias fuga cumque iste quos
              repellendus architecto beatae laborum quo ex. Enim esse sequi quos
              corporis voluptatum labore eligendi velit beatae, dignissimos
              ratione qui minima! Nobis? Porro et officia soluta nostrum hic
              repellendus laboriosam quis deleniti maiores eius sint officiis
              dignissimos culpa quo nihil quibusdam minus labore placeat iusto
              necessitatibus inventore cupiditate, aliquid delectus?
              Necessitatibus, modi. Eius accusantium adipisci quam aperiam aut
              asperiores nobis quod facilis velit mollitia, sequi omnis aliquam
              quidem nihil eaque natus eligendi ipsam nemo? Laboriosam, quas
              dolorum? Nobis delectus cupiditate similique enim. Asperiores quis
              minima laborum quibusdam pariatur amet dolorum nihil, aspernatur a
              hic voluptas recusandae blanditiis. Doloribus nobis consequuntur
              repellat quo alias placeat obcaecati, aliquid reprehenderit
              aliquam, ullam suscipit error natus.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default AddToCart;
