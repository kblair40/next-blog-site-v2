import React from "react";
import {
  Grid,
  GridItem,
  Box,
  Text,
  Flex,
  Stack,
  Button,
} from "@chakra-ui/react";

import BookRecommendation from "src/components/BookRecommendation";
import Card from "src/components/Articles/Card";

const AdditionalPosts = () => {
  return (
    <Grid
      // border="1px solid #303030"
      templateColumns={{ base: "1fr", md: "1fr 1px 1fr" }}
      templateRows={{ base: "auto 1px auto", md: "auto" }}
      gap={4}
      mb="2rem"
    >
      <GridItem pb="1rem" pt="1rem">
        <Text mb="2rem" fontSize="2xl" letterSpacing={"5px"}>
          TRAIN OF THOUGHT
        </Text>

        <Stack spacing="1.5rem">
          <Card article={DUMMY_ARTICLE} />
          <Card article={DUMMY_ARTICLE} />
          <Flex justify="center">
            <Button
              w="100%"
              maxW="200px"
              color="white"
              bg="brand.lightgreen"
              _hover={{ bg: "brand.darkgreen" }}
              _active={{ bg: "brand.darkgreen" }}
              borderRadius="2px"
            >
              More Posts
            </Button>
          </Flex>
        </Stack>
      </GridItem>
      <GridItem bg="black" />
      <GridItem pt="1rem">
        <BookRecommendation />
      </GridItem>
    </Grid>
  );
};

export default AdditionalPosts;

const DUMMY_ARTICLE = {
  attributes: {
    content: "Plain content\n\n**Bold Content**",
    createdAt: "2022-11-23T18:38:57.836Z",
    publisheddAt: "2022-11-23T18:38:57.836Z",
    minutes_to_read: 5,
    preview_text:
      "preview text preview text preview text preview text preview text preview text preview text preview text preview text preview text preview text preview text preview text preview text preview text preview text preview text preview text preview text preview text preview text preview text preview text preview text",
    title: "Testing Life",
    slug: "testing-life",
    image: {
      data: {
        attributes: {
          url: "/uploads/a_bug_is_becoming_a_meme_on_the_internet_1b70b42b12.jpg",
          size: 198.85,
          width: 3628,
          height: 2419,
          ext: ".jpg",
          alternativeText: "a-bug-is-becoming-a-meme-on-the-internet",
        },
        id: 7,
      },
    },
  },
  id: 8,
};
