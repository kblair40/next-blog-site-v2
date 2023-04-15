import React from 'react';
import { Flex, Stack, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

import SEO from 'src/components/SEO';
import PiggyBank from 'src/components/PiggyBank';
import { fetchAPI } from 'src/utils/api';
import Card from 'src/components/Card';

const Posts = ({ articles }) => {
  const { asPath } = useRouter();
  let category = asPath.split('/')[2];
  category = category[0].toUpperCase() + category.slice(1);
  console.log('Category:', category);

  return (
    <>
      {/* <SEO seo={{ metaTitle: `${category}-MAOT` }} /> */}
      <SEO seo={{ metaTitle: category }} />
      <motion.div key={asPath} initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout>
        <Box w='100%' pt='1.5rem'>
          <ArticleList articles={articles} />
        </Box>
      </motion.div>
    </>
  );
};

const ArticleList = ({ articles }) => {
  const sortArticles = (a, b) => {
    // console.log("A/B:", { a, b });
    const { createdAt: aCreatedAt } = a.attributes;
    const { createdAt: bCreatedAt } = b.attributes;
    return dayjs(aCreatedAt).isBefore(dayjs(bCreatedAt)) ? 1 : -1;
  };

  return (
    <Flex w='100%' justify='center' px={{ base: '1rem', sm: '2rem' }}>
      {!!articles && !!articles.length ? (
        <Stack w='100%' spacing='1.5rem'>
          {articles && articles.length
            ? articles.sort(sortArticles).map((article, i) => {
                return <Card article={article} key={i} />;
              })
            : null}
        </Stack>
      ) : (
        <PiggyBank />
      )}
    </Flex>
  );
};

export async function getStaticProps({ params }) {
  const categoriesRes = await fetchAPI('/categories', {
    filters: {
      name: params.category,
    },
    populate: {
      articles: { populate: '*' },
    },
  });
  // console.log("categoriesRes:", categoriesRes);

  let articles;
  try {
    articles = categoriesRes.data[0].attributes.articles.data;
    console.log('ARTICLE:', categoriesRes.data[0].attributes);
  } catch (e) {
    articles = [];
  }

  return {
    props: { articles: articles.reverse() },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  let categoriesRes;
  try {
    categoriesRes = await fetchAPI('/categories', { fields: ['slug'] });
  } catch (e) {
    console.log('FAILED FETCHING ARTICLES:', e);
  }

  let paths = [];
  if (categoriesRes?.data) {
    paths = categoriesRes.data.map((cat) => ({
      params: {
        category: cat.attributes.slug,
      },
    }));
  }

  return { paths, fallback: false };
}

export default Posts;
