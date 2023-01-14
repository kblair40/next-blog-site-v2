import React from "react";
import { Heading, Flex, Button, Text } from "@chakra-ui/react";
import Link from "next/link";

const Custom500 = () => {
  return (
    <Flex direction="column" align="center" justify="center" h="400px">
      <Heading textAlign="center" mb="1rem" color="brand.darkgreen">
        Something went wrong, sorry about that.
      </Heading>

      <Text fontWeight="500" mb="1rem">
        Please go back to our home page.
      </Text>

      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </Flex>
  );
};

export default Custom500;
