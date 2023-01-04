import React, { useEffect, useState } from "react";
import { Box, useBreakpointValue, Flex, Button } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// https://www.musebecodes.dev/blog/cloudinaryimagecarousel
const ImageCarousel = ({ imageUrls }) => {
  const [images, setImages] = useState();
  const [slideIdx, setSlideIdx] = useState(0);
  const [imageEls, setImageEls] = useState();

  useEffect(() => {
    if (!imageUrls || typeof imageUrls !== "string") {
      setImages(null);
    } else {
      const images = imageUrls.split(",").map((url) => url.trim());
      const imageEls = images.map((img, i) => {
        return (
          <Image key={i} src={images[i]} style={{ objectFit: "cover" }} fill />
        );
      });
      setImages(images);
      setImageEls(imageEls);
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
      <motion.div
        style={{
          height: carouselHeight,
          width: carouselWidth,
          position: "relative",
          border: "1px solid green",
          margin: "0 auto",
        }}
        key={slideIdx}
        // custom={direction}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{
          x: { duration: 0.5, ease: "easeInOut" },
          opacity: { duration: 0.5, ease: "easeInOut" },
          // x: { type: "spring", stiffness: 300, damping: 300, duration: 1 },
          // opacity: { duration: 1 },
        }}
      >
        <Image src={images[slideIdx]} style={{ objectFit: "cover" }} fill />

        <Button
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
      </motion.div>
      {/* <Button
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
      </Button> */}
    </AnimatePresence>
  );
};

export default ImageCarousel;
