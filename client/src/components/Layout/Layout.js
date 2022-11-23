import React from "react";
import { Box } from "@chakra-ui/react";

import MobileNav from "src/components/Navbar/MobileNav";
import Navbar from "src/components/Navbar";
import TextLogo from "src/components/TextLogo";

const layout = ({ children, categories, seo }) => {
  return (
    <Box overflowX="hidden" minH="100vh" id="layout">
      <Box display={{ base: "none", md: "block" }}>
        <TextLogo />
        <Navbar categories={categories} />
      </Box>

      {/* hides self when md breakpoint is hit */}
      <Box display={{ base: "block", md: "none" }}>
        <MobileNav categories={categories} />
        <TextLogo />
      </Box>

      <Box position="relative">{children}</Box>
    </Box>
  );
};

export default layout;
