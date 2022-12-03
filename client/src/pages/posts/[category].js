import React from "react";
import { Flex, Stack } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

import { fetchAPI } from "src/utils/api";
import Card from "src/components/Card";

const Posts = ({ articles }) => {
  return (
    <AnimatePresence>
      <motion.div
        key="home"
        initial={{ opacity: 0 }}
        // whileInView={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Flex justify="center">
          <ArticleList articles={articles} />
          {/* <Stack mt="2rem" spacing="1.5rem">
            {articles && articles.length
              ? articles.map((article, i) => {
                  return <Card article={article} key={i} />;
                })
              : null}
          </Stack> */}
        </Flex>
      </motion.div>
    </AnimatePresence>
  );
};

const ArticleList = ({ articles }) => {
  return (
    <motion.div>
      <Stack mt="2rem" spacing="1.5rem">
        {articles && articles.length
          ? articles.map((article, i) => {
              return <Card article={article} key={i} />;
            })
          : null}
      </Stack>
    </motion.div>
  );
};

export async function getStaticProps({ params }) {
  console.log("PARAMS:", params);
  const category = params.category;
  console.log("CATEGORY:", category);
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
  // let articlesRes;
  // try {
  //   articlesRes = await fetchAPI("/articles", {
  //     filters: {
  //       category: {
  //         $eq: "money",
  //       },
  //     },
  //     // fields: ["category"],
  //   });
  // } catch (e) {
  //   console.log("FAILED FETCHING ARTICLES:", e);
  // }

  // console.log("\n\nARTICLES RES:", articlesRes, "\n\n");

  return {
    paths: [],
    // paths: ["/posts/a", "/posts/b", "/posts/idk"],
    // paths: articlesRes.data.map((article) => ({
    //   params: {
    //     category: article.attributes.category,
    //   },
    // })),
    // fallback: false,
    fallback: "blocking",
  };
}

// BACKUP
// export async function getStaticPaths() {
//   let articlesRes;
//   try {
//     articlesRes = await fetchAPI("/articles", {
//       fields: ["category"],
//     });
//   } catch (e) {
//     console.log("FAILED FETCHING ARTICLES:", e);
//   }

//   console.log("\n\nARTICLES RES:", articlesRes, "\n\n");

//   return {
//     paths: ["/posts/a", "/posts/b", "/posts/idk"],
//     // paths: articlesRes.data.map((article) => ({
//     //   params: {
//     //     category: article.attributes.category,
//     //   },
//     // })),
//     fallback: false,
//   };
// }

export default Posts;
