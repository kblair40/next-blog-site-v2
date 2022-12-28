import React from "react";
import { Box, Flex, Center } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { navLinks } from "./links";

const NavLinks = () => {
  const { asPath } = useRouter();
  return (
    <Flex
      py=".5rem"
      justify="space-evenly"
      h="100%"
      w="100%"
      // maxW="695px"
      mx={{ md: "2rem", lg: "3rem", xl: "5rem" }}

      // border="1px solid green"
    >
      {navLinks.map((linkObj, i) => {
        return (
          <NavLink isActive={linkObj.to === asPath} linkObj={linkObj} key={i} />
        );
      })}
    </Flex>
  );
};

export default NavLinks;

const NavLink = ({ linkObj, children, isActive }) => {
  return (
    <Box
      border="1px solid red"
      role="group"
      cursor="pointer"
      flex={1}
      h="100%"
      borderRight="none"
      _after={{
        content: `""`,
        display: "block",
        width: isActive ? "35px" : 0,
        height: "2px",
        background: "brand.darkgreen",
        transition: "0.2s",
        position: "relative",
        bottom: "14px",
        margin: "2px auto 0",
      }}
      _hover={{
        _after: {
          width: "35px",
          transition: "width 0.2s",
        },
      }}
    >
      <Link href={linkObj ? linkObj.to : "#"} legacyBehavior>
        <Center
          h="100%"
          fontSize={{ md: "13px", lg: "18px" }}
          textAlign="center"
          transitionDuration="0.3s"
          _groupHover={{
            color: "brand.lightgreen",
          }}
          color="brand.darkgreen"
          fontWeight="600"
          letterSpacing="2px"
          className="link-wrapper"
          whiteSpace="nowrap"
        >
          {children ? children : linkObj.label}
        </Center>
      </Link>
    </Box>
  );
};
