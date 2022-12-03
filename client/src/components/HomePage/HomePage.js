import React from "react";
import { Flex, Box, Divider } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

import SEO from "src/components/SEO";
import FeaturedPost from "src/components/FeaturedPost";
import ContactForm from "src/components/Forms/ContactForm";
import SubscribeForm from "src/components/Forms/SubscribeForm";
import AdditionalPosts from "./AdditionalPosts";

const HomePage = ({ homepage, articles }) => {
  let featuredPost;
  if (homepage && homepage.attributes?.featured_post) {
    featuredPost = homepage.attributes.featured_post.article.data;
  }

  return (
    <AnimatePresence>
      <motion.div
        key="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Box pb="2rem" minH="100vh" maxW="100vw" overflowX="hidden" px="1.5rem">
          <SEO seo={homepage?.attributes.seo} />

          <Flex direction="column" align="center" mt="90px" mb="2rem">
            {featuredPost && <FeaturedPost featuredPost={featuredPost} />}

            <SubscribeForm />
          </Flex>

          <AdditionalPosts articles={articles} />

          <Divider borderColor="#303030" mb="2rem" />

          <ContactForm />
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default HomePage;
