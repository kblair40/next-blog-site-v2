import React, { useEffect, useState } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { wrap } from "popmotion";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

// https://www.musebecodes.dev/blog/cloudinaryimagecarousel
const ImageCarousel = ({ imageUrls }) => {
  const [images, setImages] = useState([]);
  const [imageEls, setImageEls] = useState();
  const [[slide, direction], setSlide] = useState([0, 0]);

  const imageIndex = wrap(0, images.length, slide);

  const paginate = (newDirection) => {
    setSlide([slide + newDirection, newDirection]);
  };

  useEffect(() => {
    if (!imageUrls || typeof imageUrls !== "string") {
      setImages(null);
    } else {
      const images = imageUrls.split(",").map((url) => url.trim());
      const imageEls = images.map((img, i) => {
        return (
          <Box position="relative" h="300px" w="100%">
            <Image
              key={i}
              src={images[i]}
              style={{ objectFit: "cover" }}
              fill
            />
          </Box>
        );
      });
      setImages(images);
      setImageEls(imageEls);
    }
  }, [imageUrls]);

  if (!images || !images.length) return null;
  return (
    <Flex position="relative" justify="center">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          style={{
            width: "100%",
            // border: "2px solid green",
          }}
          key={slide}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          // transition={{
          //   x: { duration: 0.2, ease: "easeIn" },
          //   opacity: { duration: 0.2 },
          // }}
          transition={{
            // x: { type: "spring", stiffness: 300, damping: 30 },
            x: { duration: 0.3, ease: "linear" },
            opacity: { duration: 0.1 },
          }}
          // initial={{ x: parseInt(carouselWidth), opacity: 0 }}
          // animate={{ x: 0, opacity: 1 }}
          // exit={{ x: -parseInt(carouselWidth), opacity: 0 }}
          // initial={{ x: 300, opacity: 0 }}
          // animate={{ x: 0, opacity: 1 }}
          // exit={{ x: -300, opacity: 0 }}
          // transition={{
          //   x: { duration: 0.3, ease: "linear" },
          //   opacity: { duration: 0.3, ease: "linear" },
          //   // x: { type: "spring", stiffness: 300, damping: 300, duration: 1 },
          //   // opacity: { duration: 1 },
          // }}
          // layout
        >
          {/* {imageEls[slideIdx]} */}
          {/* {imageEls[imageIndex]} */}
          {/* <Image src={images[slideIdx]} style={{ objectFit: "cover" }} fill /> */}
          <Box position="relative" h="300px" w="100%">
            <Image
              src={images[imageIndex]}
              style={{ objectFit: "cover" }}
              fill
            />
          </Box>
        </motion.div>
        <Button
          zIndex={100}
          // border="1px solid blue"
          position="absolute"
          size="sm"
          top="50%"
          transform="translateY(-50%)"
          left={0}
          onClick={() => paginate(-1)}
          // onClick={() => {
          //   if (slideIdx > 0) setSlideIdx((idx) => idx - 1);
          // }}
        >
          back
        </Button>
        <Button
          zIndex={100}
          // border="1px solid blue"
          position="absolute"
          size="sm"
          top="50%"
          transform="translateY(-50%)"
          right={0}
          onClick={() => paginate(1)}
          // onClick={() => {
          //   if (slideIdx < images.length - 1) setSlideIdx((idx) => idx + 1);
          // }}
        >
          Next
        </Button>
      </AnimatePresence>
    </Flex>
  );
};

export default ImageCarousel;
