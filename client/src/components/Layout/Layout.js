import React from "react";
import { Box, Text, Flex, Center } from "@chakra-ui/react";

import MobileNav from "src/components/Navbar/MobileNav";
import Navbar from "src/components/Navbar";

const layout = ({ children, categories }) => {
  return (
    <Box bg="brand.creme">
      <Box position="relative" h="80px" display={{ base: "none", md: "block" }}>
        <Navbar categories={categories} />
      </Box>

      {/* hides self when md breakpoint is hit */}
      <Box position="relative" h="56px" display={{ base: "block", md: "none" }}>
        <MobileNav categories={categories} />
      </Box>

      <Flex
        overflowX="hidden"
        // overflowY="auto"
        // h="100%"
        minH={{ base: "100vh - 56px", md: "100vh - 80px" }}
        // border="2px solid green"
        id="layout"
        direction="column"
        justifyContent="space-between"
        bg="brand.creme" // new
        position="relative"
      >
        <Flex
          direction="column"
          minH={{ base: "127x", md: "calc(100vh - 151px)" }}
          border="1px solid red"
          // h="100%"
        >
          <Box
            // h="100%"
            // position="relative"
            bg="brand.creme"
            border="1px solid blue"
            // minH={"calc(100vh - 151px)"}
            // maxH={"calc(100vh - 151px)"}
            // flex={1}
          >
            {children}
          </Box>
        </Flex>

        <Footer />
      </Flex>
    </Box>
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
