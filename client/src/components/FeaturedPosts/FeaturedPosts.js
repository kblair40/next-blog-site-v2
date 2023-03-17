import { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
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
      <FeaturedPost featuredPost={posts[slideIdx]} slideNum={slideIdx} />
    // </motion.div>
  );
};

export default FeaturedPosts;
