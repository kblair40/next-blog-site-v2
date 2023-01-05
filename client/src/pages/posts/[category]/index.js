import React from "react";
import { Flex, Stack, Box } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import PiggyBank from "src/components/PiggyBank";
import { fetchAPI } from "src/utils/api";
import Card from "src/components/Card";

const Posts = ({ articles }) => {
  const { asPath } = useRouter();

  return (
    // <AnimatePresence>
    //   <motion.div
    //     key={asPath}
    //     initial={{ opacity: 0 }}
    //     animate={{ opacity: 1 }}
    //     exit={{ opacity: 0 }}
    //     layout
    //   >
    <Box
      // pt="2rem"
      w="100%"
      border="1px solid green"
      // h="100%"
      // position="relative"
      // minH="max-content"
      // h={`calc(100vh - 151px)`} //nav-80px + footer-71px
      // overflowY="auto"
    >
      <ArticleList articles={articles} asPath={asPath} />
    </Box>
    //   </motion.div>
    // </AnimatePresence>
  );

  // return (
  //   <AnimatePresence>
  //     <motion.div
  //       key={asPath}
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1 }}
  //       exit={{ opacity: 0 }}
  //       layout
  //     >
  //       <Box w="100%" pb="2rem">
  //         <ArticleList articles={articles} />
  //       </Box>
  //     </motion.div>
  //   </AnimatePresence>
  // );
};

const ArticleList = ({ articles, asPath }) => {
  const sortArticles = (a, b) => {
    // console.log("A/B:", { a, b });
    const { createdAt: aCreatedAt } = a.attributes;
    const { createdAt: bCreatedAt } = b.attributes;
    return dayjs(aCreatedAt).isBefore(dayjs(bCreatedAt)) ? 1 : -1;
  };

  return (
    <AnimatePresence>
      <motion.div
        key={asPath}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          // border: "1px solid blue",
          // height: "100%",
          position: "relative",
          // minHeight: "calc(100vh - 151px)",
          // minHeight: "calc(100vh - 80px)",
        }}
      >
        <Flex
          h="100%"
          w="100%"
          position="absolute"
          justify="center"
          px={{ base: "1rem", sm: "2rem" }}
          border="1px solid red"
          minHeight="calc(100vh - 151px)"
          maxH="max-content"
        >
          {!!articles && !!articles.length ? (
            <Stack
              w="100%"
              // position="absolute"
              // mt="2rem"
              spacing="1.5rem"
              border="1px solid orange"
            >
              {articles && articles.length
                ? articles.sort(sortArticles).map((article, i) => {
                    return <Card article={article} key={i} />;
                  })
                : null}
            </Stack>
          ) : (
            <PiggyBank />
          )}
        </Flex>
      </motion.div>
    </AnimatePresence>
  );
};

// const ArticleList = ({ articles }) => {
//   const sortArticles = (a, b) => {
//     // console.log("A/B:", { a, b });
//     const { createdAt: aCreatedAt } = a.attributes;
//     const { createdAt: bCreatedAt } = b.attributes;
//     // console.log("CREATED STAMPS:", { aCreatedAt, bCreatedAt });
//     return dayjs(aCreatedAt).isBefore(dayjs(bCreatedAt)) ? 1 : -1;
//   };

//   if (!!articles && !!articles.length) {
//     return (
//       <Flex justify="center" px={{ base: "1rem", sm: "2rem" }}>
//         <Stack mt="2rem" spacing="1.5rem">
//           {articles && articles.length
//             ? articles.sort(sortArticles).map((article, i) => {
//                 return <Card article={article} key={i} />;
//               })
//             : null}
//         </Stack>
//       </Flex>
//     );
//   } else {
//     return (
//       <Flex justify="center" px={{ base: "1rem", sm: "2rem" }}>
//         <PiggyBank />
//       </Flex>
//     );
//   }
// };

export async function getStaticProps({ params }) {
  const categoriesRes = await fetchAPI("/categories", {
    filters: {
      name: params.category,
    },
    populate: {
      articles: { populate: "*" },
    },
  });
  // console.log("categoriesRes:", categoriesRes);

  let articles;

  try {
    articles = categoriesRes.data[0].attributes.articles.data;
    console.log("ARTICLE:", categoriesRes.data[0].attributes);
  } catch (e) {
    articles = [];
  }

  return {
    props: { articles: articles.reverse() },
    // revalidate: 1,
  };
}

export async function getStaticPaths() {
  let categoriesRes;
  try {
    categoriesRes = await fetchAPI("/categories", { fields: ["slug"] });
  } catch (e) {
    console.log("FAILED FETCHING ARTICLES:", e);
  }

  let paths = [];
  if (categoriesRes?.data) {
    paths = categoriesRes.data.map((cat) => ({
      params: {
        category: cat.attributes.slug,
      },
    }));
  }

  return { paths, fallback: false };
}

export default Posts;
