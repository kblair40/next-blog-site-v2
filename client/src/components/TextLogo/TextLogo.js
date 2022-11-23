import React from "react";
import { Flex, Text, Heading, useBreakpointValue } from "@chakra-ui/react";

const TextLogo = () => {
  const isMd = useBreakpointValue({ base: false, md: true });

  return isMd ? <LargeLogo /> : <SmallLogo />;
};

export default TextLogo;

const SmallLogo = () => {
  return (
    <Flex
      align="center"
      direction="column"
      pt="60px"
      mb={{ base: "28px", md: "58px" }}
    >
      <Heading
        maxW="90vw"
        color="brand.darkgreen"
        fontFamily="Playfair Display"
        textAlign="center"
        fontSize={{ base: "36px", sm: "48px", md: "64px", lg: "72px" }}
        lineHeight="normal"
        mb="10px"
        fontWeight="800"
      >
        Money and Other Things
      </Heading>
      <Text color="brand.darkgreen" fontSize={{ sm: "17px" }}>
        A collection of money stories and tips
      </Text>
    </Flex>
  );
};

const LargeLogo = () => {
  return (
    <Flex
      align="center"
      direction="column"
      pt="60px"
      mb={{ base: "28px", md: "58px" }}
      h="180px"
    >
      <Heading
        maxW="90vw"
        color="brand.darkgreen"
        fontFamily="Playfair Display"
        textAlign="center"
        fontSize={{ md: "60px", lg: "72px" }}
        whiteSpace="nowrap"
        lineHeight="normal"
        mb="10px"
        fontWeight="800"
      >
        Money and Other Things
      </Heading>
      <Text color="brand.darkgreen" fontSize={{ sm: "17px" }}>
        A collection of money stories and tips
      </Text>
    </Flex>
  );
};
