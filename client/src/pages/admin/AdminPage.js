import React from "react";
import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const Links = dynamic(() => import("src/components/Admin/Links"), {
  ssr: false,
});

const AdminPage = () => {
  return (
    <Box h="calc(100vh - 80px)" w="100%" pt="2rem">
      <Links />
    </Box>
  );
};

export default AdminPage;
