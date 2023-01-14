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
        <Box w="100%" pb="2rem">
          <ArticleList articles={articles} />
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

const ArticleList = ({ articles }) => {
  const sortArticles = (a, b) => {
    const { createdAt: aCreatedAt } = a.attributes;
    const { createdAt: bCreatedAt } = b.attributes;
    return dayjs(aCreatedAt).isBefore(dayjs(bCreatedAt)) ? 1 : -1;
  };

  if (!!articles && !!articles.length) {
    return (
      <Flex justify="center" px={{ base: "1rem", sm: "2rem" }}>
        <Stack mt="2rem" spacing="1.5rem">
          {articles && articles.length
            ? articles.sort(sortArticles).map((article, i) => {
                return <Card article={article} key={i} isPreview={true} />;
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

// export async function getServerSideProps() {
//   // docs on fetching in draft/preview publicationState
//   // https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.html#publication-state
//   try {
//     // ONLY FETCHES ARTICLES IN DRAFT MODE
//     const articlesRes = await fetchAPI(
//       "/articles",
//       {
//         publicationState: "preview",
//         filters: {
//           publishedAt: {
//             $null: true,
//           },
//         },
//       },
//       {
//         populate: "*",
//       }
//     );

//     // console.log("articlesRes:", articlesRes);
//     if (articlesRes && articlesRes.data && true) {
//       // for (let article of articlesRes.data) {
//       //   console.log("\n\nARTICLE:", article.attributes);
//       // }

//       return {
//         props: { articles: articlesRes.data, fallback: "blocking" },
//       };
//     }
//   } catch (e) {
//     console.log("\n\nARTICLES FETCH FAILED:", e);
//   }

//   return {
//     props: { articles: [], fallback: "blocking" },
//   };
// }

export default Drafts;
