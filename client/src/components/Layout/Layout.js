import React from "react";
import { Box } from "@chakra-ui/react";

import MobileNav from "src/components/Navbar/MobileNav";
import Navbar from "src/components/Navbar";

const layout = ({ children }) => {
  return (
    <Box overflowX="hidden" minH="100vh" id="layout">
      <Navbar />

      {/* hides self when md breakpoint is hit */}
      <Box display={{ base: "block", md: "none" }}>
        <MobileNav />
      </Box>

      <Box position="relative">{children}</Box>
    </Box>
  );
};

export default layout;
