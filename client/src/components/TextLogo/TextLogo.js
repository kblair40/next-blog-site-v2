import React from "react";
import { Flex, Text, Heading, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { motion } from "framer-motion";

const TextLogo = () => {
  const isMd = useBreakpointValue({ base: false, md: true });

  return (
    <motion.div
      key={"text-logo"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // style={{ border: "1px solid red" }}
      style={{ background: "#53614D" }}
    >
      {isMd ? <LargeLogo /> : <SmallLogo />}
    </motion.div>
  );
};

export default TextLogo;

const SmallLogo = () => {
  return (
    <Flex
      align="center"
      direction="column"
      pt="72px"
      mb={{ base: "28px", md: "58px" }}
      borderBottom="1px solid #303030"
      pb="1rem"
    >
      <Link href="/">
        <Heading
          maxW="90vw"
          color="brand.darkgreen"
          // color="white"
          // fontFamily="Playfair Display"
          textAlign="center"
          fontSize={{ base: "36px", sm: "42px" }}
          lineHeight="normal"
          mb="10px"
          fontWeight="800"
        >
          Money and Other Things
        </Heading>
      </Link>
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
      // justify="center"
      // pt="60px"
      pt="60px"
      // mb={{ base: "28px", md: "58px" }}
      // h="180px"
      pb="3rem"
    >
      <Link href="/">
        <Heading
          color="white"
          maxW="90vw"
          // color="brand.darkgreen"
          // fontFamily="Playfair Display"
          textAlign="center"
          // fontSize={{ md: "60px", lg: "72px" }} // removal new
          fontSize={{ md: "60px", lg: "80px" }}
          whiteSpace="nowrap"
          lineHeight="normal"
          mb="10px"
          // fontWeight="800" // removal new
          fontWeight={"400"} // new
          textTransform="uppercase" // new
        >
          Money and Other Things
        </Heading>
      </Link>
      <Text
        // color="brand.darkgreen"
        color="white"
        fontSize={{ sm: "22px" }}
        fontFamily="parisienne"
        letterSpacing="4px"
      >
        A collection of money stories and tips
      </Text>
    </Flex>
  );
};
