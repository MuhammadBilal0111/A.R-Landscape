import React, { useEffect, useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { ToastSuccess, ToastFailure } from "../../../../components/Toast";
import {
  provincePrices,
  updateProvincePrices,
} from "../../../../services/GlobalApi";

const Province = () => {
  const [loadContent, setLoadContent] = useState(false);
  const [provinceDetails, setProvinceDetails] = useState([]);
  const [loading, setLoading] = useState({});

  // Handle input change
  const handleInputChange = (provinceName, value) => {
    setProvinceDetails((prevProvinceDetails) =>
      prevProvinceDetails.map((province) =>
        province.name === provinceName
          ? { ...province, price: value }
          : province
      )
    );
  };

  // Fetch province details
  useEffect(() => {
    const fetchProvincesDetails = async () => {
      try {
        setLoadContent(true);
        const response = await provincePrices();
        setProvinceDetails(response?.data || []);
        setLoadContent(false);
      } catch (err) {
        setLoadContent(false);
        ToastFailure("Error fetching province details:");
      }
    };
    fetchProvincesDetails();
  }, []);

  // Handle price change
  const handlePriceChange = async (provinceName) => {
    try {
      const province = provinceDetails.find(
        (item) => item.name === provinceName
      );
      const newPrice = province?.price;

      // Validate price
      if (!newPrice || isNaN(newPrice)) {
        ToastFailure("Please enter a valid price");
        return;
      }

      setLoading((prevLoading) => ({ ...prevLoading, [provinceName]: true }));

      const response = await updateProvincePrices({
        name: provinceName,
        price: newPrice,
      });

      ToastSuccess(response?.data?.message);
    } catch (err) {
      console.error("Error updating price:", err);
      ToastFailure("Failed to update the price. Please try again.");
    } finally {
      setLoading((prevLoading) => ({ ...prevLoading, [provinceName]: false }));
    }
  };

  return (
    <>
      {loadContent ? (
        <div className="flex justify-center items-center my-12">
          <CircularProgress size={"50px"} />
        </div>
      ) : (
        <section className="mx-auto my-12 px-3">
          <h1 className="font-bold text-md text-2xl md:text-3xl">
            Edit and Save Province Prices
          </h1>
          {provinceDetails?.map((province) => (
            <div key={province?.id} className="flex items-center gap-4 my-2">
              <TextField
                id="filled-basic"
                label={province.name}
                value={province.price}
                variant="filled"
                className="w-96"
                onChange={(e) =>
                  handleInputChange(province.name, e.target.value)
                }
              />
              <Button
                variant="contained"
                sx={{ color: "#fff", width: "140px" }}
                onClick={() => handlePriceChange(province.name)}
              >
                {loading[province.name] ? (
                  <CircularProgress size={24} sx={{ color: "#fff" }} />
                ) : (
                  "Update Price"
                )}
              </Button>
            </div>
          ))}
        </section>
      )}
    </>
  );
};

export default Province;
