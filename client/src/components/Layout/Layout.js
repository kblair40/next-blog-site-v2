import React from "react";
import { Box, Text } from "@chakra-ui/react";

import MobileNav from "src/components/Navbar/MobileNav";
import Navbar from "src/components/Navbar";
import TextLogo from "src/components/TextLogo";

const layout = ({ children, categories }) => {
  return (
    <Box overflowX="hidden" h="100%" minH="100vh" id="layout">
      <Box display={{ base: "none", md: "block" }}>
        <TextLogo />
        <Navbar categories={categories} />
      </Box>

      {/* hides self when md breakpoint is hit */}
      <Box display={{ base: "block", md: "none" }}>
        <MobileNav categories={categories} />
        <TextLogo />
      </Box>

      <Box h="100%" border="1px solid green" position="relative">
        {children}
      </Box>

      <Text
        border="1px solid green"
        fontSize="sm"
        mt="3rem"
        mb="1rem"
        textAlign="center"
      >
        &copy; 2022 moneyandotherthings.com
      </Text>
    </Box>
  );
};

export default layout;
