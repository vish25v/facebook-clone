import Image from "next/image";
import { ChatAltIcon, ShareIcon, ThumbUpIcon } from "@heroicons/react/outline";
import { ThumbUpIcon as FilledThumbUpIcon } from "@heroicons/react/solid";
import { useState } from "react";

function Post({ name, message, timestamp, image, postImage }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
  };
  return (
    <div className="flex flex-col mb-5">
      <div className="p-5 bg-white rounded-t-2xl shadow-sm ">
        <div className="flex items-center space-x-2">
          <img
            src={image}
            width={40}
            height={40}
            alt=""
            className="rounded=full"
          />
          <div>
            <p className="font-medium">{name}</p>
            {timestamp ? (
              <p className="text-xs text-gray-400">
                {new Date(timestamp?.toDate()).toLocaleString()}
              </p>
            ) : (
              <p className="text-xs text-gray-400">Loading..</p>
            )}
          </div>
        </div>
        <p className="pt-4">{message}</p>
      </div>
      {postImage && (
        <div className="relative h-56  md:h-96 bg-white">
          <Image src={postImage} objectFit="cover" layout="fill" />
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t ">
        <div
          className="inputIcon rounded-none rounded-bl-2xl "
          onClick={handleLike}
        >
          {isLiked ? (
            <FilledThumbUpIcon className="h-4 text-blue-500" />
          ) : (
            <ThumbUpIcon className="h-4" />
          )}
          <p className="text-xs sm:text-base">{isLiked ? "Liked" : "Like"}</p>
        </div>
        <div className="post__option">
          <p></p>
        </div>

        <div className="inputIcon rounded-none">
          <ChatAltIcon className="h-4" />
          <p className="text-xs sm:text-base">Comment</p>
        </div>

        <div className="inputIcon rounded-none rounded-bl-2xl">
          <ShareIcon className="h-4" />
          <p className="text-xs sm:text-base">Share</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
