import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Flex,
  Stack,
  Button,
  Divider,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

import { navLinks } from "../links";
import { SocialLinks } from "../Navbar";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen((prev) => !prev);

  return (
    <React.Fragment>
      <Flex
        align="center"
        position="absolute"
        top={0}
        left={0}
        right={0}
        w="100vw"
        borderBottom="1px solid"
        borderColor="text.body"
        py=".5rem"
      >
        <Flex
          position="relative"
          flex={1}
          w="100%"
          h="40px"
          justify="center"
          align="center"
        >
          <SocialLinks spacing="1rem" iconBoxSize="22px" />
        </Flex>

        <Box my="-8px" h="56px">
          <Divider orientation="vertical" borderColor="text.body" />
        </Box>

        <Flex
          w="100%"
          position="relative"
          maxW="64px"
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
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody>
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
  return (
    <Link href={link.to || "#"}>
      <Text fontSize="17px">{link.label}</Text>
    </Link>
  );
};

const HamburgerButton = ({ onClick }) => {
  return (
    <Button variant="unstyled" onClick={onClick} w="40px">
      <Stack p="4px 8px" spacing="4px">
        <Box h="2px" bg="text.body" w="100%" />
        <Box h="2px" bg="text.body" w="100%" />
        <Box h="2px" bg="text.body" w="100%" />
      </Stack>
    </Button>
  );
};
