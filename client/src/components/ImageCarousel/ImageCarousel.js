import React, { useEffect, useState } from "react";
import { Box, useBreakpointValue, Flex, Button } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const ImageCarousel = ({ imageUrls }) => {
  const [images, setImages] = useState();
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    if (!imageUrls || typeof imageUrls !== "string") {
      setImages(null);
    } else {
      setImages(imageUrls.split(",").map((url) => url.trim()));
    }
  }, [imageUrls]);

  // const carouselWidth = useBreakpointValue({
  //   base: "300px",
  //   sm: "400px",
  //   md: "600px",
  // });

  // const carouselHeight = useBreakpointValue({
  //   base: "200px",
  //   sm: "233px",
  //   md: "400px",
  // });
  const carouselWidth = "300px";
  const carouselHeight = "200px";

  if (!images || !images.length) return null;
  return (
    <AnimatePresence>
      <Flex justify="center" position="relative">
        <motion.div
          // className={styles.img}
          style={{
            height: carouselHeight,
            width: carouselWidth,
            position: "relative",
            border: "1px solid green",
          }}
          key={slideIdx}
          // custom={direction}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 300 },
            opacity: { duration: 1 },
          }}
        >
          <Image src={images[slideIdx]} style={{ objectFit: "cover" }} fill />
        </motion.div>
        <Button
          zIndex={1000000}
          border="1px solid blue"
          position="absolute"
          size="sm"
          top="50%"
          transform="translateY(-50%)"
          left={0}
          onClick={() => {
            if (slideIdx > 0) setSlideIdx((idx) => idx - 1);
          }}
        >
          back
        </Button>
        <Button
          zIndex={1000000}
          border="1px solid blue"
          position="absolute"
          size="sm"
          top="50%"
          transform="translateY(-50%)"
          right={0}
          onClick={() => {
            if (slideIdx < images.length - 1) setSlideIdx((idx) => idx + 1);
          }}
        >
          Next
        </Button>
      </Flex>
    </AnimatePresence>
  );
};

export default ImageCarousel;
