import React, { useEffect, useState } from "react";
import {
  deleteItems,
  getPlantsDetails,
  fetchDetailsById,
} from "../../../../services/GlobalApi";
import EditCard from "./components/EditCard";
import { ToastFailure, ToastSuccess } from "../../../../components/Toast";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function EditItems({ category }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchItemsDetails = async () => {
      try {
        setLoading(true);
        const response = await getPlantsDetails(`?category=${category}`);
        setLoading(false);
        setItems(response?.data?.data);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    fetchItemsDetails();
  }, []);

  const handleEdit = async (id) => {
    try {
      const response = await fetchDetailsById(id);
      navigate("/edit", { state: response?.data?.data });
    } catch (err) {
      console.log("errp", err);
    }
  };

  // Handle Delete functionality
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmDelete) return;

    try {
      const response = await deleteItems(id);
      if (response?.data?.status === "success") {
        ToastSuccess("Item deleted successfully!");
        setItems((prevItems) => prevItems.filter((item) => item._id !== id)); // Remove the deleted item from the state
      } else {
        ToastFailure("Failed to delete the item.");
      }
    } catch (err) {
      console.error("Error deleting item:", err);
      ToastFailure("Error occurred while deleting the item.");
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center my-6">
          <CircularProgress size={"60px"} />
        </div>
      ) : (
        <>
          {items.map((item) => (
            <EditCard
              key={item?._id}
              category={item?.category}
              title={item?.title}
              slug={item?.slug}
              image={item?.imageUrl[0]}
              onEdit={() => handleEdit(item._id)}
              onDelete={() => handleDelete(item._id)}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default EditItems;
