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
    <AnimatePresence>
      <motion.div
        key={asPath}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
        style={{ paddingTop: "1.5rem" }}
        layout
      >
        <Box
          w="100%"
          // h="100%"
          // border="1px solid green"
          // p="2rem 0 1rem"
          // position="absolute"
          // position="relative"
          // h="max-content"
          //
        >
          <ArticleList articles={articles} />
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

const ArticleList = ({ articles }) => {
  const sortArticles = (a, b) => {
    // console.log("A/B:", { a, b });
    const { createdAt: aCreatedAt } = a.attributes;
    const { createdAt: bCreatedAt } = b.attributes;
    return dayjs(aCreatedAt).isBefore(dayjs(bCreatedAt)) ? 1 : -1;
  };

  return (
    <Flex
      w="100%"
      justify="center"
      // h="100%"
      px={{ base: "1rem", sm: "2rem" }}
      // border="1px solid red"
      // position="absolute"
      // top="26px"
      // border="1px solid blue"
      // p="2rem 0 1rem"
      // h={{}}
    >
      {!!articles && !!articles.length ? (
        <Stack
          w="100%"
          // position="absolute"
          // top="32px"
          // px={{ base: "1rem", sm: "2rem" }}
          // mt="2rem"
          // position="absolute"
          spacing="1.5rem"
          // border="1px solid orange"
          // px=""
          // p="2rem 0 8rem"
          // pb="3rem"
        >
          {articles && articles.length
            ? articles
                .sort(sortArticles)
                .concat(articles)
                .map((article, i) => {
                  return <Card article={article} key={i} />;
                })
            : null}
        </Stack>
      ) : (
        <PiggyBank />
      )}
    </Flex>
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
