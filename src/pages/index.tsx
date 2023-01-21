import { Inter } from "@next/font/google";

import { signIn, signOut } from "next-auth/react";

export default function Home() {
  const loginHandler = async () => {
    await signIn("credentials", {
      email: "YOUR_EMAIL",
      password: "YOUR_PASSWORD",
      redirect: false,
    });
  };

  const logoutHandler = async () => {
    await signOut();
  };

  return (
    <>
      <button onClick={loginHandler}>login</button>
      <button onClick={logoutHandler}>logout</button>
    </>
  );
}
