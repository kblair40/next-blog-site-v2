"use strict";

/**
 *  article search controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

const controller = createCoreController(
  "api::article.article",
  ({ strapi }) => {
    // console.log("STRAPI SERVICES:", strapi);
    console.log("\n\nSTRAPI DB KEYS:", Object.keys(strapi.db));
    console.log(
      "\n\nSTRAPI DB MGR KEYS:",
      Object.keys(strapi.db.entityManager)
    );
    const service = strapi.service("api::article.article");
    console.log("\n\nSTRAPI SERVICE:", service);
    return {
      async search(ctx) {
        // console.log("\n\n\n\nCUSTOM ACTION CONTEXT:", ctx.params, "\n\n\n\n");
        try {
          const searchTerm = ctx.params?.searchText || "";
          console.log("\n\nSEARCH TEXT:", searchTerm, "\n\n");
          const allArticles = await service.find();
          console.log("\n\nALL ARTICLES:", allArticles, "\n\n");
          // ctx.body.data = allArticles;
          return allArticles;
          // ctx.body = allArticles;
          // ctx.body = "ok";
        } catch (err) {
          console.log("\n\n\n\nSEARCH ERROR:", err, "\n\n\n\n\n");
          ctx.body = err;

          return { msg: "ERROR ERROR" };
        }
      },
    };
  }
);

module.exports = controller;
