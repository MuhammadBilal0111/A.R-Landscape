import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
function HeroSection() {
  return (
    <>
      <div className="bg-[url('/mainHomeImage.avif')] h-auto overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center h-auto lg:h-screen max-w-6xl mx-auto px-8 py-6 my-12 lg:my-0">
          <div className="w-full lg:w-1/2">
            <h1 className="text-green-500 text-5xl md:text-6xl font-bold lg:text-9xl lg:font-extrabold line-clamp-2 w-fit mb-3">
              Heart's Nurture.
            </h1>
            <p className="text-green-100 text-sm md:text-lg font-thin w-fit">
              Experience the Delight of Plant Care: Nurturing Lush Green Spaces
              with Passion and Dedication.
            </p>
          </div>
          <div className="border rounded-full  border-green-100 flex flex-col gap-5 justify-center items-center p-12 w-96 h-96 max-w-4xl max-h-4xl">
            <div className="w-3/4 h-36 max-w-5xl rounded-2xl">
              <img
                src="/plant_2.jpg"
                alt="Image Not Available"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <p className="text-green-500 text-md">
              Experience the Delight of Plant Care: Nurturing Lush Green Spaces
              with Passion and Dedication.
            </p>
            <Button
              variant="outlined"
              sx={{ color: "#fff", borderColor: "#fff" }}
            >
              <Link to="/shop">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
