import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import { Heading, Text, Flex, Divider } from "@chakra-ui/react";
import dayjs from "dayjs";

import { TwitterIcon, FacebookIcon } from "src/utils/icons";
import Seo from "src/components/Seo";
import { fetchAPI } from "src/utils/api";
import { getStrapiMedia } from "src/utils/media";

const Article = ({ article, categories }) => {
  const imageUrl = getStrapiMedia(article.attributes.image);

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  };

  return (
    <Fragment>
      <Seo seo={seo} />
      <Flex mt="72px" w="100%" justify="center">
        <Flex
          direction="column"
          w="100%"
          maxW={{ base: "360px", sm: "460px", md: "730px" }}
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

          <ReactMarkdown children={article.attributes.content} />

          <Divider borderColor="black" opacity={0.2} mt="2.5rem" />
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
