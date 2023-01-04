import React from "react";
import { Flex, Stack, Box } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import PiggyBank from "src/components/PiggyBank";
import { fetchAPI } from "src/utils/api";
import Card from "src/components/Card";

const Drafts = ({ articles }) => {
  const { asPath } = useRouter();

  return (
    <AnimatePresence>
      <motion.div
        key={asPath}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        layout
      >
        <Box
          // position="absolute"
          // top={0}
          w="100%"
          pb="2rem"
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
    // console.log("CREATED STAMPS:", { aCreatedAt, bCreatedAt });
    return dayjs(aCreatedAt).isBefore(dayjs(bCreatedAt)) ? 1 : -1;
  };

  if (!!articles && !!articles.length) {
    return (
      <Flex justify="center" px={{ base: "1rem", sm: "2rem" }}>
        <Stack mt="2rem" spacing="1.5rem">
          {articles && articles.length
            ? articles.sort(sortArticles).map((article, i) => {
                return <Card article={article} key={i} />;
              })
            : null}
        </Stack>
      </Flex>
    );
  } else {
    return (
      <Flex justify="center" px={{ base: "1rem", sm: "2rem" }}>
        <PiggyBank />
      </Flex>
    );
  }
};

export async function getStaticProps({ params }) {
  // docs on fetching in draft/preview publicationState
  // https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.html#publication-state
  try {
    // ONLY FETCHES NON-PUBLISHED ARTICLES
    const articlesRes = await fetchAPI(
      "/articles",
      {
        publicationState: "preview",
        filters: {
          publishedAt: {
            $null: true,
          },
        },
      },
      {
        populate: "*",
      }
    );

    console.log("articlesRes:", articlesRes);
    if (articlesRes && articlesRes.data && true) {
      for (let article of articlesRes.data) {
        console.log("\n\nARTICLE:", article.attributes);
      }
    }
  } catch (e) {
    console.log("\n\nARTICLES FETCH FAILED:", e);
  }

  return {
    props: { articles: [], fallback: "blocking" },
  };

  let articles;

  try {
    articles = categoriesRes.data[0].attributes.articles.data;
    console.log("ARTICLE:", categoriesRes.data[0].attributes);
  } catch (e) {
    articles = [];
  }

  return {
    props: { articles: articles.reverse(), fallback: "blocking" },
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

export default Drafts;
