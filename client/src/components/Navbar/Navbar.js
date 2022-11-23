import React from "react";
import { Box, Flex, Text, Heading, Center, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
  InstagramIcon,
} from "src/utils/icons";
import { navLinks } from "./links";

const Navbar = () => {
  const router = useRouter();
  return (
    <Box>
      <TextLogo />

      <Box w="100%" display={{ base: "none", md: "block" }}>
        <Flex justify="space-evenly" h="50px">
          {navLinks.map((linkObj, i) => {
            return <NavLink linkObj={linkObj} key={i} />;
          })}
          <NavLink>
            <SocialLinks />
          </NavLink>
        </Flex>
      </Box>
    </Box>
  );
};

export default Navbar;

const NavLink = ({ linkObj, children }) => {
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
          // isActive && setcolor to light green
          h="100%"
          fontSize="15px"
          textAlign="center"
          transitionDuration="0.3s"
          _groupHover={{
            color: "brand.lightgreen",
          }}
        >
          {children ? children : linkObj.label}
          {/* {linkObj.label} */}
        </Center>
      </Link>
    </Box>
  );
};

const TextLogo = () => {
  return (
    <Flex
      align="center"
      direction="column"
      pt="60px"
      mb={{ base: "28px", md: "58px" }}
      // w="100%"
    >
      <Heading
        maxW="90vw"
        color="brand.darkgreen"
        fontFamily="Playfair Display"
        textAlign="center"
        fontSize={{ base: "36px", sm: "48px", md: "64px", lg: "72px" }}
        lineHeight="normal"
        mb="10px"
        fontWeight="800"
      >
        Money and Other Things
      </Heading>
      <Text color="brand.darkgreen" fontSize={{ sm: "17px" }}>
        A collection of money stories and tips
      </Text>
    </Flex>
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
