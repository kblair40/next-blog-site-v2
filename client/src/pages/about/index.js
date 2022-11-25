import React from "react";
import { Text, Box, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";

import { fetchAPI } from "src/utils/api";

const AboutPage = ({ about }) => {
  console.log("ABOUT PROP:", about);
  return (
    <Flex
      px={{ base: "1rem", sm: "1.5rem", md: "2rem" }}
      direction="column"
      align="center"
      w="100%"
      mt="2rem"
      pb="2rem"
    >
      <Box w="100%" border="1px solid #303030">
        <Box
          w="100%"
          // border="1px solid #303030"
          h={{ base: "280px", sm: "380px", md: "480px" }}
          display="flex"
          justifyContent={"center"}
          alignItems="center"
        >
          Image Here
        </Box>

        <Flex w="100%" direction="column" px="32px" pb="50px">
          <Heading fontSize="4xl" my="50px">
            Hey! So Glad You're Here.
          </Heading>

          <Text>
            I'm Erin, a twenty something on a mission to help women understand
            and take control of their finances. I'm currently pursuing my CFP
            (Certified Financial Planner) designation and am excited to share
            lessons learned along the way.
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AboutPage;

export async function getStaticProps() {
  try {
    const about = await fetchAPI("/about", {
      populate: {
        about_content: { populate: ["image"] },
      },
    });
    // console.log("\n\nABOUT RESPONSE:", about.data, "\n\n");

    return {
      props: { about: about.data },
    };
  } catch (e) {
    console.log("ABOUT ERROR:", e);
    return {
      props: {},
    };
  }
}
