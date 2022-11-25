import React from "react";
import { Text, Box, Flex, Heading, Divider } from "@chakra-ui/react";
import Image from "next/image";

import ContactForm from "src/components/Forms/ContactForm";
import { getStrapiMedia } from "src/utils/media";
import { fetchAPI } from "src/utils/api";

const AboutPage = ({ about }) => {
  return (
    <Flex
      px={{ base: "1rem", sm: "1.5rem", md: "2rem" }}
      direction="column"
      align="center"
      w="100%"
      mt="2rem"
      pb="2rem"
      minW="332px"
    >
      <Box w="100%" border="1px solid #303030" position="relative">
        <Box
          w="100%"
          position="relative"
          h={{ base: "280px", sm: "380px", md: "480px" }}
        >
          <Image
            alt="about image"
            src={getStrapiMedia(about.image)}
            objectFit="cover"
            fill
          />
        </Box>

        <Flex w="100%" direction="column" px="32px" pb="50px">
          <Heading fontSize="4xl" my="50px">
            Hey! So Glad You're Here.
          </Heading>

          <Text>{about.description}</Text>
        </Flex>
      </Box>

      <Divider my="3rem" borderColor="text.body" />

      <ContactForm />
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
      props: { about: about.data.attributes.about_content },
    };
  } catch (e) {
    console.log("ABOUT ERROR:", e);
    return {
      props: {},
    };
  }
}
