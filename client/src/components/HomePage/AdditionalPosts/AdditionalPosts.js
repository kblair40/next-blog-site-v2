import React from "react";
import {
  Grid,
  GridItem,
  Text,
  Flex,
  Stack,
  Button,
  Box,
  Divider,
} from "@chakra-ui/react";

import BookRecommendation from "src/components/BookRecommendation";
import Card from "src/components/Articles/Card";

const AdditionalPosts = () => {
  return (
    <Flex
      // border="1px solid black"
      direction={{ base: "column", md: "row" }}
      mb="2rem"
      justify="space-between"
    >
      <Flex justify="center" flex={{ md: 1 }} py="1rem">
        <Box w="100%" maxW="700px">
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
        </Box>
      </Flex>

      <Flex justify="center" w="center">
        <Box
          w={{ base: "100%", md: "1px" }}
          h={{ base: "1px", md: "100%" }}
          bg="#303030"
          m={{ base: "2rem 0", md: "0 1.5rem" }}
          //
        />
      </Flex>

      <Box
        w="min-content"
        // w="100%"
        pt="1rem"
        maxW="320px"
        minW="240px"
        // border="1px solid green"
        //
      >
        <BookRecommendation />
      </Box>
    </Flex>
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
          url: "/uploads/combining_finances_30e318c630.webp",
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

// <Grid
//   // templateColumns={{ base: "1fr", md: "1fr 1px 1fr" }}
//   templateColumns={{ base: "1fr", md: "1fr 1px minmax(200px, 300px)" }}
//   templateRows={{ base: "auto 1px auto", md: "auto" }}
//   gap={4}
//   mb="2rem"
// >
//   <GridItem pb="1rem" pt="1rem">
//     <Text mb="2rem" fontSize="2xl" letterSpacing={"5px"}>
//       TRAIN OF THOUGHT
//     </Text>

//     <Stack spacing="1.5rem">
//       <Card article={DUMMY_ARTICLE} />
//       <Card article={DUMMY_ARTICLE} />
//       <Flex justify="center">
//         <Button
//           w="100%"
//           maxW="200px"
//           color="white"
//           bg="brand.lightgreen"
//           _hover={{ bg: "brand.darkgreen" }}
//           _active={{ bg: "brand.darkgreen" }}
//           borderRadius="2px"
//         >
//           More Posts
//         </Button>
//       </Flex>
//     </Stack>
//   </GridItem>
//   <GridItem bg="black" />
//   <GridItem pt="1rem">
//     <BookRecommendation />
//   </GridItem>
// </Grid>
