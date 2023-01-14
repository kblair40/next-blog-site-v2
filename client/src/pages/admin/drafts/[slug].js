import React, { useEffect, useState, Suspense, useRef } from "react";
import { Text, Flex, Divider, Box, Center, Spinner } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { createRoot } from "react-dom/client";
import { useRouter } from "next/router";

import { fetchAPI } from "src/utils/api";
import Loading from "src/components/Loading";

const ShareModal = dynamic(() => import("src/components/Modals/ShareModal"), {
  suspense: true,
});
const Seo = dynamic(() => import("src/components/SEO"), {
  suspense: true,
});
const ImageCarousel = dynamic(() => import("src/components/ImageCarousel"), {
  suspense: true,
});
const ValidateAdmin = dynamic(
  () => import("src/components/Admin/ValidateAdmin"),
  {
    suspense: true,
  }
);

const DraftPostPage = () => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [articleData, setArticleData] = useState();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  const { query } = useRouter();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const articlesRes = await fetchAPI("/articles", {
          publicationState: "preview",
          filters: {
            slug: query.slug,
            publishedAt: { $null: true },
          },
          populate: ["image", "category", "author.picture"],
        });
        // console.log("ARTICLE RES:", articlesRes);

        setArticle(articlesRes?.data[0]);
        setArticleData(articlesRes?.data[0]?.attributes);
      } catch (e) {
        console.log("\nFAILED TO FETCH ARTICLE:", e);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [query.slug]);

  const seo = loading
    ? {}
    : {
        metaTitle: article?.attributes?.title,
        metaDescription: article?.attributes?.description,
        shareImage: article?.attributes?.image,
        article: true,
      };

  return (
    <ValidateAdmin style={{ pt: "2rem" }}>
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

          {loading ? (
            <Center h="200px">
              <Spinner />
            </Center>
          ) : (
            <DraftPreview article={article} />
          )}
        </motion.div>
      </AnimatePresence>
    </ValidateAdmin>
  );
};

export default DraftPostPage;

const DraftPreview = ({ article }) => {
  useEffect(() => {
    // adds target=_blank to all links in blog post so they open in new tab
    let links = Array.from(
      document.querySelector(".ck-content").getElementsByTagName("a")
    );
    links.forEach((link) => (link.target = "_blank"));

    const innerSpans = document.querySelectorAll("a span");
    // console.log("INNER SPANS:", innerSpans);
    innerSpans.forEach((innerSpan) => {
      innerSpan.style.color = "#53614D";
    });
  }, []);

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
    carouselContainer.style.paddingTop = "1rem";

    if (!textAdded.current) {
      let root = createRoot(carouselContainer);
      root.render(<ImageCarousel imageUrls={carousel_images} />);
      textAdded.current = true;
    }
  }, [article]);

  const imgPosV = article?.attributes?.image_position_vertical;
  const imgPosH = article?.attributes?.image_position_horizontal;
  const hasPosition = imgPosV !== undefined && imgPosH !== undefined;

  return (
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
          <Text display="inline">unpublished</Text>
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
            dangerouslySetInnerHTML={{
              __html: article.attributes.content,
            }}
          />
        </Box>

        <Divider borderColor="black" opacity={0.2} mt="2.5rem" />
      </Flex>
    </Flex>
  );
};
