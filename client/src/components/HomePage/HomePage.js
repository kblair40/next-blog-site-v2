import React from "react";
import { Flex, Heading, Input, Button, Box, Divider } from "@chakra-ui/react";
// import Articles from "src/components/Articles";
import SEO from "src/components/SEO";
import FeaturedPost from "src/components/FeaturedPost";
import ContactForm from "src/components/Forms/ContactForm";
import AdditionalPosts from "./AdditionalPosts";
import useAnalyticsEventTracker from "src/hooks/useAnalyticsEventTracker";

const HomePage = ({ articles, categories, homepage }) => {
  const eventLogger = useAnalyticsEventTracker();

  let featuredPost;
  if (homepage && homepage.attributes?.featured_post) {
    featuredPost = homepage.attributes.featured_post.article.data;
    // console.log("FEATURED POST:", featuredPost);
  }

  return (
    <Box pb="2rem" minH="100vh" maxW="100vw" overflowX="hidden" px="1.5rem">
      <SEO seo={homepage?.attributes.seo} />
      <Flex direction="column" align="center" mt="90px" mb="2rem">
        {featuredPost && <FeaturedPost featuredPost={featuredPost} />}
        <SubscribeSection />
      </Flex>

      {/* TRAIN OF THOUGHT */}

      <AdditionalPosts />

      <Divider borderColor="#303030" mb="2rem" />

      <ContactForm />
    </Box>
  );
};

export default HomePage;

const SubscribeSection = () => {
  const eventLogger = useAnalyticsEventTracker();
  return (
    <Flex
      mt="72px"
      borderTop="1px solid black"
      borderBottom="1px solid black"
      width={{
        base: "calc(100vw - 32px)",
        sm: "calc(100vw - 64px)",
        md: "700px",
        lg: "900px",
      }}
      h={{ base: "183px" }}
      align={{ base: "center", md: "center" }}
      justify={{ base: "center", md: "space-between" }}
      px={{ base: "1rem" }}
      direction={{ base: "column", md: "row" }}
    >
      <Heading
        textAlign={{ base: "left" }}
        color="text.body"
        fontSize={{ base: "28px", sm: "36px" }}
        flex={{ md: 1 }}
        fontWeight="800"
        mb={{ base: "1.5rem", md: 0 }}
        mr={{ md: "1rem" }}
      >
        Never Miss a New Post.
      </Heading>

      <Flex align="end">
        <Input
          borderBottom="2px solid"
          borderColor="brand.lightgreen"
          variant="flushed"
          w={{ base: "max-content", sm: "220px", lg: "260px" }}
          placeholder="Email*"
          fontSize="15px"
          onFocus={() => eventLogger("click subscribe input")}
          _placeholder={{
            fontSize: "15px",
            color: "text.body",
            opacity: "0.8",
          }}
          pl="4px"
          _focusVisible={{ borderColor: "brand.lightgreen" }}
        />

        <Button
          w="140px"
          borderRadius="2px"
          ml="12px"
          bg="brand.lightgreen"
          color="white"
          transition="background-color 0.3s"
          _hover={{ bg: "text.body" }}
          _active={{ bg: "text.body" }}
          size={{ base: "sm", sm: "md" }}
        >
          Subscribe
        </Button>
      </Flex>
    </Flex>
  );
};

{
  /* <Flex pt="80px" pb="2rem" direction="column" align="center" w="100%">
  <FeaturedPost />
  <SubscribeSection />
</Flex> */
}
