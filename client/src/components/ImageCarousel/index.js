import { Flex } from "@chakra-ui/react";

import ImageCarousel from "./ImageCarousel";

const CarouselWrapper = ({ imageUrls }) => {
  return (
    <Flex justify="center">
      <ImageCarousel imageUrls={imageUrls} />
    </Flex>
  );
};

export default CarouselWrapper;
