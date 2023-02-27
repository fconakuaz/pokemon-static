import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider, useSSR } from "@nextui-org/react";
import { darkTheme } from "themes";

export default function App({ Component, pageProps }: AppProps) {
  // 2. Use at the root of your app
  const { isBrowser } = useSSR();
  return (
    isBrowser && (
      <NextUIProvider theme={darkTheme}>
        <Component {...pageProps} />
      </NextUIProvider>
    )
  );
}
