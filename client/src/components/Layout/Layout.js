import React, { useEffect } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ReactGA from "react-ga";

import MobileNav from "src/components/Navbar/MobileNav";
import Navbar from "src/components/Navbar";
import TextLogo from "src/components/TextLogo";

const layout = ({ children, categories }) => {
  const { asPath } = useRouter();

  useEffect(() => {
    ReactGA.pageview(asPath);
  }, [asPath]);

  return (
    <Flex
      overflowX="hidden"
      h="100%"
      minH="100vh"
      id="layout"
      direction="column"
      justifyContent="space-between"
    >
      <Box>
        <Box display={{ base: "none", md: "block" }}>
          <TextLogo />
          <Navbar categories={categories} />
        </Box>

        {/* hides self when md breakpoint is hit */}
        <Box display={{ base: "block", md: "none" }}>
          <MobileNav categories={categories} />
          <TextLogo />
        </Box>

        <Box
          h="100%"
          // border="1px solid green"
          position="relative"
        >
          {children}
        </Box>
      </Box>

      <Text
        // border="1px solid green"
        fontSize="sm"
        mt="3rem"
        mb="1rem"
        textAlign="center"
      >
        &copy; 2022 moneyandotherthings.com
      </Text>
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

export default layout;
