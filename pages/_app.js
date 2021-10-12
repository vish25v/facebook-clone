import "../styles/globals.css";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./login";
import Loading from "../Components/Loading";
import { useEffect } from "react";
import firebase from "firebase/compat/app";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection("user").doc(user.uid).set(
        {
          email: user.email,
          displayName: user.displayName,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;
  return <Component {...pageProps} />;
}

export default MyApp;
