import {
  DotsHorizontalIcon,
  VideoCameraIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import Contact from "./Contact";
import * as EmailValidator from "email-validator";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

function Contacts() {
  const [user] = useAuthState(auth);

  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );
    if (!input) return;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <div className="hidden lg:flex flex-col py-2 px-2 mt-5">
      <div className="flex justify-between items-center text-gray-500 mb-5">
        <h2 className="text-xl">Messenger</h2>
        <div className="flex space-x-2">
          <VideoCameraIcon className="h-6" />
          <DotsHorizontalIcon className="h-6" />
        </div>
      </div>
      <div className="flex p-2 space-x-1 items-center rounded-full  bg-gray-200">
        <SearchIcon className="h-5 w-5 text-gray-500" />
        <input
          className="bg-gray-200 focus:outline-none"
          placeholder="Search Messenger"
        />
      </div>
      <button
        className=" my-4 p-3 text-xl uppercase w-full hover:bg-gray-200"
        onClick={() => createChat()}
      >
        Start a new chat
      </button>
      {chatsSnapshot?.docs.map((chat) => (
        <Contact key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </div>
  );
}

export default Contacts;
