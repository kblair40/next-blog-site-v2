import { Suspense } from "react";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// import ShareModal from "src/components/Modals/ShareModal";
import HomePage from "src/components/HomePage";
import { fetchAPI } from "src/utils/api";

const ShareModal = dynamic(() => import("src/components/Modals/ShareModal"), {
  suspense: true,
});

const Home = ({ homepage, articles }) => {
  // console.log("\nFETCH RESPONSES:", { homepage });

  return (
    <AnimatePresence>
      <motion.div
        key="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Box>
          <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <HomePage homepage={homepage} articles={articles} />

          {/* <ShareModal /> */}

          <Suspense fallback={<div />}>
            <ShareModal />
          </Suspense>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export async function getStaticProps() {
  const homepageRes = await fetchAPI("/homepage", {
    populate: {
      featured_post: {
        populate: { article: "*" },
      },
    },
  });

  let [home, articles] = await Promise.all([
    fetchAPI("/homepage", {
      populate: {
        featured_post: {
          populate: { article: "*" },
        },
      },
    }),
    fetchAPI("/articles", {
      sort: "createdAt:desc",
    }),
  ]);

  if (articles && articles.data) {
    // TODO: REMOVE THIS.  ONLY MEANT TO SIMULATE HAVING 4 'recent' posts
    articles.data = [...articles.data, ...articles.data];
  }

  return {
    props: {
      // homepage: homepageRes?.data || null,
      homepage: home?.data || null,
      articles: articles?.data?.slice(0, 4) || null,
    },
    revalidate: 1,
  };
}

export default Home;
