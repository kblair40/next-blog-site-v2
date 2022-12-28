import React from "react";
import { Box, Text, Flex, Center } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

// import { getStrapiMedia } from "src/utils/media";

const FeaturedPost = ({ featuredPost }) => {
  return (
    <Box
      // mr="3rem"
      border="1px solid red"
    >
      <Box
        width={{
          // base: "350px",
          base: "100%",
          sm: "450px",
          md: "700px",
          lg: "900px",
        }}
        // width={{
        //   base: "175px",
        //   sm: "225px",
        //   md: "350px",
        //   lg: "450px",
        // }}
        height={{ base: "191px", sm: "236px", md: "394px", lg: "506px" }}
        position="relative"
      >
        <Image
          priority
          fill
          alt="post image"
          src={featuredPost.attributes.image_url}
          style={{ objectFit: "cover" }}
          sizes="(min-width: 992px) 900px,
              (min-width: 768px) 700px,
              (min-width: 480px) 450px,
              350px"
        />

        <Center
          px={{ base: "1.5rem", md: ".75rem" }}
          h={{ base: "42px", sm: "52px", md: "62px" }}
          position="absolute"
          transform="translateY(-50%)"
          top={0}
          // left={"1rem"}
          left={0}
          border="5px solid"
          borderColor="brand.darkgreen"
          // borderColor="white"
          bg="white"
          // bg="brand.darkgreen"
        >
          <Text
            // color="black"
            fontWeight="500"
            // color="#fff"
            color="brand.darkgreen"
            fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
            letterSpacing={{ base: "3.5px", sm: "6px", md: "8px" }}
          >
            FEATURED POST
          </Text>
        </Center>
      </Box>

      <Flex
        width={{
          base: "350px",
          sm: "450px",
          md: "700px",
          lg: "900px",
        }}
        // width={{
        //   base: "175px",
        //   sm: "225px",
        //   md: "350px",
        //   lg: "450px",
        // }}
        direction="column"
        p="28px 24px 25px"
        border="1px solid black"
        borderTop="none"
        boxSizing="border-box"
        bg="white" // new
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
    </Box>
  );
};

export default FeaturedPost;
