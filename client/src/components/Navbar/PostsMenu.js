import React, { useState, useEffect } from "react";
import {
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
import { useRouter } from "next/router";

import { ChevronDownIcon } from "src/utils/icons";
import { NavLink } from "./NavLinks";
import { navLinks } from "./links";

const LINKS = navLinks.slice(1, navLinks.length - 1);
// console.log("LINKS:", LINKS);

const PostsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { asPath } = useRouter();

  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [asPath]);

  return (
    <Popover
      //
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <PopoverTrigger>
        <Button variant="unstyled">
          <NavLink onClick={() => setIsOpen(!isOpen)} isDisabled={true}>
            <Stack align="center" direction="row">
              <Box>Posts</Box>
              <ChevronDownIcon
                transform={isOpen ? "rotate(-180deg)" : "rotate(0deg)"}
                boxSize="13px"
              />
            </Stack>
          </NavLink>
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverBody>
          <Stack
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
