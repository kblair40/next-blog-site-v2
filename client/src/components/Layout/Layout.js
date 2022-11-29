import React from "react";
import { Box, Text } from "@chakra-ui/react";

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

      <Text fontSize="sm" mt="3rem" mb="1rem" textAlign="center">
        &copy; 2022 moneyandotherthings.com
      </Text>
    </Box>
  );
};

export default layout;
