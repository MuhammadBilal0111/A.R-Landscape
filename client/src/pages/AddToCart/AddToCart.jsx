import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPlantsDetails } from "../../services/GlobalApi";
import { useDispatch } from "react-redux";
import { addItems } from "../../store/cartSlice";
import { CircularProgress } from "@mui/material";
import { ToastSuccess } from "../../components/Toast";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SEO from "../../components/SEO";
import ProductDescription from "./components/ProductDescription";
import ProductReview from "./components/Review/ProductReview";

function AddToCart() {
  const dispatch = useDispatch();
  const [itemData, setItemData] = useState({});
  const [value, setValue] = useState(0);

  const [itemsQuantity, setItemsQuantity] = useState(itemData?.quantity || 1);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const { productSlug } = useParams();

  // tabs logic using material ui
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // Material Ui tab styling above
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getPlantsDetails(`?slug=${productSlug}`);
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
  }, [productSlug]);

  const handleAddToCart = (e) => {
    ToastSuccess("Item added to Cart!");
    dispatch(addItems(itemData));
  };

  return (
    <div className="mt-12 md:mt-20 min-h-screen h-auto">
      {loading ? (
        <div className="flex justify-center">
          <CircularProgress color="success" size={"4rem"} />
        </div>
      ) : (
        <>
          <SEO
            title="A.R. Landscape Services - Add to Cart"
            description="Add your selected plants, pots, fertilizers and landscaping products to the cart and continue shopping for more items to transform your outdoor space."
          />
          <div className="flex flex-col lg:flex-row justify-center max-w-7xl mx-auto px-5 mb-7 gap-8">
            <div className="flex flex-col gap-8 lg:w-1/2">
              <div className="h-[400px] w-full">
                <img
                  src={image}
                  alt="Image not found"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div
                className="gap-5 flex items-center"
                onClick={(e) => {
                  setImage(e.target.getAttribute("src"));
                }}
              >
                <div className="h-28 w-28 md:h-40 md:w-48 cursor-pointer">
                  <img
                    src={itemData?.imageUrl?.[0]}
                    alt="Image not found"
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
                <div
                  className="h-28 w-28 md:h-40 md:w-48 cursor-pointer"
                  onClick={(e) => {
                    setImage(e.target.getAttribute("src"));
                  }}
                >
                  <img
                    src={itemData?.imageUrl?.[1]}
                    alt="Image not found"
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
                <div
                  className="h-28 w-28 md:h-40 md:w-48 cursor-pointer"
                  onClick={(e) => {
                    setImage(e.target.getAttribute("src"));
                  }}
                >
                  <img
                    src={itemData?.imageUrl?.[2]}
                    alt="Image not found"
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 w-full">
              <h1 className="font-bold text-3xl md:text-4xl mb-5 text-gray-700 leading-10">
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
                    <img
                      src="/cod.png"
                      alt="COD"
                      className="w-10 h-10 mx-6 my-2"
                    />
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
          <div className="max-w-7xl mx-auto my-16">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Description" {...a11yProps(0)} />
                  <Tab label="Reviews" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <ProductDescription itemData={itemData} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <ProductReview productId={itemData._id} />
              </CustomTabPanel>
            </Box>
          </div>
        </>
      )}
    </div>
  );
}

export default AddToCart;
