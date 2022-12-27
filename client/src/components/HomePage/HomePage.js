import React from "react";
import { Flex, Box, Divider } from "@chakra-ui/react";
import dynamic from "next/dynamic";

import Loading from "src/components/Loading";
import FeaturedPost from "src/components/FeaturedPost";

const SEO = dynamic(() => import("src/components/SEO"), {
  suspense: true,
});
const ContactForm = dynamic(() => import("src/components/Forms/ContactForm"), {
  suspense: true,
});
const SubscribeForm = dynamic(
  () => import("src/components/Forms/SubscribeForm"),
  {
    suspense: true,
  }
);
const AdditionalPosts = dynamic(() => import("./AdditionalPosts"), {
  suspense: true,
});
const BookRecommendation = dynamic(
  () => import("src/components/BookRecommendation"),
  {
    suspense: true,
  }
);

const HomePage = ({ homepage, articles }) => {
  let featuredPost;
  if (homepage && homepage.attributes?.featured_post) {
    featuredPost = homepage.attributes.featured_post.article.data;
  }

  return (
    <Box pb="2rem" minH="100vh" maxW="100vw" overflowX="hidden" px="1.5rem">
      <React.Suspense fallback={<div />}>
        <SEO seo={homepage?.attributes.seo} />
      </React.Suspense>

      <Flex direction="column" align="center" mt="90px" mb="2rem">
        {/* {featuredPost && <FeaturedPost featuredPost={featuredPost} />} */}
        {/* <Flex w="100%" justify="space-between"> */}
        {featuredPost ? <FeaturedPost featuredPost={featuredPost} /> : null}

        {/* <React.Suspense fallback={<div />}>
            <Box minW={{ base: "200px" }} w={{ base: "200px" }}>
              <BookRecommendation />
            </Box>
          </React.Suspense> */}
        {/* </Flex> */}

        <React.Suspense fallback={<Loading />}>
          <SubscribeForm />
        </React.Suspense>
      </Flex>

      <React.Suspense fallback={<Loading />}>
        <AdditionalPosts articles={articles} />
      </React.Suspense>

      <Divider borderColor="#303030" mb="2rem" />

      <React.Suspense fallback={<Loading />}>
        <ContactForm />
      </React.Suspense>
    </Box>
  );
};

export default HomePage;
