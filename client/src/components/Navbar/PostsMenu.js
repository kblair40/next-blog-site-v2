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
} from "@chakra-ui/react";
import Link from "next/link";

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
            Posts
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
          <Stack>
            {LINKS.map((link, i) => {
              return (
                <Link href={link.to} key={i}>
                  <Box
                    // bg="brand.creme"
                    bg="white"
                    // transition="background-color, color 0.3s"
                    transition="all 0.3s"
                    _hover={{
                      // bg: "white",
                      // bg: "brand.creme",
                      bg: "brand.lightgreen",
                      // bg: "brand.darkgreen",
                      color: "white",
                    }}
                    w="100%"
                    p="6px 4px"
                  >
                    <Text color="inherit">{link.label}</Text>
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
