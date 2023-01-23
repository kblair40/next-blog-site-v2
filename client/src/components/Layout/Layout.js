import React, { useEffect } from "react";
import { Box, Text, Flex, Center } from "@chakra-ui/react";

import MobileNav from "src/components/Navbar/MobileNav";
import Navbar from "src/components/Navbar";
import { Event, initGA, PageView } from "src/components/Analytics";

const layout = ({ children, categories }) => {
  // useEffect(() => {
  //   initGA();
  //   PageView();
  // }, []);

  return (
    <Box bg="brand.creme" minH="100vh">
      <Box position="relative" h="80px" display={{ base: "none", md: "block" }}>
        <Navbar categories={categories} />
      </Box>

      {/* hides self when md breakpoint is hit */}
      <Box position="relative" h="56px" display={{ base: "block", md: "none" }}>
        <MobileNav categories={categories} />
      </Box>

      <Flex
        overflowX="hidden"
        h="100%"
        minH={{ base: "100vh - 56px", md: "100vh - 80px" }}
        id="layout"
        direction="column"
        justifyContent="space-between"
        bg="brand.creme"
        position="relative"
      >
        <Flex
          direction="column"
          minH={{ base: "calc(100vh - 127px)", md: "calc(100vh - 151px)" }}
          bg="brand.creme"
          flex={1}
        >
          <Box>{children}</Box>
        </Flex>

        <Footer />
      </Flex>
    </Box>
  );
};

export const Footer = () => {
  return (
    <Center minH="71px" h="71px" pt="1rem">
      <Text fontSize="sm" textAlign="center">
        &copy; {new Date().getFullYear()} moneyandotherthings.com
      </Text>
    </Center>
  );
};

export default layout;
