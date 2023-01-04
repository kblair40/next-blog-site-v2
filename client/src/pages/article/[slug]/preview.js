import React, { useEffect, useState, Suspense, useRef } from "react";
import { Text, Flex, Divider, Box } from "@chakra-ui/react";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
// import { render } from "react-dom";
import { createRoot } from "react-dom/client";

import { fetchAPI } from "src/utils/api";
import Loading from "src/components/Loading";
import ImageCarousel from "src/components/ImageCarousel";

const ShareModal = dynamic(() => import("src/components/Modals/ShareModal"), {
  suspense: true,
});
const Seo = dynamic(() => import("src/components/SEO"), {
  suspense: true,
});

const Preview = ({ article }) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [articleData, setArticleData] = useState();

  useEffect(() => {
    if (article && article.attributes) {
      setArticleData(article.attributes);
    }
  }, [article]);

  const textAdded = useRef(false);
  useEffect(() => {
    let carousel_images = null;
    if (article && article.attributes) {
      carousel_images = article.attributes.carousel_image_urls;
    }
    if (!carousel_images) {
      console.log("NO CAROUSEL IMAGES");
      return;
    }

    let carouselContainer = document.getElementById("imageCarousel");

    if (!textAdded.current) {
      let root = createRoot(carouselContainer);
      root.render(<ImageCarousel imageUrls={carousel_images} />);
      textAdded.current = true;
    }
  }, [article]);

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  };

  useEffect(() => {
    // adds target=_blank to all links in blog post so they open in new tab
    let links = Array.from(
      document.querySelector(".ck-content").getElementsByTagName("a")
    );
    links.forEach((link) => (link.target = "_blank"));

    const innerSpans = document.querySelectorAll("a span");
    console.log("INNER SPANS:", innerSpans);
    innerSpans.forEach((innerSpan) => {
      innerSpan.style.color = "#53614D";
    });
  }, []);

  const imgPosV = article?.attributes.image_position_vertical;
  const imgPosH = article?.attributes.image_position_horizontal;
  const hasPosition = imgPosV !== undefined && imgPosH !== undefined;

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
          mt="24px"
          w="100%"
          justify="center"
          px={{ base: "1rem", sm: "2rem", md: "4rem" }}
        >
          <Flex
            direction="column"
            w="100%"
            maxW={{ lg: "1000px" }}
            p={{ base: "12px", sm: "24px", md: "40px", lg: "q0px" }}
          >
            <Flex
              mb=".5rem"
              w="100%"
              display="inline-flex"
              fontSize="sm"
              align="center"
            >
              <Text display="inline">
                {dayjs(article.attributes.publishedAt).format("MMM DD")}
              </Text>
              <Text mx="8px" display="inline" fontSize="6px">
                &bull;
              </Text>
              <Text display="inline">{`${article.attributes.minutes_to_read} min read`}</Text>
            </Flex>

            <Text
              fontWeight="700"
              mb="1.5rem"
              textAlign="center"
              fontSize={{ base: "3xl", md: "4xl", lg: "42px" }}
            >
              {article.attributes.title}
            </Text>

            <Box
              w="100%"
              h={{ base: "280px", sm: "320px", md: "380px" }}
              position="relative"
              mb="2rem"
            >
              <Image
                fill
                src={article.attributes.image_url}
                alt="img"
                style={{
                  objectFit: "cover",
                  objectPosition: hasPosition
                    ? `${imgPosH}% ${imgPosV}%`
                    : "center center",
                }}
              />
            </Box>

            <Box
              w="100%"
              sx={{
                a: {
                  color: "#7D9174",
                },
              }}
            >
              <Box
                className="ck-content"
                dangerouslySetInnerHTML={{ __html: article.attributes.content }}
              />
            </Box>

            <Divider borderColor="black" opacity={0.2} mt="2.5rem" />
          </Flex>
        </Flex>
      </motion.div>
    </AnimatePresence>
  );
};

export async function getServerSideProps({ params }) {
  const articlesRes = await fetchAPI("/articles", {
    publicationState: "preview",
    filters: {
      slug: params.slug,
      publishedAt: { $null: true },
    },
    populate: ["image", "category", "author.picture"],
  });

  return {
    props: { article: articlesRes?.data[0] },
  };
}

export default Preview;
