import React, { useEffect, useState } from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

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

  if (!images || !images.length) return null;

  const carouselWidth = useBreakpointValue({
    base: "300px",
    sm: "400px",
    md: "600px",
  });

  const carouselHeight = useBreakpointValue({
    base: "200px",
    sm: "233px",
    md: "400px",
  });

  return (
    <AnimatePresence>
      <motion.div
        // className={styles.img}
        style={{
          height: carouselHeight,
          width: carouselWidth,
          position: "relative",
        }}
        key={page}
        custom={direction}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{
          x: { type: "spring", stiffness: 300, damping: 300 },
          opacity: { duration: 1 },
        }}
      ></motion.div>
    </AnimatePresence>
  );
};

export default ImageCarousel;
