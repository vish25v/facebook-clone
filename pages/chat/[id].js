import Head from "next/head";
import Contacts from "../../Components/Contacts";
import Sidebar from "../../Components/Sidebar";
import ChatScreen from "../../Components/ChatScreen";
import Header from "../../Components/Header";
import { db, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../../Utils/GetRecipientEmail";

function Chat({ chat, messages }) {
  const [user] = useAuthState(auth);
  return (
    <div className="max-h-screen">
      <Head>
        <title>Messenger</title>
      </Head>
      <Header />
      <main className="flex">
        <Sidebar />
        <div className="flex-grow max-h-screen border-l-2 border-r-2">
          <ChatScreen chat={chat} messages={messages} />
        </div>
        <Contacts />
      </main>
    </div>
  );
}

export default Chat;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);

  //PREP the messages on the server

  const messageRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messageRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  //PREP the chats

  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };
  //console.log(chat, messages);
  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
