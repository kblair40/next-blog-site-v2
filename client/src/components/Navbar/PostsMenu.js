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
} from "@chakra-ui/react";
import Link from "next/link";

import { navLinks } from "./links";

const LINKS = navLinks.slice(1, navLinks.length - 1);
console.log("LINKS:", LINKS);

const PostsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover isOpen={isOpen}>
      <PopoverTrigger>
        <Button variant="link">Posts</Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverBody>
          {LINKS.map((link, i) => {
            return (
              <Link href={link.to} key={i}>
                <Box w="100%" p="6px 4px">
                  <Text>{link.label}</Text>
                </Box>
              </Link>
            );
          })}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PostsMenu;
