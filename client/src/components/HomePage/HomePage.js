import React, { useEffect, useState } from "react";
import { Box, Divider, Grid, GridItem } from "@chakra-ui/react";
import dynamic from "next/dynamic";

import FeaturedPosts from "src/components/FeaturedPosts";
import FeaturedPost from "src/components/FeaturedPost";
import AdditionalPosts from "./AdditionalPosts";

const ContactForm = dynamic(() => import("src/components/Forms/ContactForm"), {
  ssr: false,
});

const SubscribeForm = dynamic(
  () => import("src/components/Forms/SubscribeForm"),
  {
    ssr: false,
  }
);

const FeaturedResources = dynamic(
  () => import("src/components/FeaturedResources"),
  {
    ssr: false,
  }
);

const HomePage = ({ homepage, articles }) => {
  const [featuredPosts, setFeaturedPosts] = useState();

  useEffect(() => {
    if (
      homepage &&
      homepage.attributes &&
      homepage.attributes.featured_posts?.articles
    ) {
      let featuredPosts = homepage.attributes.featured_posts.articles.data.map(post => post)
      console.log('\n\nFEATURED POSTS:', featuredPosts, '\n')
      setFeaturedPosts(featuredPosts)
    }
  }, [homepage]);

  return (
    <Box
      pb="2rem"
      minH="100vh"
      maxW="100vw"
      w="100%"
    // border="1px solid blue"
    >
      {/* <SEO seo={homepage?.attributes.seo} /> */}

      <Grid
        mt={{ base: "60px", md: "90px" }}
        mb="2rem"
        gridTemplateAreas={{
          base: `
          "feat-p"
          "sub"
          "recent"
          "feat-r"
          "div"
          "contact"
        `,
          md: `
            "feat-p feat-p"
            "sub sub"
            "recent feat-r"
            "div div"
            "contact contact"
          `,
        }}
        gridTemplateColumns={{
          base: "100%",
          md: "auto minmax(240px, 300px)",
        }}
        w="100%"
        gridTemplateRows={{
          base: "auto auto auto auto 1px 394px",
          sm: "auto auto auto auto 1px 394px",
          md: "auto auto auto 1px 394px",
        }}
        rowGap={{ base: "2.5rem", md: "3.5rem" }}
        columnGap={{ md: "2rem", lg: "4rem" }}
        px={{ base: "1.5rem", sm: "1.5rem", lg: "5rem" }}
        sx={{
          "> *": {
            // border: "1px solid skyblue",
          },
        }}
      >
        {/* <GridItem area="feat-p" maxW="900px" m="0 auto"> */}
        <GridItem
          area="feat-p"
          maxW="1100px"
          m="0 auto"
          position="relative"
          w={{ base: "calc(100vw - 3rem)", sm: "calc(100vw - 4rem)", lg: "calc(100vw - 11rem)" }}
        >
          {featuredPosts && (
            <FeaturedPosts posts={featuredPosts} />
          )}
        </GridItem>

        <GridItem area="sub">
          <SubscribeForm py={{ base: "2rem", md: "3rem" }} />
        </GridItem>

        <GridItem area="feat-r">
          <FeaturedResources />
        </GridItem>

        <GridItem area="recent">
          <AdditionalPosts articles={articles}
          // featuredPost={featuredPost} 
          />
        </GridItem>

        <GridItem area="div">
          <Divider borderColor="#303030" mb="2rem" />
        </GridItem>

        <GridItem area="contact">
          <ContactForm />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default HomePage;
