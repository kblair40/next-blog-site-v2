import React, { useState, Suspense } from "react";
import {
  Text,
  Flex,
  Stack,
  Button,
  Box,
  Center,
  Spinner,
  Collapse,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import Loading from "src/components/Loading";
import Card from "src/components/Card";

const BookRecommendation = dynamic(
  () => import("src/components/BookRecommendation"),
  {
    suspense: true,
  }
);

const AdditionalPosts = ({ articles }) => {
  const [expanded, setExpanded] = useState(false);

  const router = useRouter();

  const handleClickMoreSecondTime = () => {
    router.push("/posts/money");
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      mb="2rem"
      justify="space-between"
    >
      <Flex justify="center" flex={{ md: 1 }} py="1rem">
        <Box w="100%" maxW={{ md: "700px" }}>
          <Text mb="2rem" fontSize="2xl" letterSpacing={"5px"}>
            RECENT POSTS
          </Text>

          {!articles ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <Stack spacing="1.5rem" align="center">
              {articles.slice(0, 2).map((article, i) => {
                return <Card key={i} article={article} />;
              })}

              <Collapse in={expanded}>
                <Stack spacing="1.5rem" align="center">
                  {articles.slice(2).map((article, i) => {
                    return <Card key={i} article={article} />;
                  })}
                </Stack>
              </Collapse>

              <Flex justify="center">
                <Button
                  w="100%"
                  maxW="200px"
                  color="white"
                  bg="brand.lightgreen"
                  _hover={{ bg: "brand.darkgreen" }}
                  _active={{ bg: "brand.darkgreen" }}
                  borderRadius="2px"
                  onClick={() => {
                    if (!expanded) setExpanded(true);
                    else handleClickMoreSecondTime();
                  }}
                >
                  {!expanded ? "More Posts" : "Even More Posts"}
                </Button>
              </Flex>
            </Stack>
          )}
        </Box>
      </Flex>

      <Flex justify="center" w="center">
        <Box
          w={{ base: "100%", md: "1px" }}
          h={{ base: "1px", md: "100%" }}
          bg="#303030"
          m={{ base: "2rem 0", md: "0 1.5rem" }}
        />
      </Flex>

      <Box
        w={{ base: "100%", md: "min-content" }}
        pt="1rem"
        maxW={{ md: "320px" }}
        minW={{ md: "240px" }}
      >
        <Suspense fallback={<Loading />}>
          <BookRecommendation />
        </Suspense>
      </Box>
    </Flex>
  );
};

export default AdditionalPosts;
