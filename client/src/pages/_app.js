import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import ReactGA from "react-ga";
import localFont from "@next/font/local";

import theme from "src/utils/theme";
import Layout from "src/components/Layout";
import "../assets/css/style.css";

const TRACKING_ID = "UA-250380145-1";
ReactGA.initialize(TRACKING_ID);

export const nunito = localFont({
  src: [
    {
      path: "./Nunito-Bold.ttf",
      weight: "700",
      style: "normal",
      display: "swap",
    },
    {
      path: "./Nunito-Italic.ttf",
      weight: "400",
      style: "italic",
      display: "swap",
    },
    {
      path: "./Nunito-Light.ttf",
      weight: "300",
      style: "normal",
      display: "swap",
    },
    {
      path: "./Nunito-LightItalic.ttf",
      weight: "300",
      style: "italic",
      display: "swap",
    },
    {
      path: "./Nunito-Medium.ttf",
      weight: "500",
      style: "normal",
      display: "swap",
    },
    {
      path: "./Nunito-MediumItalic.ttf",
      weight: "500",
      style: "italic",
      display: "swap",
    },
    {
      path: "./Nunito-Regular.ttf",
      weight: "400",
      style: "normal",
      display: "swap",
    },
    {
      path: "./Nunito-SemiBold.ttf",
      weight: "600",
      style: "normal",
      display: "swap",
    },
  ],
});

export const playfair = localFont({
  src: [
    {
      path: "./PlayfairDisplay-Bold.ttf",
      weight: "700",
      style: "normal",
      display: "swap",
    },
    {
      path: "./PlayfairDisplay-ExtraBold.ttf",
      weight: "800",
      style: "normal",
      display: "swap",
    },
    {
      path: "./PlayfairDisplay-Medium.ttf",
      weight: "500",
      style: "normal",
      display: "swap",
    },
    {
      path: "./PlayfairDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
      display: "swap",
    },
    {
      path: "./PlayfairDisplay-SemiBold.ttf",
      weight: "600",
      style: "normal",
      display: "swap",
    },
  ],
});

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
