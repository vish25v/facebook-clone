import Image from "next/image";
import getRecipientEmail from "../../Utils/GetRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";

function Contact({ id, users }) {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [recipienSnapshot] = useCollection(
    db.collection("user").where("email", "==", getRecipientEmail(users, user))
  );
  const recipient = recipienSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };
  return (
    <div
      onClick={enterChat}
      className="flex items-center space-x-3 mb-2 relative hover:bg-gray-200 cursor-pointer p-2 rounded-xl "
    >
      <Image
        className="rounded-full"
        src={recipient ? recipient?.photoURL : "/user.png"}
        objectFit="cover"
        width={50}
        height={50}
        layout="fixed"
      />

      <p>{recipient ? recipient.displayName : recipientEmail}</p>
      {/* <div className="absolute bottom-2 left-7 bg-green-400 h-3 w-3 rounded-full"></div> */}
    </div>
  );
}

export default Contact;
