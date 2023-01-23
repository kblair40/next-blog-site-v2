import React, { useEffect } from "react";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import Script from "next/script";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import theme from "src/utils/theme";
import Layout from "src/components/Layout";
import * as ga from "src/utils/analytics";

import "../assets/css/style.css";
import "src/styles/piggy.css";

dynamic(() => import("../assets/css/editor.css"));

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
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
