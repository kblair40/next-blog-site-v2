import React, { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import {
  Text,
  Flex,
  Box,
  IconButton,
  Tooltip,
  Heading,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Image from "next/image";

import { ShareIcon } from "src/utils/icons";

const ShareModal = dynamic(() => import("src/components/Modals/ShareModal"), {
  suspense: true,
});

const Card = ({ article }) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [articleData, setArticleData] = useState();

  const { asPath } = useRouter();

  useEffect(() => {
    if (article && article.attributes) {
      setArticleData(article.attributes);
    }
  }, [article]);

  return (
    <Flex
      w="100%"
      h={{ base: "200px", sm: "200px", md: "220px" }} // new
      border="1px solid #979797"
      position="relative"
      bg="white" // new
      overflow="hidden"
    >
      <Suspense fallback={<div />}>
        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          articleData={articleData}
        />
      </Suspense>

      <Tooltip label="Share Post" placement="left" openDelay={500}>
        <IconButton
          icon={<ShareIcon boxSize="18px" fill="#303030" />}
          position="absolute"
          top="1rem"
          right="1rem"
          variant="ghost"
          rounded="full"
          _hover={{ bg: "gray.50" }}
          _active={{ bg: "gray.50" }}
          size="sm"
          onClick={() => setShareModalOpen(true)}
        />
      </Tooltip>

      <Box
        h={{ base: "200px", sm: "210px", md: "220px" }} // new
        w={{ base: "220px", sm: "200px", md: "210px" }} // new
        minW={{ base: "120px", sm: "200px", md: "210px" }} // new
        position="relative"
        overflow="hidden"
      >
        {article && article.attributes && article.attributes.image_url ? (
          <Image
            fill
            // should be priority if on a posts page
            priority={asPath !== "/"}
            alt="post image"
            src={article.attributes.image_url}
            style={{ objectFit: "cover" }}
            // sizes="(min-width: 480px) 310px,
            //   240px" // new
          />
        ) : null}
      </Box>

      <Flex
        h="100%"
        w={{ base: "100%" }}
        direction="column"
        p={{
          base: "20px 12px 17px",
          sm: "28px 16px 25px 12px",
          md: "28px 16px 25px 20px",
          lg: "28px 24px 25px 20px",
        }}
        overflowY="hidden" // just in case
        bg="white" // new
        // border="1px solid red"
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
              fontSize={{ base: "22px", sm: "24px", md: "28px" }}
              _groupHover={{ color: "brand.lightgreen" }}
              transition="color 0.3s"
              noOfLines={2}
              lineHeight={{ base: "1.2", md: "1.3" }}
            >
              {article.attributes.title}
            </Text>

            {/* <Heading
              fontWeight="700"
              mb="12px"
              fontSize={{ base: "22px", sm: "24px", md: "30px" }}
              _groupHover={{ color: "brand.lightgreen" }}
              transition="color 0.3s"
              noOfLines={2}
              lineHeight={{ base: "1.2", md: "1.3" }}
            >
              {article.attributes.title}
            </Heading> */}

            <Text
              w="100%"
              // border="1px solid green"
              _groupHover={{ color: "brand.lightgreen" }}
              transition="color 0.3s"
              noOfLines={2}
            >
              {article.attributes.preview_text || ""}
            </Text>
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Card;
