import Image from "next/image";

import { PlusCircleIcon } from "@heroicons/react/solid";
import router from "next/router";

function CreateStory({ profileSrc }) {
  const enterCreateStory = () => {
    router.push("/stories/create");
  };
  return (
    <div
      onClick={enterCreateStory}
      className="relative h-56 w-32 bg-white rounded-3xl  cursor-pointer overflow-x transition duration-200 transform ease-in hover:scale-105 "
    >
      <Image
        className="rounded-t-3xl"
        src={profileSrc}
        width={124}
        height={150}
        objectFit="initial"
        layout="fixed"
      />
      <div className="flex flex-col items-center  z-50">
        <div className="absolute bottom-12 bg-white rounded-full ">
          <PlusCircleIcon className="text-blue-500 font-medium h-12 w-12" />
        </div>
        <div className="absolute bottom-5 font-medium">Create story</div>
      </div>
    </div>
  );
}

export default CreateStory;
