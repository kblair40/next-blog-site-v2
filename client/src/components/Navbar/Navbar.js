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
      // exit={{ opacity: 0 }}
    >
      <Box w="100%" display={{ base: "none", md: "block" }} h="50px">
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
  return (
    <Box
      role="group"
      cursor="pointer"
      flex={1}
      h="100%"
      px="5px"
      border="1px solid #424242"
      borderRight="none"
    >
      <Link href={linkObj ? linkObj.to : "#"} legacyBehavior>
        <Center
          h="100%"
          fontSize="14px"
          fontWeight="500"
          textAlign="center"
          transitionDuration="0.3s"
          _groupHover={{
            color: "brand.lightgreen",
          }}
          color={isActive ? "brand.lightgreen" : "text.body"}
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
