import React, { useState, useEffect } from "react";
import ReactImageMagnify from "react-image-magnify";

const MagnifiedImageComponent = ({ imageSrc }) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Create an image element to get the dimensions
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      setImageSize({
        width: img.width,
        height: img.height,
      });
    };
  }, [imageSrc]);

  return (
    <div className="">
      {/* ReactImageMagnify for magnification functionality */}
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: "Keratin Hair Mask",
            isFluidWidth: true,
            src: imageSrc, // Small image from database
            width: imageSize.width, // Dynamically set width
            height: imageSize.height, // Dynamically set height
          },
          largeImage: {
            src: imageSrc, // Large image for magnification
            height: imageSize.height * 3, // Adjust large image height dynamically (scale as needed)
            width: imageSize.width * 3, // Adjust large image width dynamically (scale as needed)
          },
          enlargedImagePosition: "beside", // Position the enlarged image beside the original image
          shouldUsePositiveSpaceLens: true,
        }}
      />
    </div>
  );
};

export default MagnifiedImageComponent;
