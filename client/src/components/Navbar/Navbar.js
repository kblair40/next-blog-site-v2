import React from "react";
import { Box, Flex, Center, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Image from "next/image";

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
      style={{
        background: "#fff9f3",
        // border: "1px solid red",
        position: "fixed",
        top: 0,
        zIndex: 100000,
        height: "80px",
        // border: "1px solid #ccc",
        width: "100vw",
        // paddingLeft: "1rem",
        // paddingRight: "2rem",
      }}
    >
      <Box
        h="100%"
        // position="sticky"
        sx={
          {
            // position: "sticky",
            // position: "-webkit-sticky",
            // top: "60px",
          }
        }
        // top="0"
        // position="relative" // new
        // bottom="24px" // new
        // w="100%"
        // display={{ base: "none", md: "block" }}
        display={{ base: "none", md: "flex" }} // new (was md: block)
        bg="brand.creme" // new
        pt="1rem" // new
        pl="1rem"
        pr="1rem"
        // h="50px" // removal is new
        // border="1px solid black"
        justify="space-between"
        w="100vw"
      >
        <Box position="relative" h="60px" w="180px" mr="1.5rem">
          <Image
            src="https://res.cloudinary.com/erinsblog/image/upload/v1672077301/Money_and_Other_Things_Logo_dzvjxy.jpg"
            style={{
              objectFit: "cover",
            }}
            fill
          />
        </Box>

        <Flex justify="space-evenly" h="100%" w="100%">
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
        bottom: "12px",
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
          fontSize="18px"
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
