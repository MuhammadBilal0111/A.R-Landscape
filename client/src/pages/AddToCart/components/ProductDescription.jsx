import React from "react";

function ProductDescription({ itemData }) {
  return (
    <>
      <h1 className="text-lg md:text-3xl lg:text-5xl font-semibold md:font-bold mb-5 leading-10 text-gray-700">
        {itemData?.title}
      </h1>
      <div
        className="w-full text-gray-600"
        dangerouslySetInnerHTML={{
          __html: itemData && itemData?.description,
        }}
      ></div>
    </>
  );
}

export default ProductDescription;
