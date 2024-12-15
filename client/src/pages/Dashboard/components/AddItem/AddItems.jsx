import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import { Button } from "@mui/material";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../../../firebase";

function AddItem() {
  const [item, setItem] = useState("plants");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [formData, setForm] = useState({});
  const [ImageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [publishError, setPublishError] = useState(null);
  const [dataLoading, setDataLoading] = useState(false); // htmlFor loading data
  const [dataSuccess, setDataSuccess] = useState(false); // data successfully added in database

  const handleSubmitForm = async (e) => {
    console.log(e);
    e.preventDefault();
    try {
      setDataSuccess(false);
      setDataLoading(true);
      // const res = await addItems(formData);
      // setDataLoading(false);
      // console.log(res?.data?.data);
    } catch (err) {
      setDataLoading(false);
      setPublishError("Something Went Wrong");
    }
  };
  const handleItemDataChange = (e) => {
    setForm({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUploadImage = async () => {
    console.log("chala");
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "plant_ordering_website");
    formData.append("cloud_name", "djhxl6tac");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/djhxl6tac/image/upload",
        formData
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(imageFileUploadError);
  return (
    <div className="px-4">
      <form
        onSubmit={handleSubmitForm}
        className="mx-auto max-w-4xl flex flex-col gap-4 my-10 mb-10"
      >
        <div className="flex flex-col gap-2 md:flex-row">
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            className="flex flex-1"
            onChange={handleItemDataChange}
          />
          <FormControl className="w-full md:w-64">
            <Select
              value={item}
              onChange={(e) =>
                setForm({ ...formData, category: e.target.value })
              }
            >
              <MenuItem value="plants">Plants</MenuItem>
              <MenuItem value="pots">Pots</MenuItem>
              <MenuItem value="fertilizers">Fertilizers</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {file?.name}
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setImageFileUploadError(null);
              }}
            />
          </label>
          <Button variant="text" onClick={handleUploadImage} className="h-full">
            {ImageFileUploadProgress ? (
              <div className="w-8 h-8">
                <CircularProgressbar
                  value={ImageFileUploadProgress}
                  text={`${ImageFileUploadProgress || 0} %`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Enter Description"
          onChange={(value) => setForm({ ...formData, content: value })}
          className="h-44 mb-10"
        />
        <button
          type="submit"
          className="text-center flex items-center justify-center w-full py-2 px-1 text-md text-white font-md bg-green-900 rounded-md hover:bg-green-950 duration-105 transition-all hover:text-yellow-400"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}

export default AddItem;
