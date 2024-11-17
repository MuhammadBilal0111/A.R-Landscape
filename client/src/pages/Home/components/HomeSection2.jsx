import React from "react";

function HomeSection2() {
  return (
    <div className="flex items-center flex-col sm:flex-row justify-center gap-8 my-7 px-8">
      <div className="flex flex-col gap-4 w-full md:w-3/4">
        <h1 className="text-green-900 font-semibold text-3xl lg:text-6xl ">
          "Testimonial highlight"
        </h1>
        <p className="text-gray-700 text-sm md:text-xl">
          My house became cooler and calmer by adding many beautiful plants and
          very comfortale to look.
        </p>
      </div>
      <div className="w-72 h-72 max-w-4xl flex justify-center items-center object-cover rounded-full">
        <img
          src="/plant_4.jpg"
          alt=""
          srcset=""
          className="w-full h-full rounded-full object-cover shadow-2xl"
        />
      </div>
    </div>
  );
}

export default HomeSection2;
