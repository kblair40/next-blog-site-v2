import React from "react";
import { Box, Divider, Grid, GridItem } from "@chakra-ui/react";
import dynamic from "next/dynamic";

// import Loading from "src/components/Loading";
import FeaturedPost from "src/components/FeaturedPost";
import AdditionalPosts from "./AdditionalPosts";
import ContactForm from "src/components/Forms/ContactForm";
import SEO from "src/components/SEO";
// import FeaturedResources from "src/components/FeaturedResources";
// import SubscribeForm from "src/components/Forms/SubscribeForm";

const ContactForm = dynamic(() => import("src/components/Forms/ContactForm"), {
  loading: "Loading...",
  ssr: false,
});

// const SEO = dynamic(() => import("src/components/SEO"), {
//   loading: "Loading...",
// });
const SubscribeForm = dynamic(
  () => import("src/components/Forms/SubscribeForm"),
  {
    loading: "Loading...",
    ssr: false,
  }
);
// const AdditionalPosts = dynamic(() => import("./AdditionalPosts"), {
//   loading: "Loading...",
// });
const FeaturedResources = dynamic(
  () => import("src/components/FeaturedResources"),
  {
    loading: "Loading...",
    ssr: false,
  }
);

const HomePage = ({ homepage, articles }) => {
  let featuredPost;
  if (homepage && homepage.attributes?.featured_post) {
    featuredPost = homepage.attributes.featured_post.article.data;
  }

  return (
    <Box
      pb="2rem"
      minH="100vh"
      maxW="100vw"
      w="100%"
      // border="1px solid blue"
    >
      {/* <React.Suspense fallback={<div />}> */}
      <SEO seo={homepage?.attributes.seo} />
      {/* </React.Suspense> */}

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
        <GridItem area="feat-p" maxW="900px" m="0 auto">
          <FeaturedPost featuredPost={featuredPost} />
        </GridItem>

        <GridItem area="sub">
          {/* <React.Suspense fallback={<Loading />}> */}
          <SubscribeForm py={{ base: "2rem", md: "3rem" }} />
          {/* </React.Suspense> */}
        </GridItem>

        <GridItem area="feat-r">
          {/* <React.Suspense fallback={<div />}> */}
          <FeaturedResources />
          {/* </React.Suspense> */}
        </GridItem>

        <GridItem area="recent">
          {/* <React.Suspense fallback={<Loading />}> */}
          <AdditionalPosts articles={articles} featuredPost={featuredPost} />
          {/* </React.Suspense> */}
        </GridItem>

        <GridItem area="div">
          <Divider borderColor="#303030" mb="2rem" />
        </GridItem>

        <GridItem area="contact">
          {/* <React.Suspense fallback={<Loading />}> */}
          <ContactForm />
          {/* </React.Suspense> */}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default HomePage;
