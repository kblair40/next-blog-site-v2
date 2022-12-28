import React from "react";
import { Flex, Stack } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

import { fetchAPI } from "src/utils/api";
import Card from "src/components/Card";

// Love, Travel, Style, Guests, Gift Guides

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
    <Flex justify="center" px={{ base: "1rem", sm: "2rem" }}>
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
  const categoriesRes = await fetchAPI("/categories", {
    filters: {
      name: params.category,
    },
    populate: {
      articles: { populate: "*" },
    },
  });

  let articles;

  try {
    articles = categoriesRes.data[0].attributes.articles.data;
  } catch (e) {
    articles = [];
  }

  return {
    props: { articles },
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
