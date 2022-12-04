import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
// import localFont from "@next/font/local";
// import ReactGA from "react-ga";
import dynamic from "next/dynamic";

import theme from "src/utils/theme";
import Layout from "src/components/Layout";
import "../assets/css/style.css";

const ReactGA = dynamic(() =>
  import("react-ga").then((comp) => {
    console.log("\n\nREACT GA:", comp, "\n\n");
  })
);

console.log("REACTGA:", ReactGA);

const TRACKING_ID = "UA-250380145-1";
if (ReactGA && ReactGA.initialize) {
  ReactGA.initialize(TRACKING_ID);
}

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
