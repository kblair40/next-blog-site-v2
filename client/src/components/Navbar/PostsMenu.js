import React, { useState } from "react";
import {
  // PopoverHeader,
  // PopoverFooter,
  // PopoverCloseButton,
  // PopoverAnchor,
  PopoverArrow,
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
    <Popover
      //
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      matchWidth={true}
    >
      <PopoverTrigger>
        <Button variant="unstyled">
          <NavLink onClick={() => setIsOpen(!isOpen)} isDisabled={true}>
            <Text>Posts</Text>
          </NavLink>
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />

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
                    bg="white"
                    transition="background-color 0.3s"
                    w="100%"
                    p="6px 4px"
                    color="brand.darkgreen"
                    _hover={{
                      bg: "brand.lightgreen",
                      color: "white",
                    }}
                  >
                    <Text transition="color 0.3s" color="inherit">
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
