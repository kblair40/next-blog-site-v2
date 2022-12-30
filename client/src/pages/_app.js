import React from "react";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
// import localFont from "@next/font/local";
import ReactGA from "react-ga";
import dynamic from "next/dynamic";

import theme from "src/utils/theme";
import Layout from "src/components/Layout";
import "../assets/css/style.css";
import "src/styles/piggy.css";

dynamic(() => import("../assets/css/editor.css"));

console.log("DOCUMENT:", typeof document);

const TRACKING_ID = "UA-250380145-1";
ReactGA.initialize(TRACKING_ID);

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head></Head>
      <ChakraProvider theme={theme} resetCSS={true}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
};

export default MyApp;

// export const nunito = localFont({
//   src: [
//     {
//       path: "./Nunito-Bold.ttf",
//       weight: "700",
//       style: "normal",
//       display: "swap",
//       fallback: ["system-ui"],
//     },
//     {
//       path: "./Nunito-Italic.ttf",
//       weight: "400",
//       style: "italic",
//       display: "swap",
//       fallback: ["system-ui"],
//     },
//     {
//       path: "./Nunito-Light.ttf",
//       weight: "300",
//       style: "normal",
//       display: "swap",
//       fallback: ["system-ui"],
//     },
//     {
//       path: "./Nunito-LightItalic.ttf",
//       weight: "300",
//       style: "italic",
//       display: "swap",
//       fallback: ["system-ui"],
//     },
//     {
//       path: "./Nunito-Medium.ttf",
//       weight: "500",
//       style: "normal",
//       display: "swap",
//       fallback: ["system-ui"],
//     },
//     {
//       path: "./Nunito-MediumItalic.ttf",
//       weight: "500",
//       style: "italic",
//       display: "swap",
//       fallback: ["system-ui"],
//     },
//     {
//       path: "./Nunito-Regular.ttf",
//       weight: "400",
//       style: "normal",
//       display: "swap",
//       fallback: ["system-ui"],
//     },
//     {
//       path: "./Nunito-SemiBold.ttf",
//       weight: "600",
//       style: "normal",
//       display: "swap",
//       fallback: ["system-ui"],
//     },
//   ],
// });

// export const playfair = localFont({
//   src: [
//     {
//       path: "./PlayfairDisplay-Bold.ttf",
//       weight: "700",
//       style: "normal",
//       display: "swap",
//       fallback: ["system-ui"],
//     },
//     {
//       path: "./PlayfairDisplay-ExtraBold.ttf",
//       weight: "800",
//       style: "normal",
//       display: "swap",
//       fallback: ["system-ui"],
//     },
//     {
//       path: "./PlayfairDisplay-Medium.ttf",
//       weight: "500",
//       style: "normal",
//       display: "swap",
//       fallback: ["system-ui"],
//     },
//     {
//       path: "./PlayfairDisplay-Regular.ttf",
//       weight: "400",
//       style: "normal",
//       display: "swap",
//       fallback: ["system-ui"],
//     },
//     {
//       path: "./PlayfairDisplay-SemiBold.ttf",
//       weight: "600",
//       style: "normal",
//       display: "swap",
//       fallback: ["system-ui"],
//     },
//   ],
// });
