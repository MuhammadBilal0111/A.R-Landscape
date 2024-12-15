import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import InsertImage from "./components/InsertImage";

function AddItem() {
  const [item, setItem] = useState("plants");
  const [imageFile, setImageFile] = useState(null);
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
  const handleImageFileChange = (file, index) => {
    console.log("file", file, "index", index);
  };
  const handleItemDataChange = (e) => {
    setForm({ ...formData, [e.target.id]: e.target.value });
  };

  // const handleImageFileChange = (file, index) => {
  //   console.log("file", file, "index", index);
  // };
  const handleUploadImage = async () => {
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

        <InsertImage onFileChange={handleImageFileChange} />
        {/* <InsertImage onFileChange={handleImageFileChange} />
        <InsertImage onFileChange={handleImageFileChange} /> */}

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
