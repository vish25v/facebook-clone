import Image from "next/image";
import { Circle } from "better-react-spinkit";

function Loading() {
  return (
    <div className="grid place-items-center">
      <Image
        src="https://www.logo.wine/a/logo/Facebook/Facebook-f_Logo-Blue-Logo.wine.svg"
        height={400}
        width={400}
        objectFit="contain"
      />
      <Circle color="#3B82F6" size={60} />
    </div>
  );
}

export default Loading;
