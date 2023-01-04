import React, { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
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

  const changeSlide = (newDirection) => {
    setSlide([slide + newDirection, newDirection]);
  };

  useEffect(() => {
    if (!imageUrls || typeof imageUrls !== "string") {
      setImages(null);
    } else {
      const images = imageUrls.split(",").map((url) => url.trim());
      setImages(images);
    }
  }, [imageUrls]);

  if (!images || !images.length) return null;
  return (
    <AnimatePresence initial={false} custom={direction}>
      <motion.div
        key={slide}
        src={images[imageIndex]}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: {
            type: "tween",
            duration: 0.3,
            ease: "linear",
          },
          opacity: { duration: 0.2 },
        }}
      >
        <Box position="absolute" w="100%" h="300px">
          <Image src={images[imageIndex]} style={{ objectFit: "cover" }} fill />
        </Box>
      </motion.div>

      <Button
        onClick={() => changeSlide(-1)}
        position="absolute"
        top="50%"
        transform="translateY(-50%)"
        left={0}
        border="1px solid red"
      >
        Prev
      </Button>
      <Button
        onClick={() => changeSlide(1)}
        position="absolute"
        top="50%"
        transform="translateY(-50%)"
        right={0}
        border="1px solid red"
      >
        Next
      </Button>
    </AnimatePresence>
  );
};

export default ImageCarousel;
