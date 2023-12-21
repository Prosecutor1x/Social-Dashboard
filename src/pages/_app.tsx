import { AuthContextProvider } from "@/context/auth-context";
import { UserContextProvider } from "@/context/user-context";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
}
