import Image from "next/image";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";
import "firebase/compat/auth";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "../../Utils/link";

function Header() {
  const [user] = useAuthState(auth);

  return (
    <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
      {/* left */}
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="https://www.logo.wine/a/logo/Facebook/Facebook-f_Logo-Blue-Logo.wine.svg"
            width={50}
            height={50}
            layout="fixed"
          />
        </Link>
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
          <SearchIcon className="h-5 text-gray-600" />
          <input
            className=" hidden xl:inline-flex w-40 lg:w-60 ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink "
            type="text"
            placeholder="Search Facebook"
          />
        </div>
      </div>
      {/* Center */}
      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon active Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center sm:space-x-2 justify-end">
        <Image
          onClick={() => auth.signOut()}
          className="rounded-full cursor-pointer"
          src={user.photoURL}
          width="40"
          height="40"
          layout="fixed"
        />
        <p className="font-semibold pr-3 whitespace-nowrap">
          {user.displayName}
        </p>
        <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" />
      </div>
    </div>
  );
}

export default Header;
