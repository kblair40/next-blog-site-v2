import React, { useState } from "react";
import {
  // PopoverHeader,
  // PopoverFooter,
  // PopoverArrow,
  // PopoverCloseButton,
  // PopoverAnchor,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  Box,
  Text,
  Stack,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";

import { ChevronDownIcon } from "src/utils/icons";
import { NavLink } from "./NavLinks";
import { navLinks } from "./links";

const LINKS = navLinks.slice(1, navLinks.length - 1);
console.log("LINKS:", LINKS);

const PostsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
      {/* <Popover> */}
      <PopoverTrigger>
        <Button variant="unstyled">
          <NavLink onClick={() => setIsOpen(!isOpen)} isDisabled={true}>
            <Text>Posts</Text>
            {/* <Text onClick={() => setIsOpen(true)}>Posts</Text> */}
          </NavLink>
        </Button>
        {/* <Button onClick={() => setIsOpen(true)} variant="link">
          Posts
        </Button> */}
      </PopoverTrigger>

      <PopoverContent
      // bg="brand.creme"
      >
        <PopoverBody>
          <Stack
            //
            spacing="0"
            // sx={{ "> *": { border: "1px solid #eee" } }}
          >
            {LINKS.map((link, i) => {
              return (
                <Link href={link.to} key={i}>
                  <Box
                    // bg="brand.creme"
                    bg="white"
                    // transition="background-color, color 0.3s"
                    transition="background-color 0.3s"
                    _hover={{
                      // bg: "white",
                      // bg: "brand.creme",
                      bg: "brand.lightgreen",
                      // bg: "brand.darkgreen",
                      color: "white",
                    }}
                    // _hover={{
                    //   // bg: "white",
                    //   // bg: "brand.creme",
                    //   bg: "brand.lightgreen",
                    //   // bg: "brand.darkgreen",
                    //   // color: "white",
                    // }}
                    w="100%"
                    p="6px 4px"
                    color="brand.darkgreen"
                    // role="group"
                  >
                    <Text
                      transition="color 0.3s"
                      color="inherit"
                      // color="brand.darkgreen"
                      // _groupHover={{ color: "white" }}
                    >
                      {link.label}
                    </Text>
                  </Box>
                </Link>
              );
            })}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PostsMenu;
