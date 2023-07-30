import React, { useEffect, useState, useRef, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Text,
  Heading,
  Flex,
  Divider,
  HStack,
  Tooltip,
  Box,
  Center,
  Spinner,
  IconButton,
  useClipboard,
  useToast,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import SEO from 'src/components/SEO';
import { ShareIcon, CopyIcon } from 'src/utils/icons';
import { fetchAPI } from 'src/utils/api';
import Loading from 'src/components/Loading';
import ImageCarousel from 'src/components/ImageCarousel';

const ShareModal = dynamic(() => import('src/components/Modals/ShareModal'), {
  suspense: true,
});

const Article = ({ article }) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [articleData, setArticleData] = useState();

  const router = useRouter();

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
      console.log('NO CAROUSEL IMAGES');
      return;
    }

    let carouselContainer = document.getElementById('imageCarousel');
    if (!carouselContainer) return;
    carouselContainer.style.paddingTop = '1rem';

    if (!textAdded.current) {
      let root = createRoot(carouselContainer);
      root.render(<ImageCarousel imageUrls={carousel_images} />);
      textAdded.current = true;
    }
  }, [article]);

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.preview_text,
    shareImage: article.attributes.image_url,
    article: true,
  };

  useEffect(() => {
    console.log('article:', article);
    console.log('\nSEO:', seo);
  }, [seo]);

  useEffect(() => {
    // adds target=_blank to all links in blog post so they open in new tab
    if (!document.querySelector('.ck-content')) return;
    let links = Array.from(document.querySelector('.ck-content').getElementsByTagName('a'));
    links.forEach((link) => (link.target = '_blank'));

    const innerSpans = document.querySelectorAll('a span');
    // console.log("INNER SPANS:", innerSpans);
    innerSpans.forEach((innerSpan) => {
      innerSpan.style.color = '#53614D';
    });
  }, []);

  const imgPosV = article?.attributes.image_position_vertical;
  const imgPosH = article?.attributes.image_position_horizontal;
  const hasPosition = imgPosV !== undefined && imgPosH !== undefined;

  if (router.isFallback) {
    return (
      <Center h='calc(100vh - 140px)'>
        <Spinner />
      </Center>
    );
  }

  return (
    <>
      <SEO seo={{ metaTitle: article.attributes.title }} />
      <AnimatePresence>
        <motion.div
          key='article'
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

          <Flex
            border='2px solid red'
            mt='24px'
            w='100%'
            justify='center'
            px={{ base: '1rem', sm: '2rem', md: '4rem' }}
          >
            <Flex
              direction='column'
              w='100%'
              maxW={{ lg: '1000px' }}
              p={{ base: '12px', sm: '24px', md: '40px', lg: 'q0px' }}
            >
              <Flex mb='.5rem' w='100%' display='inline-flex' fontSize='sm' align='center'>
                <Text display='inline'>
                  {dayjs(article.attributes.publishedAt).format('MMM DD')}
                </Text>
                <Text mx='8px' display='inline' fontSize='6px'>
                  &bull;
                </Text>
                <Text display='inline'>{`${article.attributes.minutes_to_read} min read`}</Text>
              </Flex>

              <Heading
                as='h1'
                fontFamily='Avenir'
                fontWeight='700'
                mb='1.5rem'
                lineHeight={1.4}
                textAlign='center'
                fontSize={{ base: '3xl', md: '4xl', lg: '42px' }}
              >
                {article.attributes.title}
              </Heading>

              <Box
                w='100%'
                h={{ base: '280px', sm: '320px', md: '380px' }}
                position='relative'
                mb='2rem'
              >
                <Image
                  fill
                  src={article.attributes.image_url}
                  alt='img'
                  style={{
                    objectFit: 'cover',
                    objectPosition: hasPosition ? `${imgPosH}% ${imgPosV}%` : 'center center',
                  }}
                />
              </Box>

              <Box w='100%' sx={{ a: { color: '#7D9174' } }}>
                <Box
                  className='ck-content'
                  dangerouslySetInnerHTML={{ __html: article.attributes.content }}
                />
              </Box>

              <Divider borderColor='black' opacity={0.2} mt='2.5rem' />

              <Box w='100%' mt='1rem'>
                <ShareLinks onClickShare={() => setShareModalOpen(true)} />
              </Box>
            </Flex>
          </Flex>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export async function getStaticPaths() {
  let paths = [];
  const res = await fetchAPI('/articles');
  for (let article of res.data) {
    paths.push({ params: { slug: article.attributes.slug } });
  }
  // console.log('All Post Paths:', paths);

  // https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-false
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const articlesRes = await fetchAPI('/articles', {
    filters: {
      slug: params.slug,
    },
    populate: ['image', 'category', 'author.picture'],
  });

  // console.log('\n\narticlesRes:', articlesRes, '\n\n');

  return {
    props: {
      article: articlesRes?.data[0],
      revalidate: 10,
    },
  };
}

export default Article;

const ShareLinks = ({ onClickShare }) => {
  const boxSize = '16px';
  const iconButtonProps = {
    size: 'sm',
    rounded: 'full',
    border: '1px solid transparent',
    bg: 'brand.creme',
    transition: 'border-color 0.3s',
    _hover: {
      // bg: "gray.50"
      borderColor: 'brand.lightgreen',
    },
    _active: {
      // bg: "gray.100"
      borderColor: 'brand.darkgreen',
    },
  };

  const router = useRouter();
  // console.log("\n\nROUTER:", router.asPath, "\n\n");

  const { onCopy } = useClipboard('https://www.moneyandotherthings.com' + router.asPath);
  const toast = useToast();

  const handleClickCopy = () => {
    onCopy();
    toast({
      duration: 2000,
      render: () => (
        <Flex w='100%' justify='center'>
          <Flex
            maxW='max-content'
            justify='center'
            align='center'
            p='8px 1rem'
            bg='brand.lightgreen'
            rounded='md'
          >
            <Text fontSize='xl' fontWeight='600' color='white'>
              Copied!
            </Text>
          </Flex>
        </Flex>
      ),
    });
  };

  return (
    <HStack spacing='1.5rem'>
      <Tooltip label='Share Post'>
        <IconButton
          {...iconButtonProps}
          icon={<ShareIcon boxSize={boxSize} />}
          onClick={onClickShare}
        />
      </Tooltip>

      <Tooltip label='Copy link to this post'>
        <IconButton
          {...iconButtonProps}
          icon={<CopyIcon boxSize={boxSize} />}
          onClick={handleClickCopy}
        />
      </Tooltip>
    </HStack>
  );
};
