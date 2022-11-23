import React, { Fragment } from "react";
import Moment from "react-moment";
import ReactMarkdown from "react-markdown";

import Seo from "src/components/Seo";

import { fetchAPI } from "src/utils/api";
import { getStrapiMedia } from "src/utils/media";

const Posts = ({ article, categories }) => {
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
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <h1>{article.attributes.title}</h1>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          <ReactMarkdown children={article.attributes.content} />
          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div>
              {article.attributes.author.data.attributes.picture && (
                <img
                  src={getStrapiMedia(
                    article.attributes.author.data.attributes.picture
                  )}
                  alt={
                    article.attributes.author.data.attributes.picture.data
                      .attributes.alternativeText
                  }
                  style={{
                    position: "static",
                    borderRadius: "20%",
                    height: 60,
                  }}
                />
              )}
            </div>
            <div className="uk-width-expand">
              <p className="uk-margin-remove-bottom">
                By {article.attributes.author.data.attributes.name}
              </p>
              <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">
                  {article.attributes.published_at}
                </Moment>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export async function getStaticProps({ params }) {
  console.log("PARAMS:", params);
  const articlesRes = await fetchAPI("/articles", {
    filters: {
      category: params.category,
    },
    populate: "*",
  });
  const categoriesRes = await fetchAPI("/categories");

  return {
    props: { article: articlesRes.data[0], categories: categoriesRes },
    // revalidate: 1,
    revalidate: 100,
  };
}

export async function getStaticPaths() {
  let articlesRes;
  try {
    articlesRes = await fetchAPI("/articles", {
      fields: ["category.name"],
    });
  } catch (e) {
    console.log("FAILED FETCHING ARTICLES:", e);
  }

  console.log("\n\nARTICLES RES:", articlesRes, "\n\n");

  return {
    paths: ["/posts/a", "/posts/b", "/posts/idk"],
    // paths: articlesRes.data.map((article) => ({
    //   params: {
    //     category: article.attributes.category,
    //   },
    // })),
    fallback: false,
  };
}

export default Posts;
