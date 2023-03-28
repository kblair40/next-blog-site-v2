import React from "react";
import { Box, Text, Flex, Center } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

const FeaturedPost = ({ featuredPost, slideNum }) => {
  console.log("FEATURED POST:", featuredPost);
  const keyStr =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  const triplet = (e1, e2, e3) => {
    return (
      keyStr.charAt(e1 >> 2) +
      keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
      keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
      keyStr.charAt(e3 & 63)
    );
  };

  const rgbDataURL = (r, g, b) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;
  return (
    <Box w="100%">
      <Box
        width="100%"
        height={{ base: "191px", sm: "236px", md: "394px", lg: "506px" }}
        position="relative"
      >
        <Image
          alt="post image"
          src={featuredPost?.attributes.image_url}
          placeholder="blue"
          blurDataURL={rgbDataURL(255, 249, 243)}
          style={{ objectFit: "cover" }}
          sizes="(min-width: 992px) 900px,
          (min-width: 768px) 700px,
          (min-width: 480px) 450px,
          350px"
          priority
          fill
        />
      </Box>

      <Flex
        w={{ base: "100%" }}
        direction="column"
        p={{ base: "20px 16px 15px", sm: "28px 24px 25px" }}
        // border="1px solid black"
        borderTop="none"
        boxSizing="border-box"
        bg="white" // new
      >
        <Box display="inline" fontSize="xs" mb="1rem">
          <Text display="inline">
            {dayjs(featuredPost?.attributes.createdAt).format("MMM DD, YYYY")}
          </Text>
          <Text display="inline" mx="6px">
            &bull;
          </Text>
          <Text display="inline">
            {featuredPost?.attributes.minutes_to_read
              ? `${featuredPost?.attributes.minutes_to_read} min`
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
              // fontSize="30px"
              fontSize={{ base: "22px", sm: "26px", md: "30px" }}
              _groupHover={{ color: "brand.lightgreen" }}
              transition="color 0.3s"
              noOfLines={2}
            >
              {featuredPost?.attributes.title}
            </Text>

            <Text
              _groupHover={{ color: "brand.lightgreen" }}
              transition="color 0.3s"
              noOfLines={2}
            >
              {featuredPost?.attributes.preview_text || ""}
            </Text>
          </Flex>
        </Link>
      </Flex>
    </Box>
  );
};

export default FeaturedPost;
