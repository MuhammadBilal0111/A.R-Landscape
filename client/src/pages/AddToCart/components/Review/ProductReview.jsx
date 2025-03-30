import React, { useEffect, useState } from "react";
import { getComments } from "../../../../services/GlobalApi";
import ReviewCard from "./components/ReviewCard";
import ReviewForm from "./components/ReviewForm";
import { CircularProgress } from "@mui/material";

function ProductReview({ productId }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchComments() {
      try {
        setIsLoading(true);
        const comments = await getComments(productId);
        setComments(comments.data.comments);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchComments();
  }, []);
  const onNewComment = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
  };
 
  return (
    <>
      <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-800 text-center max-w-5xl mx-auto py-4">
        Feedback of our trustful customers
      </h1>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div>
          {comments && comments.length > 0 ? (
            <ReviewCard comments={comments} />
          ) : (
            <p className="text-gray-900">No Reviews yet</p>
          )}
          <ReviewForm productId={productId} handleNewComments={onNewComment} />
        </div>
      )}
    </>
  );
}

export default ProductReview;
