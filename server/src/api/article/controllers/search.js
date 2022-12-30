"use strict";
const Fuse = require("fuse.js");

/**
 *  article search controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

const controller = createCoreController(
  "api::article.article",
  ({ strapi }) => {
    const service = strapi.service("api::article.article");

    return {
      async search(ctx) {
        try {
          const searchText = ctx.params?.searchText || "";
          console.log("\n\nSEARCH TEXT:", searchText, "\n\n");
          const allArticles = await service.find();
          console.log("\n\nALL ARTICLES:", allArticles.results, "\n\n");

          const fuse = new Fuse(allArticles.results, {
            includeScore: true,
            minMatchCharLength: 2,
            threshold: 0.5,
            keys: ["title"],
          });

          const searchedArticles = fuse.search(searchText);
          let titles = [];
          if (searchedArticles && searchedArticles.length) {
            titles = searchedArticles.map((art) => {
              console.log("SEARCHED ART:", art);
              return { title: art.item.title, score: art.score };
            });
          }
          console.log("\nSEARCHED ARTICLES:", titles, "\n\n");
          return { results: searchedArticles };
        } catch (err) {
          console.log("\n\n\n\nSEARCH ERROR:", err, "\n\n\n\n\n");
          ctx.body = err;

          return [];
        }
      },
    };
  }
);

module.exports = controller;
