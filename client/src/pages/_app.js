import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import ReactGA from "react-ga";

import theme from "src/utils/theme";
import Layout from "src/components/Layout";
import "../assets/css/style.css";

const TRACKING_ID = "UA-250380145-1";
ReactGA.initialize(TRACKING_ID);

const MyApp = ({ Component, pageProps }) => {
  // console.log("\n\nPAGE PROPS:", pageProps, "\n\n");
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
