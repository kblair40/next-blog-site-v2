import React from "react";
import { Box } from "@chakra-ui/react";

import Links from "src/components/Admin/Links";

const AdminPage = () => {
  return (
    <Box h="calc(100vh - 80px)" w="100%" pt="2rem">
      <Links />
    </Box>
  );
};

export default AdminPage;
