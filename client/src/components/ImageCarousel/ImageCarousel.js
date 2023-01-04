import React, { useEffect, useState } from "react";
import { Box, useBreakpointValue, Flex, Button } from "@chakra-ui/react";
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
  const [slideIdx, setSlideIdx] = useState(0);
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
    <Flex position="relative">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          style={{
            height: carouselHeight,
            // width: carouselWidth,
            width: "100%",
            position: "relative",
            border: "1px solid green",
            margin: "0 auto",
          }}
          key={slideIdx}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          // custom={direction}
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
          {/* {imageEls[slide]} */}
          {/* <Image src={images[slideIdx]} style={{ objectFit: "cover" }} fill /> */}
          <Image src={images[imageIndex]} style={{ objectFit: "cover" }} fill />
        </motion.div>
        <Button
          zIndex={100}
          border="1px solid blue"
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
          border="1px solid blue"
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
