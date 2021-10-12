import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  PhoneIcon,
  VideoCameraIcon,
  InformationCircleIcon,
  PlusCircleIcon,
  PhotographIcon,
  EmojiHappyIcon,
  ThumbUpIcon,
  MicrophoneIcon,
} from "@heroicons/react/solid";
import Message from "./Message";
import { useState, useRef } from "react";
import firebase from "firebase/compat/app";
import getRecipientEmail from "../../Utils/GetRecipientEmail";
import TimeAgo from "timeago-react";

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const endOfMessageRef = useRef(null);

  const router = useRouter();
  const [messageSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const [recipientSnapshot] = useCollection(
    db
      .collection("user")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );
  const showMessages = () => {
    if (messageSnapshot) {
      return messageSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const scrollToBottom = () => {
    endOfMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    // Update the lasr seen...
    db.collection("user").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput("");
    scrollToBottom();
  };
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(chat.users, user);

  return (
    <>
      <div className="sticky bg-white z-100 top-0 flex p-3 items-center border-b-2 border-gray-200">
        <Image
          className="rounded-full"
          src={recipient ? recipient?.photoURL : "/user.png"}
          objectFit="cover"
          width={50}
          height={50}
          layout="fixed"
        />
        <div className="ml-2 flex-1">
          <h3 className="font-bold">
            {recipient ? recipient.displayName : recipientEmail}
          </h3>
          {recipientSnapshot ? (
            <p className="text-sm text-gray-500">
              Active{" "}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "unavailable"
              )}
            </p>
          ) : (
            <p>Loading last active....</p>
          )}
        </div>
        <div className="flex space-x-3">
          <PhoneIcon className="chatInputIcon" />
          <VideoCameraIcon className="chatInputIcon" />
          <InformationCircleIcon className="chatInputIcon" />
        </div>
      </div>
      <div style={{ minHeight: "80vh" }} className=" h-0 p-3 overflow-y-auto">
        {showMessages()}
        <div className="mb-3" ref={endOfMessageRef}></div>
      </div>
      <form className="flex items-center px-2 space-x-2">
        <div className="flex space-x-2">
          <PlusCircleIcon className="chatInputIcon" />
          <PhotographIcon className="chatInputIcon" />
          <MicrophoneIcon className="chatInputIcon" />
          <EmojiHappyIcon className="chatInputIcon" />
        </div>
        <div className=" flex-1 p-2 px-3 rounded-full  bg-gray-100">
          <input
            className="bg-gray-100 focus:outline-none"
            placeholder="Aa"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <ThumbUpIcon className="h-7 chatInputIcon" />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send Message
        </button>
      </form>
    </>
  );
}

export default ChatScreen;
