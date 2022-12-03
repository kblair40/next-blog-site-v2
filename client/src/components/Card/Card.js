import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import {
  Text,
  Flex,
  Box,
  IconButton,
  // Menu,
  // MenuButton,
  // MenuList,
  // MenuItem,
  Tooltip,
} from "@chakra-ui/react";

import ShareModal from "src/components/Modals/ShareModal";
import {
  // MoreVerticalIcon,
  ShareIcon,
} from "src/utils/icons";
import Image from "next/image";

const Card = ({ article }) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [articleData, setArticleData] = useState();

  useEffect(() => {
    if (article && article.attributes) {
      setArticleData(article.attributes);
    }
  }, [article]);

  return (
    <Flex
      maxW={{ base: "92vw", sm: "90vw" }}
      w={{ base: "92vw", sm: "90vw", md: "100%" }}
      h={{ base: "200px", sm: "240px", md: "231px" }}
      border="1px solid #303030"
      position="relative"
    >
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        articleData={articleData}
      />

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

      {/* <Menu>
        <MenuButton
          position="absolute"
          top="1rem"
          right="1rem"
          as={IconButton}
          variant="ghost"
          rounded="full"
          _hover={{ bg: "gray.50" }}
          _active={{ bg: "gray.50" }}
          size="sm"
          icon={<MoreVerticalIcon boxSize="18px" />}
        />
        <MenuList py={0}>
          <MenuItem
            icon={<ShareIcon boxSize="14px" />}
            onClick={() => setShareModalOpen(true)}
          >
            Share Post
          </MenuItem>
        </MenuList>
      </Menu> */}

      <Box h="100%" w={{ base: "40%", sm: "50%" }} position="relative">
        {article && article.attributes && article.attributes.image_url ? (
          <Image
            alt="post image"
            src={article.attributes.image_url}
            objectFit="cover"
            priority
            fill
          />
        ) : null}
      </Box>

      <Flex
        h="100%"
        w={{ base: "60%", md: "50%" }}
        direction="column"
        p={{
          base: "20px 12px 17px",
          sm: "28px 12px 25px",
          md: "28px 24px 25px",
        }}
        overflowY="hidden" // just in case
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
              lineHeight={{ base: "1.2", md: "unset" }}
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
