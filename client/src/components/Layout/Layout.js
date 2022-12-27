import React, { useEffect, useRef, useState } from "react";
import { Box, Text, Flex, useBreakpointValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ReactGA from "react-ga";
// import { useInView } from "react-cool-inview";

import MobileNav from "src/components/Navbar/MobileNav";
import Navbar from "src/components/Navbar";
import TextLogo from "src/components/TextLogo";

const layout = ({ children, categories }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  // const { observe, inView } = useInView({
  //   threshold: 0, // Default is 0
  //   rootMargin: "-80px",
  // });

  const isMd = useBreakpointValue({ base: false, md: true });

  const { asPath } = useRouter();

  const curPath = useRef();
  useEffect(() => {
    if (curPath.current !== asPath) {
      ReactGA.pageview(asPath);
      curPath.current = asPath;
    }
  }, [asPath]);

  const observeRef = useRef();
  const mobileObserveRef = useRef();

  useEffect(() => {
    const options = {
      // root: observeRef.current,
      rootMargin: "-50px", // -80px to get shadow immediately on scroll
      threshold: 0,
    };

    let callback = (entries, observer) => {
      entries.forEach((entry) => {
        console.log("IS INTERSECTING:", entry.target, entry.isIntersecting);
        setIsIntersecting(!entry.isIntersecting);
      });
    };
    let mobileCallback = (entries, observer) => {
      entries.forEach((entry) => {
        console.log("IS INTERSECTING:", entry.target, entry.isIntersecting);
        setIsIntersecting(!entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(callback, options);
    const mobileObserver = new IntersectionObserver(mobileCallback, options);

    if (mobileObserveRef && mobileObserveRef.current) {
      mobileObserver.observe(mobileObserveRef.current);
    }

    if (observeRef && observeRef.current) {
      observer.observe(observeRef.current);
      // observer.observe(document.getElementById("to-observe"));
    }
  }, [observeRef, isMd, mobileObserveRef]);

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

          <Navbar categories={categories} isIntersecting={isIntersecting} />
          <Box ref={observeRef} h="1px" w="100%" bg="transparent" />
        </Box>

        {/* hides self when md breakpoint is hit */}
        <Box display={{ base: "block", md: "none" }}>
          <MobileNav categories={categories} isIntersecting={isIntersecting} />
          <Box ref={mobileObserveRef} h="1px" w="100%" bg="transparent" />
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
