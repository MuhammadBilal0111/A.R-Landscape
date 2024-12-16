import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import InsertImage from "./components/InsertImage";
import { v4 as uuidv4 } from "uuid";
import { addItems } from "../../../../services/GlobalApi";
import { ToastFailure, ToastSuccess } from "../../../../components/Toast";

function AddItem() {
  const [item, setItem] = useState("plants");
  const [imageFiles, setImageFiles] = useState([
    { id: uuidv4(), file: null, url: null, loading: false, success: false },
    { id: uuidv4(), file: null, url: null, loading: false, success: false },
    { id: uuidv4(), file: null, url: null, loading: false, success: false },
  ]);
  const [formData, setForm] = useState({});
  const [publishError, setPublishError] = useState(null); // for data loading error
  const [dataLoading, setDataLoading] = useState(false); // for data loading including images

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log(formData);

    // Validation: Check if all required fields are filled and if any image URL is null
    if (
      !formData.title ||
      !formData.category ||
      !formData.content ||
      imageFiles.some((imageFile) => imageFile.url === null)
    ) {
      console.log(
        formData.title,
        formData.category,
        formData.content,
        imageFiles[0].url,
        imageFiles[1].url,
        imageFiles[2].url
      );
      return ToastFailure("Fill all the fields");
    }

    try {
      setDataLoading(true);
      setPublishError(null);

      // Construct the new object after validation
      const newObject = {
        ...formData,
        imageUrl: imageFiles.map((imageFile) => imageFile.url),
      };

      console.log("Submitted data:", newObject);
      await addItems(newObject); // posting the data

      setDataLoading(false);
      ToastSuccess("Item added successfully!");
    } catch (err) {
      setDataLoading(false);
      ToastFailure("Something Went Wrong");
      console.error(err);
    }
  };

  const handleImageFileChange = (file, id) => {
    setImageFiles((prevFiles) =>
      prevFiles.map((img) =>
        img.id === id ? { ...img, file, url: null } : img
      )
    );
  };

  const handleUploadImage = async (file, id) => {
    if (!file) return;

    setImageFiles((prevFiles) =>
      prevFiles.map((img) => (img.id === id ? { ...img, loading: true } : img))
    );

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "plant_ordering_website");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/djhxl6tac/image/upload",
        uploadData
      );

      setImageFiles((prevFiles) =>
        prevFiles.map((img) =>
          img.id === id
            ? {
                ...img,
                url: response.data.secure_url,
                loading: false,
                success: true,
              }
            : img
        )
      );
      ToastSuccess("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      setImageFiles((prevFiles) =>
        prevFiles.map((img) =>
          img.id === id ? { ...img, loading: false, success: false } : img
        )
      );
      ToastFailure("Error in uploading Image");
    }
  };

  const handleItemDataChange = (e) => {
    setForm({ ...formData, category: item, [e.target.id]: e.target.value });
  };
  console.log(item);
  return (
    <div className="px-4">
      <form
        onSubmit={handleSubmitForm}
        className="mx-auto max-w-4xl flex flex-col gap-4 my-10 mb-10"
      >
        {/* Title and Select Input */}
        <div className="flex flex-col gap-2 md:flex-row">
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            className="flex flex-1"
            onChange={handleItemDataChange}
          />
          <FormControl className="w-full md:w-64">
            <Select value={item} onChange={(e) => setItem(e.target.value)}>
              <MenuItem value="plants">Plants</MenuItem>
              <MenuItem value="pots">Pots</MenuItem>
              <MenuItem value="fertilizers">Fertilizers</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Image Upload Components */}
        {imageFiles.map((imageFile) => (
          <InsertImage
            key={imageFile.id}
            onFileChange={(file) => handleImageFileChange(file, imageFile.id)}
            onUpload={() => handleUploadImage(imageFile.file, imageFile.id)}
            imageFile={imageFile}
          />
        ))}

        {/* Description Input */}
        <ReactQuill
          theme="snow"
          placeholder="Enter Description"
          onChange={(value) => setForm({ ...formData, content: value })}
          className="h-44 mb-10"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="text-center flex items-center justify-center w-full py-2 px-1 text-md text-white font-md bg-green-900 rounded-md hover:bg-green-950 duration-105 transition-all hover:text-yellow-400"
          disabled={dataLoading}
        >
          {dataLoading ? "Submitting..." : "Add Item"}
        </button>

        {/* Error Message */}
        {publishError && (
          <p className="text-red-600 text-center">{publishError}</p>
        )}
      </form>
    </div>
  );
}

export default AddItem;
