import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHuAhpCmjTAF7d3T_Z3xJUmPNz5yJjUfg",
  authDomain: "facebook-clone2-3c0b7.firebaseapp.com",
  projectId: "facebook-clone2-3c0b7",
  storageBucket: "facebook-clone2-3c0b7.appspot.com",
  messagingSenderId: "861243735097",
  appId: "1:861243735097:web:8a14a15658c4b06495a1e8",
  measurementId: "G-PRJJQ86W90",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, provider };
