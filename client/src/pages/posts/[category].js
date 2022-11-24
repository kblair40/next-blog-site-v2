import React, { Fragment } from "react";
import { Flex, Stack, Text } from "@chakra-ui/react";

// import Seo from "src/components/Seo";
import { fetchAPI } from "src/utils/api";
import Card from "src/components/Articles/Card";

const Posts = ({ articles, category }) => {
  // const seo = {
  //   metaTitle: article.attributes.title,
  //   metaDescription: article.attributes.description,
  //   shareImage: article.attributes.image,
  //   article: true,
  // };
  // console.log("ARTICLES/CATEGORIES:", { articles, category });

  return (
    <Fragment>
      <Flex justify="center">
        <Stack mt="2rem" spacing="1.5rem">
          {/* <Text
            mt="-1rem"
            alignSelf="start"
            textTransform="capitalize"
            fontSize="3xl"
            fontWeight="600"
          >
            {category}
          </Text> */}
          {articles && articles.length
            ? articles.map((article, i) => {
                return <Card article={article} key={i} />;
              })
            : null}
        </Stack>
      </Flex>
    </Fragment>
  );
};

export async function getStaticProps({ params }) {
  console.log("PARAMS:", params);
  const category = params.category;
  console.log("CATEGORY:", category);
  // const articlesRes = await fetchAPI("/articles", {
  //   populate: "*",
  // });
  const categoriesRes = await fetchAPI("/categories", {
    filters: {
      name: category,
    },
    populate: {
      articles: { populate: "image" },
    },
  });

  // console.log("n\nARTICLES RES:", articlesRes.data);
  console.log("n\nCATEGORIES RES:", categoriesRes.data);
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
