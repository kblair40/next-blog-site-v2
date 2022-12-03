import React from "react";
import { Text, Box, Flex, Heading, Divider } from "@chakra-ui/react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

import { fetchAPI } from "src/utils/api";
const ContactForm = dynamic(() => import("src/components/Forms/ContactForm"), {
  suspense: true,
});

const AboutPage = ({ about }) => {
  return (
    <AnimatePresence>
      <motion.div
        key="about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
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
                src={about.image_url}
                style={{ objectFit: "cover" }}
                // objectFit="cover"
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

          <React.Suspense fallback={<div />}>
            <ContactForm />
          </React.Suspense>
        </Flex>
      </motion.div>
    </AnimatePresence>
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
