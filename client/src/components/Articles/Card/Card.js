import React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import { Text, Flex, Box } from "@chakra-ui/react";

import { getStrapiMedia } from "src/utils/media";
import Image from "next/image";

const Card = ({ article }) => {
  return (
    <React.Fragment>
      <Box
        width={{ base: "340px", sm: "420px", md: "700px", lg: "900px" }}
        height={{ base: "191px", sm: "236px", md: "394px", lg: "506px" }}
        position="relative"
      >
        <Image
          alt="post image"
          src={getStrapiMedia(article.attributes.image)}
          objectFit="cover"
          fill
        />
      </Box>

      <Flex
        width={{ base: "340px", sm: "420px", md: "700px", lg: "900px" }}
        direction="column"
        p="28px 24px 25px"
        border="1px solid black"
        borderTop="none"
        boxSizing="border-box"
      >
        <Box display="inline" fontSize="xs" mb="1rem">
          <Text display="inline" textTransform="uppercase">
            {dayjs(article.attributes.createdAt).format("MMM DD, YYYY")}
          </Text>
          <Text display="inline" mx="6px">
            &bull;
          </Text>
          <Text display="inline">5 Min</Text>
        </Box>

        <Link href={`/article/${article.attributes.slug}`}>
          <Flex direction="column" role="group" cursor="pointer">
            <Text
              fontWeight="700"
              mb="12px"
              fontSize="30px"
              _groupHover={{ color: "brand.lightgreen" }}
              transition="color 0.3s"
            >
              {article.attributes.title}
            </Text>

            <Text
              _groupHover={{ color: "brand.lightgreen" }}
              transition="color 0.3s"
              noOfLines={2}
            >
              {article.attributes.preview_text || ""}
            </Text>
          </Flex>
        </Link>
      </Flex>
    </React.Fragment>
  );
};

export default Card;
