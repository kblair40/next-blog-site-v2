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
