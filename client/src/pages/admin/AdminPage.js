import React from "react";
import { Box } from "@chakra-ui/react";

import Flipbook from "src/components/Flipbook";

const AdminPage = () => {
  return (
    <Box
      // justify="center"
      // align="center"
      px="1rem"
      h="calc(100vh - 80px)"
      w="100%"
      border="1px solid orange"
    >
      <Flipbook />
    </Box>
  );
};

export default AdminPage;
