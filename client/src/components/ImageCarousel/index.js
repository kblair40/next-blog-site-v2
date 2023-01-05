import { Box } from "@chakra-ui/react";

import ImageCarousel from "./ImageCarousel";

const CarouselWrapper = ({ imageUrls }) => {
  return (
    // <Box position="relative" h="500px">
    <Box position="relative" h="500px">
      <ImageCarousel imageUrls={imageUrls} />
    </Box>
  );
};

export default CarouselWrapper;
