import Image from "next/image";

import { auth, provider } from "../firebase";

function Login() {
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="grid place-items-center">
      <Image
        src="https://www.logo.wine/a/logo/Facebook/Facebook-f_Logo-Blue-Logo.wine.svg"
        height={400}
        width={400}
        objectFit="contain"
      />
      <h1
        onClick={signIn}
        className="p-5 bg-blue-500 rounded-full text-white text-center cursor-pointer"
      >
        Login with Google
      </h1>
    </div>
  );
}

export default Login;
