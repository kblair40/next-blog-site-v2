import React, { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { Text, Flex, Box, IconButton, Tooltip } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Image from "next/image";

// import ShareModal from "src/components/Modals/ShareModal";
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
      // maxW={{ base: "92vw", sm: "90vw" }}
      w="100%"
      // w={{ base: "92vw", sm: "90vw", md: "100%", lg: "" }}
      h={{ base: "200px", sm: "240px", md: "231px" }}
      border="1px solid #979797"
      position="relative"
      bg="white" // new
      // shadow="lg"
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
        h={{ base: "200px", sm: "240px", md: "231px" }}
        w={{ base: "230px", sm: "300px" }}
        position="relative"
        overflow="hidden"
        // bg="white"
        // border="1px solid red"
      >
        {article && article.attributes && article.attributes.image_url ? (
          <Image
            fill
            // should be priority if on a posts page
            priority={asPath !== "/"}
            alt="post image"
            src={article.attributes.image_url}
            style={{ objectFit: "cover" }}
            sizes="(min-width: 480px) 310px,
              240px"
          />
        ) : null}
      </Box>

      <Flex
        h="100%"
        // w={{ base: "60%", md: "50%" }}
        w={{ base: "60%" }}
        direction="column"
        p={{
          base: "20px 12px 17px",
          sm: "28px 12px 25px",
          md: "28px 24px 25px",
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
              fontSize={{ base: "22px", sm: "24px", md: "30px" }}
              _groupHover={{ color: "brand.lightgreen" }}
              transition="color 0.3s"
              noOfLines={2}
              lineHeight={{ base: "1.2", md: "1.3" }}
              fontFamily="Nunito"
              // color="brand.darkgreen"
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
    </Flex>
  );
};

export default Card;
