import React, { useEffect, useState, Suspense } from "react";
import {
  Heading,
  Text,
  Flex,
  Divider,
  HStack,
  Tooltip,
  Box,
  IconButton,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

import { ShareIcon, CopyIcon } from "src/utils/icons";
import { fetchAPI } from "src/utils/api";
import Loading from "src/components/Loading";

const ShareModal = dynamic(() => import("src/components/Modals/ShareModal"), {
  suspense: true,
});
const Seo = dynamic(() => import("src/components/SEO"), {
  suspense: true,
});

const Article = ({ article }) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [articleData, setArticleData] = useState();

  useEffect(() => {
    if (article && article.attributes) {
      setArticleData(article.attributes);
    }
  }, [article]);

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  };

  useEffect(() => {
    // add target=_blank to all links in blog post so they open in new tab
    let links = Array.from(
      document.querySelector(".ck-content").getElementsByTagName("a")
    );
    links.forEach((link) => (link.target = "_blank"));
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key="article"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Suspense fallback={<Loading />}>
          <ShareModal
            isOpen={shareModalOpen}
            onClose={() => setShareModalOpen(false)}
            articleData={articleData}
          />
        </Suspense>

        <Suspense fallback={<div />}>
          <Seo seo={seo} />
        </Suspense>

        <Flex
          mt="72px"
          w="100%"
          justify="center"
          px={{ base: "1rem", sm: "2rem", md: "4rem" }}
        >
          <Flex
            direction="column"
            w="100%"
            maxW={{ lg: "1000px" }}
            p={{ base: "12px", sm: "24px", md: "40px", lg: "60px" }}
            border="1px solid black"
          >
            <Flex
              mb="2rem"
              w="100%"
              display="inline-flex"
              fontSize="sm"
              align="center"
            >
              <Text display="inline">
                {dayjs(article.attributes.published_at).format("MMM DD")}
              </Text>
              <Text mx="8px" display="inline" fontSize="6px">
                &bull;
              </Text>
              <Text display="inline">{`${article.attributes.minutes_to_read} min read`}</Text>
            </Flex>

            <Heading mb="2rem">{article.attributes.title}</Heading>

            <Box w="100%">
              <Box
                className="ck-content"
                dangerouslySetInnerHTML={{ __html: article.attributes.content }}
              />
            </Box>

            <Divider borderColor="black" opacity={0.2} mt="2.5rem" />

            <Box w="100%" mt="1rem">
              <ShareLinks onClickShare={() => setShareModalOpen(true)} />
            </Box>
          </Flex>
        </Flex>
      </motion.div>
    </AnimatePresence>
  );
};

export async function getStaticPaths() {
  const articlesRes = await fetchAPI("/articles", { fields: ["slug"] });

  return {
    paths: articlesRes.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const articlesRes = await fetchAPI("/articles", {
    filters: {
      slug: params.slug,
    },
    populate: ["image", "category", "author.picture"],
  });
  const categoriesRes = await fetchAPI("/categories");

  return {
    props: { article: articlesRes.data[0], categories: categoriesRes },
    revalidate: 1,
  };
}

export default Article;

const ShareLinks = ({ onClickShare }) => {
  const boxSize = "16px";
  const iconButtonProps = {
    size: "sm",
    rounded: "full",
    bg: "white",
    _hover: { bg: "gray.50" },
    _active: { bg: "gray.100" },
  };

  const router = useRouter();
  // console.log("\n\nROUTER:", router.asPath, "\n\n");

  const { onCopy } = useClipboard(
    "https://www.moneyandotherthings.com" + router.asPath
  );
  const toast = useToast();

  const handleClickCopy = () => {
    onCopy();
    toast({
      duration: 2000,
      render: () => (
        <Flex w="100%" justify="center">
          <Flex
            maxW="max-content"
            justify="center"
            align="center"
            p="8px 1rem"
            bg="brand.lightgreen"
            rounded="md"
          >
            <Text fontSize="xl" fontWeight="600" color="white">
              Copied!
            </Text>
          </Flex>
        </Flex>
      ),
    });
  };

  return (
    <HStack spacing="1.5rem">
      <Tooltip label="Share Post">
        <IconButton
          {...iconButtonProps}
          icon={<ShareIcon boxSize={boxSize} />}
          onClick={onClickShare}
        />
      </Tooltip>

      <Tooltip label="Copy link to this post">
        <IconButton
          {...iconButtonProps}
          icon={<CopyIcon boxSize={boxSize} />}
          onClick={handleClickCopy}
        />
      </Tooltip>
    </HStack>
  );
};
