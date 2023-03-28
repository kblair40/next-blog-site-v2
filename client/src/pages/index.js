import { Flex } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";


import HomePage from "src/components/HomePage";
import { fetchAPI } from "src/utils/api";

const ShareModal = dynamic(() => import("src/components/Modals/ShareModal"), {
  // suspense: true,
  ssr: false,
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

          {/* <Suspense fallback={<div />}> */}
          <ShareModal />
          {/* </Suspense> */}
        </Flex>
      </motion.div>
    </AnimatePresence>
  );
};

export async function getStaticProps() {
  let [home, articles] = await Promise.all([
    fetchAPI("/homepage", {
      populate: {
        featured_post: {
          populate: { article: "*" },
        },
        featured_posts: {
          populate: { articles: "* " }
        }
      },
    }),
    fetchAPI("/articles", {
      sort: "createdAt:desc",
    }),
  ]);

  // let featuredPosts = await fetchAPI('/featured_posts', {
  //   populate: { articles: "*" }
  // })
  // let featuredPosts = await fetchAPI('/featured_posts')


  console.log("\n\n\n\n\n\n\n\n\n\n\n\nARTICLES RES:", articles);
  console.log("\n\n\n\n\n\n\n\nHOME RES:", home);
  console.log("\n\n\n\n")

  return {
    props: {
      homepage: home?.data || null,
      articles: articles?.data?.slice(0, 5) || null,
    },
    revalidate: 1,
  };
}

export default Home;
