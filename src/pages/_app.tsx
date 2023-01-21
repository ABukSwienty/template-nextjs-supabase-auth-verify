import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

const toastOptions = {
  position: "top-right" as "top-right",
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ChakraProvider>
        <Toaster toastOptions={toastOptions} />
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}
