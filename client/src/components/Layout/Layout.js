import React, { useEffect, useRef, useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ReactGA from "react-ga";
// import { useInView } from "react-cool-inview";

import MobileNav from "src/components/Navbar/MobileNav";
import Navbar from "src/components/Navbar";
import TextLogo from "src/components/TextLogo";

const layout = ({ children, categories }) => {
  // const [isIntersecting, setIsIntersecting] = useState(false);

  // const { observe, inView } = useInView({
  //   threshold: 0, // Default is 0
  //   rootMargin: "-80px",
  // });

  const { asPath } = useRouter();

  const curPath = useRef();
  useEffect(() => {
    if (curPath.current !== asPath) {
      ReactGA.pageview(asPath);
      curPath.current = asPath;
    }
  }, [asPath]);

  const observeRef = useRef();
  useEffect(() => {
    const options = {
      // root: observeRef.current,
      rootMargin: "80px",
      threshold: 0,
    };
    const cb = (args) => console.log("ARGS:", args);
    const observer = new IntersectionObserver(cb, options);

    if (observeRef && observeRef.current) {
      observer.observe(observeRef.current);
      // observer.observe(document.getElementById("to-observe"));
    }
  }, [observeRef]);

  // useEffect(() => {
  //   console.log("IN VIEW:", inView);
  // }, [inView]);

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
          {/* <TextLogo /> */}
          <Box ref={observeRef} id="to-observe">
            <Navbar categories={categories} />
          </Box>
        </Box>

        {/* hides self when md breakpoint is hit */}
        <Box display={{ base: "block", md: "none" }}>
          <MobileNav categories={categories} />
          <TextLogo />
        </Box>

        <Box h="100%" position="relative" bg="brand.creme">
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
