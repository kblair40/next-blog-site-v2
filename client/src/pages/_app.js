import React, { useEffect } from "react";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import ReactGA from "react-ga";
import dynamic from "next/dynamic";

import theme from "src/utils/theme";
import Layout from "src/components/Layout";
import "../assets/css/style.css";
import "src/styles/piggy.css";
import { Event, initGA } from "src/components/Analytics";

dynamic(() => import("../assets/css/editor.css"));

// const TRACKING_ID = "UA-250380145-1";
// ReactGA.initialize(TRACKING_ID, { redactEmail: false });

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>Money and Other Things</title>
        <meta
          name="description"
          content="A blog about money, and other things"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <ChakraProvider theme={theme} resetCSS={true}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
};

export default MyApp;
