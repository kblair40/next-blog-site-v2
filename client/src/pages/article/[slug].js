import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";
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

import { TwitterIcon, FacebookIcon, CopyIcon } from "src/utils/icons";
import Seo from "src/components/SEO";
import { fetchAPI } from "src/utils/api";

const Article = ({ article }) => {
  // TODO: ADD SCRIPT THAT RUNS WHEN CONTENT CHANGES AND ADDS target=_blank TO ALL ANCHOR ELEMENTS

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  };

  return (
    <Fragment>
      <Seo seo={seo} />
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

          <Box
            sx={{
              ".markdown": {
                whiteSpace: "pre-wrap",
                "& a": {
                  color: "brand.lightgreen",
                },
                // "& img": {
                //   float: "right",
                //   width: "55%",
                //   marginLeft: "3rem",
                // },
              },
            }}
          >
            <ReactMarkdown className="markdown">
              {article.attributes.content}
            </ReactMarkdown>
          </Box>

          <Divider borderColor="black" opacity={0.2} mt="2.5rem" />

          <Box w="100%" mt="1rem">
            <ShareLinks />
          </Box>
        </Flex>
      </Flex>
    </Fragment>
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

const ShareLinks = () => {
  const boxSize = "16px";
  const iconButtonProps = {
    size: "sm",
    rounded: "full",
    bg: "white",
    _hover: { bg: "gray.50" },
    _active: { bg: "gray.100" },
  };

  const router = useRouter();
  console.log("\n\nROUTER:", router.asPath, "\n\n");

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
      <Tooltip label="Share to Facebook">
        <IconButton
          {...iconButtonProps}
          icon={<FacebookIcon boxSize={boxSize} />}
        />
      </Tooltip>

      <Tooltip label="Share to Twitter">
        <IconButton
          {...iconButtonProps}
          icon={<TwitterIcon boxSize={boxSize} />}
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
