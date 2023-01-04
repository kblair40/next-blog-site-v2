import React, { useEffect, useState, useCallback } from "react";
import { Box, Button, IconButton } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { wrap } from "popmotion";

import { ChevronDownIcon } from "src/utils/icons";

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

  const getArrow = useCallback((dir) => {
    return (
      <ChevronDownIcon
        transform={`rotate(${dir === "left" ? "90deg" : "-90deg"})`}
      />
    );
  }, []);

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

      <IconButton
        // zIndex={10000}
        bg="rgba(255,255,255,0.4)"
        // bg="brand.darkgreen"
        onClick={() => changeSlide(-1)}
        position="absolute"
        top="50%"
        transform="translateY(-50%)"
        left={"-8px"}
        boxSize="32px"
        display="flex"
        justifyContent="center"
        p="8px"
        // icon={<ChevronDownIcon transform="rotate(90deg)" boxSize="24px" />}
        icon={getArrow("left")}
        // borderRadius="50%"
        rounded="full"
      />
      <IconButton
        // zIndex={10000}
        bg="rgba(255,255,255,0.4)"
        // bg="brand.darkgreen"
        onClick={() => changeSlide(1)}
        position="absolute"
        top="50%"
        transform="translateY(-50%)"
        right={"-8px"}
        boxSize="32px"
        display="flex"
        justifyContent="center"
        p="8px"
        // icon={<ChevronDownIcon transform="rotate(-90deg)" boxSize="24px" />}
        icon={getArrow("right")}
        borderRadius="50%"
      />
    </AnimatePresence>
  );
};

export default ImageCarousel;
