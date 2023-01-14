import React, { useEffect, useState } from "react";
import { Flex, Stack, Box, Center, Spinner } from "@chakra-ui/react";
import dayjs from "dayjs";

import PiggyBank from "src/components/PiggyBank";
import { fetchAPI } from "src/utils/api";
import Card from "src/components/Card";

const DraftsPage = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // ONLY FETCHES ARTICLES IN DRAFT MODE
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

        if (articlesRes && articlesRes.data) {
          console.log("Setting articles to:", articlesRes.data);
          setArticles(articlesRes.data);
        } else {
          setArticles([]);
        }
      } catch (e) {
        console.log("\n\nARTICLES FETCH FAILED:", e);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <Box w="100%" pb="2rem">
      {loading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <ArticleList articles={articles} />
      )}
    </Box>
  );
};

export default DraftsPage;

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