import React from "react";
import { Text, Box, Flex, Divider } from "@chakra-ui/react";
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
          <Box
            w="100%"
            maxW="900px"
            border="1px solid #303030"
            position="relative"
          >
            <Box
              w="100%"
              position="relative"
              h={{ base: "280px", sm: "380px", md: "480px" }}
            >
              <Image
                fill
                priority
                alt="about"
                src={about?.image_url || ""}
                style={{ objectFit: "cover" }}
                sizes="(min-width: 768px) 900px,
                  (min-width: 480px) 800px,
                  500px"
              />
            </Box>

            <Flex w="100%" direction="column" px="1rem" pb="50px">
              <Text fontSize="3xl" my="24px" fontWeight="600">
                {about?.headline || "Hey! So Glad You're Here."}
              </Text>

              <Text>{about?.description || ""}</Text>
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

export async function getServerSideProps() {
  try {
    const about = await fetchAPI("/about", {
      populate: {
        about_content: { populate: ["image"] },
      },
    });
    console.log("\n\nABOUT RESPONSE:", about, "\n\n");

    return {
      props: { about: about?.data?.attributes?.about_content || {} },
    };
  } catch (e) {
    console.log("\n\n\n\n\nABOUT ERROR:", e);
    return {
      props: {},
    };
  }
}

// export async function getStaticProps() {
//   try {
//     const about = await fetchAPI("/about", {
//       populate: {
//         about_content: { populate: ["image"] },
//       },
//     });
//     console.log("\n\nABOUT RESPONSE:", about.data, "\n\n");

//     return {
//       props: { about: about?.data?.attributes?.about_content || {} },
//     };
//   } catch (e) {
//     console.log("ABOUT ERROR:", e);
//     return {
//       props: {},
//     };
//   }
// }
