import React from "react";
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
} from "@chakra-ui/react";
// import Link from "next/link";

import { SocialLinks } from "../Navbar";

const MobileNav = ({ isOpen, onClose }) => {
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
          <HamburgerButton />
        </Flex>
      </Flex>

      <NavDrawer isOpen={isOpen} onClose={onClose} />
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
        <DrawerHeader>Create your account</DrawerHeader>

        <DrawerBody>
          Drawer Body
          {/* <Input placeholder="Type here..." /> */}
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
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
