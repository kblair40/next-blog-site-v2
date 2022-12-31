import React from "react";
import { Box, Text, Flex, Center } from "@chakra-ui/react";

import MobileNav from "src/components/Navbar/MobileNav";
import Navbar from "src/components/Navbar";

const layout = ({ children, categories }) => {
  return (
    <Flex
      overflowX="hidden"
      h="100vh"
      // overflowY="auto"
      // h="100%"
      // minH="100vh"
      // border="1px solid green"
      id="layout"
      direction="column"
      justifyContent="space-between"
      bg="brand.creme" // new
      pt="80px"
    >
      <Flex direction="column">
        <Box display={{ base: "none", md: "block" }}>
          <Navbar categories={categories} />
        </Box>

        {/* hides self when md breakpoint is hit */}
        <Box display={{ base: "block", md: "none" }}>
          <MobileNav categories={categories} />
        </Box>

        <Box
          // h="100%"
          // h="calc(100% - 80px)"
          position="relative"
          bg="brand.creme"
          // border="1px solid red"
          // h="calc(!00% - 55px)"
          flex={1}
        >
          {children}
        </Box>
      </Flex>

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
    <Center
      minH="71px"
      h="71px"
      pt="1rem"
      // border="1px solid orange"
    >
      <Text
        // h="24px"

        fontSize="sm"
        // mb="1rem"
        textAlign="center"
      >
        &copy; 2022 moneyandotherthings.com
      </Text>
    </Center>
  );
};

export default layout;
