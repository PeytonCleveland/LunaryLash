import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components";
import { Unbounded } from "@next/font/google";

const unbounded = Unbounded({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --unbounded-font: ${unbounded.style.fontFamily};
          }
        `}
      </style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
