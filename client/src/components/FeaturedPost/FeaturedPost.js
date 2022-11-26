import React from "react";
import { Box, Text, Flex, Center } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

// import { getStrapiMedia } from "src/utils/media";

const FeaturedPost = ({ featuredPost }) => {
  return (
    <React.Fragment>
      <Box
        width={{
          base: "calc(100vw - 32px)",
          sm: "calc(100vw - 64px)",
          md: "700px",
          lg: "900px",
        }}
        // width={{ base: "340px", sm: "420px", md: "700px", lg: "900px" }}
        height={{ base: "191px", sm: "236px", md: "394px", lg: "506px" }}
        position="relative"
      >
        <Image
          alt="post image"
          src={featuredPost.attributes.image_url}
          objectFit="cover"
          fill
        />

        <Center
          px={{ base: "1.5rem", md: "2rem" }}
          h={{ base: "42px", sm: "52px", md: "62px" }}
          position="absolute"
          transform="translateY(-50%)"
          top={0}
          left={0}
          border="5px solid"
          borderColor="brand.darkgreen"
          bg="white"
        >
          <Text
            color="black"
            fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
            letterSpacing={{ base: "3.5px", sm: "6px", md: "8px" }}
          >
            FEATURED POST
          </Text>
        </Center>
      </Box>

      <Flex
        width={{
          base: "calc(100vw - 32px)",
          sm: "calc(100vw - 64px)",
          md: "700px",
          lg: "900px",
        }}
        direction="column"
        p="28px 24px 25px"
        border="1px solid black"
        borderTop="none"
        boxSizing="border-box"
      >
        <Box display="inline" fontSize="xs" mb="1rem">
          <Text display="inline">
            {dayjs(featuredPost.createdAt).format("MMM DD, YYYY")}
          </Text>
          <Text display="inline" mx="6px">
            &bull;
          </Text>
          <Text display="inline">
            {featuredPost.attributes.minutes_to_read
              ? `${featuredPost.attributes.minutes_to_read} min`
              : null}
          </Text>
        </Box>

        <Link
          href={featuredPost ? `/article/${featuredPost.attributes.slug}` : "#"}
        >
          <Flex direction="column" role="group" cursor="pointer">
            <Text
              fontWeight="700"
              mb="12px"
              fontSize="30px"
              _groupHover={{ color: "brand.lightgreen" }}
              transition="color 0.3s"
            >
              {featuredPost.attributes.title}
            </Text>

            <Text
              _groupHover={{ color: "brand.lightgreen" }}
              transition="color 0.3s"
              noOfLines={2}
            >
              {featuredPost.attributes.preview_text || ""}
            </Text>
          </Flex>
        </Link>
      </Flex>
    </React.Fragment>
  );
};

export default FeaturedPost;
