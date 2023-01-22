import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../components";
import { Unbounded, Alegreya_Sans } from "@next/font/google";

const unbounded = Unbounded({
  subsets: ["latin"],
});

const alegreyaSans = Alegreya_Sans({
  subsets: ["latin"],
  weight: "400",
});

const alegreyaSansBold = Alegreya_Sans({
  subsets: ["latin"],
  weight: "700",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --unbounded-font: ${unbounded.style.fontFamily};
            --alegreya-sans-font: ${alegreyaSans.style.fontFamily};
            --alegreya-sans-font-bold: ${alegreyaSansBold.style.fontFamily};
          }
        `}
      </style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
