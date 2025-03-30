import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import InsertImage from "./components/InsertImage";
import { v4 as uuidv4 } from "uuid";
import { updateItems } from "../../../../services/GlobalApi";
import { ToastFailure, ToastSuccess } from "../../../../components/Toast";
import { useLocation, useNavigate } from "react-router-dom";

function AddItem() {
  const existingItem = useLocation().state;
  const navigate = useNavigate();
  const [item, setItem] = useState(existingItem?.category); // setting category

  const [imageFiles, setImageFiles] = useState(
    existingItem?.imageUrl
      ? existingItem.imageUrl.map((url) => ({
          id: uuidv4(),
          file: null,
          url,
          loading: false,
          success: true,
        }))
      : [
          {
            id: uuidv4(),
            file: null,
            url: null,
            loading: false,
            success: false,
          },
          {
            id: uuidv4(),
            file: null,
            url: null,
            loading: false,
            success: false,
          },
          {
            id: uuidv4(),
            file: null,
            url: null,
            loading: false,
            success: false,
          },
        ]
  );
  const [formData, setForm] = useState({
    title: existingItem?.title,
    price: existingItem?.price,
    description: existingItem?.description,
    category: existingItem?.category,
  });

  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    if (existingItem) {
      setItem(existingItem.category);
      setForm({
        title: existingItem.title,
        price: existingItem.price,
        description: existingItem.description,
        category: existingItem?.category,
      });
    }
  }, [existingItem]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.category ||
      !formData.description ||
      imageFiles.some((imageFile) => imageFile.url === null)
    ) {
      return ToastFailure("Fill all the fields");
    }

    try {
      setDataLoading(true);
      const newObject = {
        ...formData,
        category: item,
        imageUrl: imageFiles.map((imageFile) => imageFile.url),
      };
      const response = await updateItems(existingItem._id, newObject);
      setDataLoading(false);
      navigate(`/product/${response?.data?.data?.slug}`);
      ToastSuccess(response?.data?.message);
    } catch (err) {
      setDataLoading(false);
      ToastFailure("Something Went Wrong");
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
    uploadData.append("upload_preset", "A.R Landscape");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_API_KEY}/image/upload`,
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
      setImageFiles((prevFiles) =>
        prevFiles.map((img) =>
          img.id === id ? { ...img, loading: false, success: false } : img
        )
      );
      ToastFailure("Error in uploading Image");
    }
  };

  const handleItemDataChange = (e) => {
    setForm({ ...formData, [e.target.id]: e.target.value });
  };

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
            value={formData.title}
            variant="outlined"
            className="flex flex-1"
            onChange={handleItemDataChange}
          />
          <TextField
            id="price"
            label="Price"
            value={formData.price}
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

        {imageFiles.map((imageFile) => (
          <InsertImage
            key={imageFile.id}
            onFileChange={(file) => handleImageFileChange(file, imageFile.id)}
            onUpload={() => handleUploadImage(imageFile.file, imageFile.id)}
            imageFile={imageFile}
          />
        ))}

        <ReactQuill
          theme="snow"
          value={formData?.description}
          placeholder="Enter Description"
          onChange={(value) => setForm({ ...formData, description: value })}
          className="h-44 mb-10"
        />

        <button
          type="submit"
          className="text-center flex items-center justify-center w-full py-2 px-1 text-md text-white font-md bg-green-900 rounded-md hover:bg-green-950 duration-105 transition-all hover:text-yellow-400"
          disabled={dataLoading}
        >
          {dataLoading ? "Submitting..." : "Update Item"}
        </button>
      </form>
    </div>
  );
}

export default AddItem;
