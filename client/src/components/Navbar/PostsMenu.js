import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
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

      <PopoverContent bg="brand.creme">
        <PopoverBody>
          <Stack>
            {LINKS.map((link, i) => {
              return (
                <Link href={link.to} key={i}>
                  <Box w="100%" p="6px 4px">
                    <Text>{link.label}</Text>
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
