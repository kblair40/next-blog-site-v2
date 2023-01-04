import { Box } from "@chakra-ui/react";

import ImageCarousel from "./ImageCarousel";

const CarouselWrapper = ({ imageUrls }) => {
  return (
    <Box position="relative" h="300px">
      <ImageCarousel imageUrls={imageUrls} />
    </Box>
  );
};

export default CarouselWrapper;
