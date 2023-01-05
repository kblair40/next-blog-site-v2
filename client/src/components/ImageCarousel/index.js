// import { Box } from "@chakra-ui/react";

// import ImageCarousel from "./ImageCarousel";

// const CarouselWrapper = ({ imageUrls }) => {
//   return (
//     // <Box position="relative" h="100%" border="1px solid blue">
//     <ImageCarousel imageUrls={imageUrls} />
//     // </Box>
//   );
// };

// export default CarouselWrapper;

// export { default } from "./ImageCarousel";

import ImageCarousel from "./ImageCarousel";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "src/utils/theme";

const Carousel = ({ imageUrls }) => {
  return (
    <ChakraProvider theme={theme}>
      <ImageCarousel imageUrls={imageUrls} />
    </ChakraProvider>
  );
};

export default Carousel;
