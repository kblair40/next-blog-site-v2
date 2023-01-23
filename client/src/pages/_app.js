import React from "react";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import Script from "next/script";
// import ReactGA from "react-ga";
import dynamic from "next/dynamic";

import theme from "src/utils/theme";
import Layout from "src/components/Layout";
import "../assets/css/style.css";
import "src/styles/piggy.css";
// import { Event, initGA, PageView } from "src/components/Analytics";
// import { PageView } from "src/components/Analytics/Analytics";

dynamic(() => import("../assets/css/editor.css"));

// const TRACKING_ID = "UA-250380145-1";
// ReactGA.initialize(TRACKING_ID, { redactEmail: false });

const MyApp = ({ Component, pageProps }) => {
  // useEffect(() => {
  //   initGA();
  //   PageView();
  // }, []);

  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-R824V7XKR1"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', 'G-R824V7XKR1');
        `,
        }}
      />

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
