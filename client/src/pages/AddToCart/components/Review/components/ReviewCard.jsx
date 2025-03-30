import React from "react";
import { formatDateTime } from "../../../../../utils/utils";
function ReviewCard({ comments }) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap flex-col">
      {comments &&
        comments.map((comment) => (
          <div
            key={comment._id}
            className="w-full rounded-lg overflow-hidden shadow-xl border border-gray-400"
          >
            <div className="px-6 py-4">
              <div className="flex items-center mb-3">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src="/avatar.svg"
                  alt="User Avatar"
                />
                <div>
                  <p className="text-xl font-semibold text-gray-700">
                    {comment?.username}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-base">{comment?.content}</p>
            </div>
            <div className="px-6 py-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {formatDateTime(comment?.createdAt)}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ReviewCard;
