import React from "react";
import { Box } from "@chakra-ui/react";

import Flipbook from "src/components/Flipbook";

const AdminPage = () => {
  return (
    <Box h="calc(100vh - 80px)" w="100%" pt="1.5rem">
      <Flipbook />
    </Box>
  );
};

export default AdminPage;
