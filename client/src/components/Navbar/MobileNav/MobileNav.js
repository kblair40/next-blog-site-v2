import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Flex,
  Stack,
  Button,
  // Divider,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Search from "../Search";
import { navLinks } from "../links";
// import { SocialLinks } from "../Navbar";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen((prev) => !prev);

  const { asPath } = useRouter();
  // console.log("ROUTER:", asPath);

  useEffect(() => {
    // close drawer when current path changes.
    setIsOpen(false);
  }, [asPath]);

  return (
    <React.Fragment>
      <Flex
        zIndex={10000000}
        align="center"
        bg="brand.creme"
        position="fixed"
        top={0}
        left={0}
        right={0}
        w="100vw"
        py=".5rem"
        justify="space-between"
        px="1rem"
        // shadow={isIntersecting ? "md" : "none"}
        shadow="md"
        transition="box-shadow 0.5s"
      >
        <Link href="/">
          <Box
            position="relative"
            h={{ base: "36.6px", sm: "40px" }}
            w={{ base: "110px", sm: "120px" }}
            minW={{ base: "110px", sm: "120px" }}
          >
            <Image
              src="https://res.cloudinary.com/erinsblog/image/upload/v1672144985/Money_and_Other_Things_Logo2_zfrp33.jpg"
              style={{
                objectFit: "cover",
              }}
              alt="img"
              fill
            />
          </Box>
        </Link>

        <Search />

        <Flex
          w="32px"
          position="relative"
          maxW="32px"
          minW="32px"
          justify="center"
          align="center"
        >
          <HamburgerButton onClick={toggleDrawer} />
        </Flex>
      </Flex>

      <NavDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </React.Fragment>
  );
};

export default MobileNav;

const NavDrawer = ({ isOpen, onClose }) => {
  return (
    <Drawer
      size={{ base: "full", sm: "xs" }}
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
    >
      <DrawerOverlay />
      <DrawerContent bg="brand.creme" borderTop="1px solid" borderColor="#aaa">
        <DrawerCloseButton />

        <DrawerBody px="2rem">
          <Stack
            spacing="1.5rem"
            h="100%"
            w="100%"
            align="center"
            justifyContent="center"
          >
            {navLinks.map((link, i) => {
              return <MobileLink key={i} link={link} />;
            })}
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const MobileLink = ({ link }) => {
  const { asPath } = useRouter();

  const to = link.to;
  const isActive = to === asPath;

  return (
    <Box w="100%" role="group">
      <Link href={link.to || "#"}>
        <Text
          textAlign={"center"}
          color={isActive ? "brand.lightgreen" : "text.body"}
          fontSize="17px"
          transition="color 0.3s"
          _groupHover={{ color: "brand.lightgreen" }}
        >
          {link.label}
        </Text>
      </Link>
    </Box>
  );
};

const HamburgerButton = ({ onClick }) => {
  return (
    <Button variant="unstyled" onClick={onClick} w="32px">
      <Stack p="4px 6px" spacing="6px">
        <Box h="2px" bg="text.body" w="100%" />
        <Box h="2px" bg="text.body" w="100%" />
        <Box h="2px" bg="text.body" w="100%" />
      </Stack>
    </Button>
  );
};
