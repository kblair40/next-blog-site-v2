import React from "react";
import { Flex, Stack } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

import { fetchAPI } from "src/utils/api";
import Card from "src/components/Card";

const Posts = ({ articles }) => {
  const router = useRouter();
  return (
    <AnimatePresence>
      <motion.div
        key={router.asPath}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        layout
      >
        <ArticleList articles={articles} />
      </motion.div>
    </AnimatePresence>
  );
};

const ArticleList = ({ articles }) => {
  return (
    <Flex justify="center">
      <Stack mt="2rem" spacing="1.5rem">
        {articles && articles.length
          ? articles.map((article, i) => {
              return <Card article={article} key={i} />;
            })
          : null}
      </Stack>
    </Flex>
  );
};

export async function getStaticProps({ params }) {
  // console.log("PARAMS:", params);
  const category = params.category;
  // console.log("CATEGORY:", category);
  const categoriesRes = await fetchAPI("/categories", {
    filters: {
      name: category,
    },
    populate: {
      articles: { populate: "*" },
    },
  });

  // console.log("n\nCATEGORIES RES:", categoriesRes.data);
  let articles = categoriesRes.data[0].attributes.articles.data;

  return {
    props: { articles, category },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  let categoriesRes;
  try {
    categoriesRes = await fetchAPI("/categories", { fields: ["slug"] });
    // console.log("\n\nCATEGORIES:", categoriesRes, "\n\n");
    // for (let cat of categoriesRes.data) {
    //   console.log("\nFOUND CATEGORY ATTRS::", cat.attributes, "\n");
    // }
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
