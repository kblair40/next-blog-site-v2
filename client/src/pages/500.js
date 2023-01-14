import React from "react";
import { Heading, Flex, Button } from "@chakra-ui/react";
import Link from "next/link";

const Custom500 = () => {
  return (
    <Flex direction="column" align="center">
      <Heading textAlign="center">
        Something went wrong, sorry about that :( -- Please go back to our home
        page.
      </Heading>

      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </Flex>
  );
};

export default Custom500;
