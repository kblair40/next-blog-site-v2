import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import ReactGA from "react-ga";
import { Nunito, Playfair_Display } from "@next/font/google";

import theme from "src/utils/theme";
import Layout from "src/components/Layout";
import "../assets/css/style.css";

const TRACKING_ID = "UA-250380145-1";
ReactGA.initialize(TRACKING_ID);

const MyApp = ({ Component, pageProps }) => {
  // console.log("\n\nPAGE PROPS:", pageProps, "\n\n");
  const nunito = Nunito({ subsets: ["latin"] });
  const playfair = Playfair_Display({ subsets: ["latin"] });

  return (
    <>
      <Head></Head>
      <ChakraProvider theme={theme} resetCSS={true}>
        <Layout>
          <main className={`${nunito.className} ${playfair.className}`}>
            <Component {...pageProps} />
          </main>
        </Layout>
      </ChakraProvider>
    </>
  );
};

export default MyApp;
