import { Box, Center, Text } from "@chakra-ui/react";
import Carousel from "framer-motion-carousel";

import FeaturedPost from "src/components/FeaturedPost";

const FeaturedPosts = ({ posts }) => {
  if (!posts || !posts.length) {
    return <Box h="872px" w="394px" border="2px solid green" />;
  }

  return (
    <Box position="relative" width="100%" shadow="sm">
      <Center
        px={{ base: "1.5rem", md: ".75rem" }}
        h={{ base: "42px", sm: "52px", md: "62px" }}
        position="absolute"
        transform="translateY(-50%)"
        top={0}
        left={0}
        border="5px solid"
        borderColor="brand.darkgreen"
        bg="white"
        zIndex={2}
      >
        <Text
          fontWeight="500"
          color="brand.darkgreen"
          fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
          letterSpacing={{ base: "3.5px", sm: "6px", md: "8px" }}
        >
          FEATURED POST
        </Text>
      </Center>

      <Carousel>
        {posts.map((post, i) => {
          return <FeaturedPost key={i} featuredPost={post} slideNum={i} />;
        })}
      </Carousel>
    </Box>
  );
};

export default FeaturedPosts;
