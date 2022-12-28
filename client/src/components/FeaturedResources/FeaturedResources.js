import React from "react";
import { Box, Text, Center, Button } from "@chakra-ui/react";

import { ChevronDownIcon } from "src/utils/icons";

const FeaturedResources = () => {
  return (
    <Box
      w="100%"
      border="1px solid blue"
      // zIndex={1000000000}
      bg="white"
      id="resource"
    >
      <Text
        fontWeight="600"
        fontSize="sm"
        textAlign="center"
        letterSpacing="6.5px"
      >
        YOU ARE A BADASS AT MAKING MONEY
      </Text>

      <Text mt="4px" fontSize="sm" textAlign="center" letterSpacing="6.5px">
        by Jen Sincero
      </Text>

      <Center
        mt="1rem"
        w="100%"
        h="188px"
        border="1px solid"
        borderColor="gray.200"
      >
        IMAGE HERE
      </Center>

      <Text mt="2rem">
        "Money is just the messenger. It's what you do with it and how you
        think, feel, and speak about it that give it a personality."
      </Text>

      <Button
        mt="1.5rem"
        variant="ghost"
        fontSize="md"
        size="sm"
        borderBottom="1px solid transparent"
        rightIcon={<ChevronDownIcon boxSize="13px" />}
        _hover={{ bg: "transparent", borderColor: "#303030" }}
        _active={{ bg: "transparent" }}
        px={0}
        rounded="none"
        fontWeight="400"
        color="text.body"
      >
        Read More
      </Button>
    </Box>
  );
};

export default FeaturedResources;
