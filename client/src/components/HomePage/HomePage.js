import React, { useState } from "react";
import { Box, Divider, Grid, GridItem, Button } from "@chakra-ui/react";
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
const FeaturedResources = dynamic(
  () => import("src/components/FeaturedResources"),
  {
    suspense: true,
  }
);

const HomePage = ({ homepage, articles }) => {
  const [version, setVersion] = useState("original");

  let featuredPost;
  if (homepage && homepage.attributes?.featured_post) {
    featuredPost = homepage.attributes.featured_post.article.data;
  }

  return (
    <React.Fragment>
      <Button
        position="fixed"
        bottom=".5rem"
        right=".5rem"
        variant="unstlyed"
        bg="gray.400"
        boxSize="32px"
        rounded="full"
        onClick={() =>
          setVersion((prev) => (prev === "original" ? "" : "original"))
        }
      />
      {version === "original" ? (
        <Box pb="2rem" minH="100vh" maxW="100vw" w="100%">
          <React.Suspense fallback={<div />}>
            <SEO seo={homepage?.attributes.seo} />
          </React.Suspense>

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
              base: "429px 183px auto auto 1px 394px",
              sm: "474px 183px auto auto 1px 394px",
              md: "auto 183px auto 1px 394px",
            }}
            rowGap={{ base: "2.5rem", sm: "3rem" }}
            columnGap={{ md: "2rem", lg: "4rem" }}
            px={{ base: "1.5rem", sm: "2.5rem", lg: "5rem" }}
            sx={{
              "> *": {
                // border: "1px solid skyblue",
              },
            }}
          >
            <GridItem area="feat-p">
              <FeaturedPost featuredPost={featuredPost} />
            </GridItem>

            <GridItem area="sub">
              <React.Suspense fallback={<Loading />}>
                <SubscribeForm />
              </React.Suspense>
            </GridItem>

            <GridItem area="feat-r">
              <React.Suspense fallback={<div />}>
                <FeaturedResources />
              </React.Suspense>
            </GridItem>

            <GridItem area="recent">
              <React.Suspense fallback={<Loading />}>
                <AdditionalPosts articles={articles} />
              </React.Suspense>
            </GridItem>

            <GridItem area="div">
              <Divider borderColor="#303030" mb="2rem" />
            </GridItem>

            <GridItem area="contact">
              <React.Suspense fallback={<Loading />}>
                <ContactForm />
              </React.Suspense>
            </GridItem>
          </Grid>
        </Box>
      ) : (
        <Box
          pt={{ base: "3rem", md: "5rem" }}
          pb="2rem"
          minH="100vh"
          maxW="100vw"
          w="100%"
        >
          <React.Suspense fallback={<div />}>
            <SEO seo={homepage?.attributes.seo} />
          </React.Suspense>

          <Grid
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
            "feat-p feat-r"
            "sub sub"
            "recent contact"
          `,
            }}
            gridTemplateColumns={{
              base: "auto",
              md: "auto minmax(240px, 300px)",
              lg: "auto minmax(300px, 350px)",
              xl: "auto minmax(380px, 430px)",
            }}
            w="100%"
            gridTemplateRows={{
              base: "auto auto auto auto 1px auto",
              sm: "auto auto auto auto 1px auto",
              md: "auto auto auto",
            }}
            rowGap={{ base: "2.5rem", sm: "3.5rem" }}
            columnGap={{ md: "2.5rem", lg: "4rem" }}
            px={{ base: "1.5rem", sm: "2.5rem", lg: "5rem" }}
          >
            <GridItem area="feat-p">
              <FeaturedPost featuredPost={featuredPost} />
            </GridItem>

            <GridItem area="sub">
              <React.Suspense fallback={<Loading />}>
                <SubscribeForm py={{ base: "2rem", md: "3rem" }} />
              </React.Suspense>
            </GridItem>

            <GridItem area="feat-r">
              <React.Suspense fallback={<div />}>
                <FeaturedResources />
              </React.Suspense>
            </GridItem>

            <GridItem area="recent">
              <React.Suspense fallback={<Loading />}>
                <AdditionalPosts articles={articles} />
              </React.Suspense>
            </GridItem>

            <GridItem area="div" display={{ md: "none" }}>
              <Divider borderColor="#303030" mb="2rem" />
            </GridItem>

            <GridItem area="contact">
              <React.Suspense fallback={<Loading />}>
                <ContactForm />
              </React.Suspense>
            </GridItem>
          </Grid>
        </Box>
      )}
    </React.Fragment>
  );
};

// BACKUP
// const HomePage = ({ homepage, articles }) => {
//   let featuredPost;
//   if (homepage && homepage.attributes?.featured_post) {
//     featuredPost = homepage.attributes.featured_post.article.data;
//   }

//   return (
//     <Box pb="2rem" minH="100vh" maxW="100vw" w="100%">
//       <React.Suspense fallback={<div />}>
//         <SEO seo={homepage?.attributes.seo} />
//       </React.Suspense>

//       <Grid
//         mt={{ base: "60px", md: "90px" }}
//         mb="2rem"
//         gridTemplateAreas={{
//           base: `
//           "feat-p"
//           "sub"
//           "recent"
//           "feat-r"
//           "div"
//           "contact"
//         `,
//           md: `
//             "feat-p feat-p"
//             "sub sub"
//             "recent feat-r"
//             "div div"
//             "contact contact"
//           `,
//         }}
//         gridTemplateColumns={{ base: "100%", md: "auto minmax(240px, 300px)" }}
//         w="100%"
//         gridTemplateRows={{
//           base: "429px 183px auto auto 1px 394px",
//           sm: "474px 183px auto auto 1px 394px",
//           md: "auto 183px auto 1px 394px",
//         }}
//         rowGap={{ base: "2.5rem", sm: "3rem" }}
//         columnGap={{ md: "2rem", lg: "4rem" }}
//         px={{ base: "1.5rem", sm: "2.5rem", lg: "5rem" }}
//         sx={{
//           "> *": {
//             // border: "1px solid skyblue",
//           },
//         }}
//       >
//         <GridItem area="feat-p">
//           <FeaturedPost featuredPost={featuredPost} />
//         </GridItem>

//         <GridItem area="sub">
//           <React.Suspense fallback={<Loading />}>
//             <SubscribeForm />
//           </React.Suspense>
//         </GridItem>

//         <GridItem area="feat-r">
//           <React.Suspense fallback={<div />}>
//             <FeaturedResources />
//           </React.Suspense>
//         </GridItem>

//         <GridItem area="recent">
//           <React.Suspense fallback={<Loading />}>
//             <AdditionalPosts articles={articles} />
//           </React.Suspense>
//         </GridItem>

//         <GridItem area="div">
//           <Divider borderColor="#303030" mb="2rem" />
//         </GridItem>

//         <GridItem area="contact">
//           <React.Suspense fallback={<Loading />}>
//             <ContactForm />
//           </React.Suspense>
//         </GridItem>
//       </Grid>
//     </Box>
//   );
// };

export default HomePage;
