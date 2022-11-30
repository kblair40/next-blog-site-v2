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
        <SubscribeSection />
      </Flex>

      <AdditionalPosts />

      <Divider borderColor="#303030" mb="2rem" />

      <ContactForm />
    </Box>
  );
};

export default HomePage;

const SubscribeSection = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const eventLogger = useAnalyticsEventTracker();

  const handleSubscribe = async () => {
    if (!email) {
      setError("Email address is required");
      return;
    }

    setLoading(true);

    try {
      const now = new Date().getTime();

      const response = await axios({
        method: "post",
        url: "https://money-and-other-things.herokuapp.com/api/subscribers",
        data: {
          data: { email, subscribed_timestamp: now },
        },
        headers: {
          Authorization: `bearer ${NEXT_PUBLIC_API_TOKEN}`,
        },
      });

      console.log("\nSUBSCRIBE RESPONSE:", response.data);
    } catch (e) {
      // console.log("FAILED ADDING NEW SUBSCRIBER:", e);
      const error = e.response?.data?.error;
      console.log("FAILED ADDING NEW SUBSCRIBER:", error.message);
      if (error) {
        setError("Someone with that email address is already subscribed");
      }
    }
    setLoading(false);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    // Clear error every time email value changes
    if (error) setError();
  };

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
      position="relative"
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
          _placeholder={{
            fontSize: "15px",
            color: "text.body",
            opacity: "0.8",
          }}
          pl="4px"
          _focusVisible={{ borderColor: "brand.lightgreen" }}
          onFocus={() => eventLogger("click subscribe input")}
          value={email}
          onChange={handleChangeEmail}
        />

        <Button
          isLoading={loading}
          w="140px"
          borderRadius="2px"
          ml="12px"
          bg="brand.lightgreen"
          color="white"
          transition="background-color 0.3s"
          _hover={{ bg: "text.body" }}
          _active={{ bg: "text.body" }}
          size={{ base: "sm", sm: "md" }}
          onClick={handleSubscribe}
        >
          Subscribe
        </Button>
      </Flex>

      {error && (
        <Text
          position="absolute"
          bottom=".5rem"
          fontSize="13px"
          color="red.400"
          whiteSpace="nowrap"
        >
          {error}
        </Text>
      )}
    </Flex>
  );
};
