import React from "react";
import { Box, Text, Center, Button } from "@chakra-ui/react";
import Image from "next/image";

import { ChevronDownIcon } from "src/utils/icons";

const FeaturedResources = () => {
  return (
    <Box w="100%" bg="brand.creme" id="resource">
      <Text
        fontWeight="600"
        fontSize="sm"
        textAlign="center"
        letterSpacing="6.5px"
        textTransform="uppercase"
      >
        The Psychology of Money by Morgan Housel
      </Text>

      <Text mt="4px" fontSize="sm" textAlign="center" letterSpacing="6.5px">
        by Jen Sincero
      </Text>

      <Box position="relative" mt="1rem" w="100%" h="180px">
        <Image
          src="https://res.cloudinary.com/erinsblog/image/upload/v1672433450/You%20Are%20a%20Badass%20Section.jpg"
          alt="img"
          style={{ objectFit: "cover", borderRadius: "2px" }}
          fill
        />
      </Box>

      {/* <Center
        mt="1rem"
        w="100%"
        h="188px"
        border="1px solid"
        borderColor="gray.200"
      >
        IMAGE HERE
      </Center> */}

      <Text mt="2rem">
        "Using your money to buy time and options has a lifestyle benefit few luxury goods can compete with.”
      </Text>

      {/* <Button
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
      </Button> */}
    </Box>
  );
};

export default FeaturedResources;
