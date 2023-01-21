import { Inter } from "@next/font/google";

import { signIn, signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const loginHandler = async () => {
    await signIn("credentials", {
      email: "alexanderbukswienty@gmail.com",
      password: "Thomasmann007",
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
