import { useEffect, useRef, useState } from "react";
import { Box, Center, Text } from "@chakra-ui/react";
// import { motion } from "framer-motion";

import FeaturedPost from "src/components/FeaturedPost";

const FeaturedPosts = ({ posts }) => {
  const [slideIdx, setSlideIdx] = useState(0);

  const interval = useRef();

  useEffect(() => {
    interval.current = setInterval(() => {
      setSlideIdx((cur) => {
        if (cur === 2) {
          return 0;
        } else {
          return (cur += 1);
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log("SLIDE IDX NOW =", slideIdx);
  }, [slideIdx]);

  if (!posts || !posts.length) {
    return <Box h="872px" w="394px" border="2px solid green" />;
  }

  return (
    // <motion.div
    //   animate={{
    //     // x: 0,
    //     transitionEnd: {
    //       display: "none",
    //     },
    //   }}
    // >
    <Box position="relative" width="100%">
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

      <FeaturedPost featuredPost={posts[slideIdx]} slideNum={slideIdx} />
    </Box>
    // </motion.div>
  );
};

export default FeaturedPosts;
