import React from "react";
import { Box } from "@chakra-ui/react";

import Flipbook from "src/components/Flipbook";
import ValidateAdmin from "src/components/Admin/ValidateAdmin";

const FlipbookPage = () => {
  return (
    <Box h="calc(100vh - 80px)" w="100%" pt="2rem">
      <ValidateAdmin>
        <Flipbook />
      </ValidateAdmin>
    </Box>
  );
};

export default FlipbookPage;
