import { TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { createComment } from "../../../../../services/GlobalApi";
import { CircularProgress } from "@mui/material";
import { validateEmail } from "../../../../../utils/utils";
import { ToastFailure, ToastSuccess } from "../../../../../components/Toast";

function ReviewForm({ productId, handleNewComments }) {
  const nameElement = useRef();
  const emailElement = useRef();
  const reviewElement = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = nameElement.current?.value.trim();
    const email = emailElement.current?.value.trim();
    const content = reviewElement.current?.value.trim();

    // Validate inputs
    if (
      !username ||
      !email ||
      !content ||
      !productId ||
      !validateEmail(email)
    ) {
      ToastFailure("Please fill all fields correctly!");
      return;
    }

    setIsLoading(true);
    try {
      const newObject = { productId, username, email, content };
      const newComment = await createComment(newObject);

      handleNewComments(newComment?.data?.comment);
      ToastSuccess(`Thanks, ${username}! Your comment has been added.`);

      // Clear form fields after successful submission
      nameElement.current.value = "";
      emailElement.current.value = "";
      reviewElement.current.value = "";
    } catch (err) {
      ToastFailure("Something went wrong! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <form
        className="border border-gray-600 p-5 py-7 my-10"
        onSubmit={handleSubmit}
      >
        <h2 className="text-gray-600 text-md mb-2">
          Give feedback about the product.
        </h2>
        <div className="flex gap-3 items-center flex-col md:flex-row w-full">
          <TextField
            id="outlined-basic"
            label="Name *"
            type="text"
            variant="outlined"
            inputRef={nameElement}
            sx={{ width: "100%" }}
          />
          <TextField
            id="outlined-basic"
            label="Email *"
            type="email"
            variant="outlined"
            inputRef={emailElement}
            sx={{ width: "100%" }}
          />
        </div>
        <textarea
          className="w-full p-3 border border-green-900 rounded-md focus:border-green-900 my-3"
          placeholder="Your review *"
          ref={reviewElement}
        />

        <button
          type="submit"
          className="w-full md:max-w-60 focus:outline-none bg-green-900 hover:bg-green-950  px-5 py-2  text-white text-md hover:text-yellow-400 duration-75 flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress
              size={"20px"}
              sx={{
                color: "yellow",
              }}
            />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </>
  );
}

export default ReviewForm;
