import React, { useEffect, useState, useCallback } from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
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
        boxSize="16px"
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

  const sharedIconStyles = {
    // zIndex: 100000,
    boxSize: "36px",
    borderRadius: "50%",
    transition: "background-color 0.2s ease-in-out",
    bg: "white",
    _hover: { bg: "#eee" },
    _active: { bg: "#e4e4e4" },
  };

  if (!images || !images.length) return null;
  return (
    <Box position="relative" h="500px">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slide}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { duration: 0.2 },
            opacity: { duration: 0.2 },
          }}
        >
          <Box
            position="absolute"
            w="100%"
            // maxW="600px"
            // h="auto"
            // border="1px solid blue"
          >
            <Image
              src={images[imageIndex]}
              width={700}
              height={500}
              style={{
                objectFit: "contain",
                width: "100%",
                // maxWidth: "100%",
                // maxWidth: "600px",
                height: "auto",
                maxHeight: "500px",
              }}
            />
          </Box>
        </motion.div>
      </AnimatePresence>

      <Flex
        justify="space-between"
        position="absolute"
        w="100%"
        top="50%"
        transform="translateY(-50%)"
      >
        <IconButton
          onClick={() => changeSlide(-1)}
          icon={getArrow("left")}
          pr="2px"
          {...sharedIconStyles}
        />

        <IconButton
          pl="2px"
          onClick={() => changeSlide(1)}
          icon={getArrow("right")}
          {...sharedIconStyles}
        />
      </Flex>
    </Box>
  );
};

export default ImageCarousel;
