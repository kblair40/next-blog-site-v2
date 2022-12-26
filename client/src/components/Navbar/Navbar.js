import React from "react";
import { Box, Flex, Center, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

import {
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
  InstagramIcon,
} from "src/utils/icons";
import { navLinks } from "./links";

const Navbar = () => {
  const { asPath } = useRouter();

  return (
    <motion.div
      key={"nav"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ background: "#fff9f3" }}
      // exit={{ opacity: 0 }}
    >
      <Box
        // position="relative" // new
        // bottom="24px" // new
        w="100%"
        display={{ base: "none", md: "block" }}
        bg="brand.creme" // new
        pt="1.5rem" // new
        // h="50px" // removal is new
      >
        <Flex justify="space-evenly" h="100%">
          {navLinks.map((linkObj, i) => {
            return (
              <NavLink
                isActive={linkObj.to === asPath}
                linkObj={linkObj}
                key={i}
              />
            );
          })}
          {/* <NavLink>
          <SocialLinks />
        </NavLink> */}
        </Flex>
      </Box>
    </motion.div>
  );
};

export default Navbar;

const NavLink = ({ linkObj, children, isActive }) => {
  const inactiveStyles = {
    content: `""`,
    display: "block",
    width: 0,
    height: "2px",
    background: "brand.darkgreen",
    transition: "0.2x",
    position: "relative",
    bottom: "4px",
    margin: "2px auto 0",
  };

  const activeStyles = {};
  return (
    <Box
      role="group"
      cursor="pointer"
      flex={1}
      h="100%"
      px="5px"
      // border="1px solid #424242" // new removal
      borderRight="none"
      _after={{
        content: `""`,
        display: "block",
        width: isActive ? "35px" : 0,
        // width: 0,
        height: "2px",
        background: "brand.darkgreen",
        transition: "0.2x",
        position: "relative",
        bottom: "4px",
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
          // border="2px solid red"
          h="100%"
          fontSize="20px"
          // fontWeight="500"
          textAlign="center"
          transitionDuration="0.3s"
          _groupHover={{
            color: "brand.lightgreen",
          }}
          // color={isActive ? "brand.lightgreen" : "text.body"}
          // color="white" // new
          color="brand.darkgreen"
          fontWeight="600"
          letterSpacing="2px"
          className="link-wrapper"
        >
          {children ? children : linkObj.label}
        </Center>
      </Link>
    </Box>
  );
};

export const SocialLinks = ({ spacing = "8px", iconBoxSize = "20px" }) => {
  const boxSize = iconBoxSize;
  return (
    <HStack spacing={spacing} h="40px">
      <FacebookIcon boxSize={boxSize} />
      <InstagramIcon boxSize={boxSize} />
      <TwitterIcon boxSize={boxSize} />
      <PinterestIcon boxSize={boxSize} />
    </HStack>
  );
};
