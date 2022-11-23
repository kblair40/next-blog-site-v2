import React from "react";
import { Flex, Heading, Input, Button, Box } from "@chakra-ui/react";
import Articles from "src/components/Articles";
import SEO from "src/components/SEO";
// import FeaturedPost from "components/FeaturedPost";

const HomePage = ({ articles, categories, homepage }) => {
  return (
    <Box minH="100vh" maxW="100vw" overflowX="hidden">
      <SEO seo={homepage?.attributes.seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{homepage?.attributes.hero.title}</h1>
          <Articles articles={articles} />
        </div>
      </div>
    </Box>
  );
};

export default HomePage;

const SubscribeSection = () => {
  return (
    <Flex
      mt="72px"
      borderTop="1px solid black"
      borderBottom="1px solid black"
      width={{
        base: "340px",
        sm: "calc(100% - 68px)",
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
