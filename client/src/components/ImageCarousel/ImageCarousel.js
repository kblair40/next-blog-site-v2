import React, { useEffect, useState, useCallback } from "react";
import { Box, Flex, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { wrap } from "popmotion";

import { ChevronDownIcon } from "src/utils/icons";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      y: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    y: 0,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      y: 0,
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
        boxSize={{ base: "15px", sm: "18px" }}
        fill="white"
        offset={dir === "left" ? { right: "2px" } : { left: "2px" }}
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

  useEffect(() => {
    let currentImage = images[imageIndex];
    console.log("CURRENT IMAGE:", currentImage);
  }, [slide]);

  const sharedIconStyles = {
    // variant: "unstyled",
    boxSize: { base: "32px", md: "40px" },
    size: { base: "sm", sm: "md" },
    borderRadius: "50%",
    rounded: "full",
    transition: "background-color 0.2s ease-in-out",
    bg: "brand.lightgreen",
    _hover: { bg: "brand.darkgreen" },
    _active: { bg: "brand.darkgreen" },
    // _active: { bg: "#e4e4e4" },
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  };

  const imageObjectFit = useBreakpointValue(
    { base: "cover", sm: "contain" },
    { fallback: "base", ssr: true }
  );

  const imageHeight = useBreakpointValue({ base: "400px", sm: "500px" });

  if (!images || !images.length) return null;
  return (
    <Box
      position="relative"
      // h={{ base: "400px", sm: "500px" }}
      h={imageHeight}
      // border="1px solid blue"
      w="100%"
      maxW="700px"
      m="0 auto"
    >
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
            y: { duration: 0.2 },
            opacity: { duration: 0.2 },
          }}
        >
          <Box
            position="absolute"
            w="100%"
            // border="1px solid red"
            //
          >
            <Image
              src={images[imageIndex]}
              width={700}
              height={parseInt(imageHeight)}
              // height={500}
              style={{
                objectFit: imageObjectFit,
                width: "100%",
                height: "auto",
                maxHeight: "500px",
                minHeight: "400px",
                // border: "1px solid green",
              }}
              // fill
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
          // pr="8px"
          {...sharedIconStyles}
        />

        <IconButton
          // pl="2px"
          onClick={() => changeSlide(1)}
          icon={getArrow("right")}
          {...sharedIconStyles}
        />
      </Flex>
    </Box>
  );
};

export default ImageCarousel;
