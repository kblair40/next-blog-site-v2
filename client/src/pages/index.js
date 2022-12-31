import { Suspense } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

import HomePage from "src/components/HomePage";
import { fetchAPI } from "src/utils/api";

const ShareModal = dynamic(() => import("src/components/Modals/ShareModal"), {
  suspense: true,
});

const Home = ({ homepage, articles }) => {
  return (
    <AnimatePresence>
      <motion.div
        key="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Flex direction="column" align="center">
          {/* <Box border="1px solid blue"> */}
          <HomePage homepage={homepage} articles={articles} />
          {/* </Box> */}

          {/* <ShareModal /> */}

          <Suspense fallback={<div />}>
            <ShareModal />
          </Suspense>
        </Flex>
      </motion.div>
    </AnimatePresence>
  );
};

export async function getStaticProps() {
  // const homepageRes = await fetchAPI("/homepage", {
  //   populate: {
  //     featured_post: {
  //       populate: { article: "*" },
  //     },
  //   },
  // });

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
