import { Box, Center, Text } from "@chakra-ui/react";
import Carousel from "framer-motion-carousel";

import { ChevronDownIcon } from "src/utils/icons";
import FeaturedPost from "src/components/FeaturedPost";

const FeaturedPosts = ({ posts }) => {
  if (!posts || !posts.length) {
    return <Box h="872px" w="394px" border="2px solid green" />;
  }

  const arrowProps = {
    bg: "white",
    position: "absolute",
    display: { base: 'none', sm: 'flex' },
    top: "calc(50% - 96px)",
    transform: "translateY(-50%)",
    cursor: "pointer",
    boxSize: "36px",
    rounded: "full",
    opacity: 0.75,
    transition: "opacity 0.3s",
    _hover: { opacity: 0.9 },
  };

  return (
    <Box>
      {/* <Box position="relative" shadow="sm" w="100vw" maxW="100vw" border='1px solid red'> */}
      <Box position="relative" shadow="sm"
        // w={{ base: "calc(100vw - 3rem)", sm: "calc(100vw - 4rem)", lg: "calc(100vw - 11rem)" }}
      >
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
            FEATURED POSTS
          </Text>
        </Center>

        <Box>
          <Carousel
            loop={true}
            interval={8000}
            renderDots={() => null}
            renderArrowLeft={({ handlePrev }) => {
              return (
                <Center
                  pr="4px"
                  left="8px"
                  onClick={handlePrev}
                  {...arrowProps}
                >
                  <ChevronDownIcon transform="rotate(90deg)" boxSize="18px" />
                </Center>
              );
            }}
            renderArrowRight={({ handleNext }) => {
              return (
                <Center
                  pl="4px"
                  right="8px"
                  onClick={handleNext}
                  {...arrowProps}
                >
                  <ChevronDownIcon transform="rotate(-90deg)" boxSize="18px" />
                </Center>
              );
            }}
          >
            {posts.map((post, i) => {
              return <FeaturedPost key={i} featuredPost={post} slideNum={i} />;
            })}
          </Carousel>
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturedPosts;
