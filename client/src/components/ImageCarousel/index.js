import React from "react";
import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";

import ImageCarousel from "./ImageCarousel";
// const ImageCarousel = dynamic(() => import("./ImageCarousel"), {
//   ssr: false,
//   suspense: true,
// });

const CarouselWrapper = ({ imageUrls }) => {
  return (
    <Box position="relative" h="300px">
      {/* <React.Suspense fallback={<Box h="300px" />}> */}
      <ImageCarousel imageUrls={imageUrls} />
      {/* </React.Suspense> */}
    </Box>
  );
};

export default CarouselWrapper;
