import React from "react";

function HomeSection1() {
  return (
    <div className="flex items-center flex-col sm:flex-row justify-center gap-8 my-7 px-8">
      <div className="w-72 h-72 max-w-4xl flex justify-center items-center rounded-full">
        <img
          src="/plant_3.jpg"
          alt=""
          srcSet=""
          className="w-full h-full rounded-full object-cover shadow-2xl"
        />
      </div>
      <div className="flex flex-col gap-4 w-full md:w-3/4">
        <h1 className="text-green-900 font-semibold text-3xl lg:text-6xl">
          We have made the beauty of plants one of the most beautiful features
          in your home.
        </h1>
        <p className="text-gray-700 text-sm md:text-xl">
          A cozy home is a home that is decorated with the freeshness of green
          and fresh plants.
        </p>
      </div>
    </div>
  );
}

export default HomeSection1;
