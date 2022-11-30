import React, { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  Box,
  Divider,
  Text,
} from "@chakra-ui/react";
import axios from "axios";

import SEO from "src/components/SEO";
import FeaturedPost from "src/components/FeaturedPost";
import ContactForm from "src/components/Forms/ContactForm";
import SubscribeForm from "src/components/Forms/SubscribeForm";
import AdditionalPosts from "./AdditionalPosts";
import useAnalyticsEventTracker from "src/hooks/useAnalyticsEventTracker";

const NEXT_PUBLIC_API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

const HomePage = ({ homepage }) => {
  let featuredPost;
  if (homepage && homepage.attributes?.featured_post) {
    featuredPost = homepage.attributes.featured_post.article.data;
  }

  return (
    <Box pb="2rem" minH="100vh" maxW="100vw" overflowX="hidden" px="1.5rem">
      <SEO seo={homepage?.attributes.seo} />
      <Flex direction="column" align="center" mt="90px" mb="2rem">
        {featuredPost && <FeaturedPost featuredPost={featuredPost} />}
        <SubscribeForm />
      </Flex>

      <AdditionalPosts />

      <Divider borderColor="#303030" mb="2rem" />

      <ContactForm />
    </Box>
  );
};

export default HomePage;
