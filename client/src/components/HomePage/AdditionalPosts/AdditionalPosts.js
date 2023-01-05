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

import Card from "src/components/Card";

const AdditionalPosts = ({ articles }) => {
  const [expanded, setExpanded] = useState(false);

  const router = useRouter();

  const handleClickMoreSecondTime = () => {
    router.push("/posts/love");
  };

  return (
    <Flex
      w="100%"
      maxW="100%"
      direction={{ base: "column", md: "row" }}
      // mb="2rem"
      justify="space-between"
      // border="1px solid green"
      // w="auto"
      // pb="1rem"
    >
      <Flex
        justify="center"
        w="100%" // new
        maxW="100%" // new
        // flex={{ md: 1 }} // new removals
        // py="1rem" // new removals
      >
        {/* <Box w="100%" maxW={{ md: "700px" }}> */}
        <Box w="100%">
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
                return <Card key={i} article={article} location="home" />;
              })}

              <Collapse in={expanded}>
                <Stack spacing="1.5rem" align="center">
                  {articles.slice(2).map((article, i) => {
                    return <Card key={i} article={article} location="home" />;
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

      {/* <Flex justify="center" w="center">
        <Box
          w={{ base: "100%", md: "1px" }}
          h={{ base: "1px", md: "100%" }}
          bg="#303030"
          m={{ base: "2rem 0", md: "0 1.5rem" }}
        />
      </Flex> */}
    </Flex>
  );
};

export default AdditionalPosts;
