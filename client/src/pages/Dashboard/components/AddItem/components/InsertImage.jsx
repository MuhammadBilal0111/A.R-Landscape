// InsertImage Component
import React, { useState } from "react";
import { Button } from "@mui/material";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function InsertImage({ onFileChange }) {
  const [file, setFile] = useState(null);
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-500 dark:text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
            aria-hidden="true"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {file?.name || "No file selected"}
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </label>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUploadImage}
        disabled={imageFileUploading}
      >
        {imageFileUploading ? (
          <div className="w-8 h-8">
            <CircularProgressbar value={100} text={"..."} />
          </div>
        ) : (
          "Upload Image"
        )}
      </Button>
    </div>
  );
}

export default InsertImage;
