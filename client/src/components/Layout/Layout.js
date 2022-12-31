import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

import MobileNav from "src/components/Navbar/MobileNav";
import Navbar from "src/components/Navbar";

const layout = ({ children, categories }) => {
  return (
    <Flex
      overflowX="hidden"
      h="100%"
      minH="100vh"
      id="layout"
      direction="column"
      justifyContent="space-between"
      bg="brand.creme" // new
      pt="80px"
    >
      <Box>
        <Box display={{ base: "none", md: "block" }}>
          <Navbar categories={categories} />
        </Box>

        {/* hides self when md breakpoint is hit */}
        <Box display={{ base: "block", md: "none" }}>
          <MobileNav categories={categories} />
        </Box>

        <Box h="100%" position="relative" bg="brand.creme">
          {children}
        </Box>
      </Box>

      <Footer />
    </Flex>
  );

  // return (
  //   <Box
  //     overflowX="hidden"
  //     h="100%"
  //     minH="100vh"
  //     id="layout"
  //     border="1px solid red"
  //   >
  //     <Box display={{ base: "none", md: "block" }}>
  //       <TextLogo />
  //       <Navbar categories={categories} />
  //     </Box>

  //     {/* hides self when md breakpoint is hit */}
  //     <Box display={{ base: "block", md: "none" }}>
  //       <MobileNav categories={categories} />
  //       <TextLogo />
  //     </Box>

  //     <Box h="100%" border="1px solid green" position="relative">
  //       {children}
  //     </Box>

  //     <Text
  //       border="1px solid green"
  //       fontSize="sm"
  //       mt="3rem"
  //       mb="1rem"
  //       textAlign="center"
  //     >
  //       &copy; 2022 moneyandotherthings.com
  //     </Text>
  //   </Box>
  // );
};

export const Footer = () => {
  return (
    <Text fontSize="sm" mt="3rem" mb="1rem" textAlign="center">
      &copy; 2022 moneyandotherthings.com
    </Text>
  );
};

export default layout;
