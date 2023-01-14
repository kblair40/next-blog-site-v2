import React from "react";
import { Box } from "@chakra-ui/react";

import Links from "src/components/Admin/Links";
import Flipbook from "src/components/Flipbook";

const AdminPage = () => {
  return (
    <Box h="calc(100vh - 80px)" w="100%" pt="2rem">
      {/* <Flipbook /> */}
      <Links />
    </Box>
  );
};

export default AdminPage;
