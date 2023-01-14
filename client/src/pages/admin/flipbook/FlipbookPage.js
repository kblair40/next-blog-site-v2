import React from "react";
import { Box } from "@chakra-ui/react";

import Flipbook from "src/components/Flipbook";

const FlipbookPage = () => {
  return (
    <Box h="calc(100vh - 80px)" w="100%" pt="2rem">
      <Flipbook />
    </Box>
  );
};

export default FlipbookPage;
