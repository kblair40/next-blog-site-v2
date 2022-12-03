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
    },
    {
      path: "./Nunito-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./Nunito-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Nunito-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./Nunito-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Nunito-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./Nunito-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Nunito-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
});

export const playfair = localFont({
  src: [
    {
      path: "./PlayfairDisplay-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./PlayfairDisplay-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./PlayfairDisplay-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./PlayfairDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./PlayfairDisplay-SemiBold.ttf",
      weight: "600",
      style: "normal",
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
