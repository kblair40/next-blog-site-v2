import { createContext } from "react";
import App from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { fetchAPI } from "src/utils/api";
import theme from "src/utils/theme";
import { getStrapiMedia } from "src/utils/media";
import "../assets/css/style.css";
import Layout from "src/components/Layout";

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const MyApp = ({ Component, pageProps }) => {
  const { global } = pageProps;

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(global.attributes.favicon)}
        />
      </Head>
      <ChakraProvider theme={theme} resetCSS={true}>
        <GlobalContext.Provider value={global.attributes}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GlobalContext.Provider>
      </ChakraProvider>
    </>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI("/global", {
    populate: {
      favicon: "*",
      defaultSeo: {
        populate: "*",
      },
    },
  });
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data } };
};

export default MyApp;
