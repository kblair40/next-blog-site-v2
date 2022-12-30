"use strict";

/**
 *  article search controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

const controller = createCoreController(
  "api::article.article",
  ({ strapi }) => {
    // console.log("STRAPI:", strapi);
    return {
      async search(ctx) {
        console.log("\n\n\n\nCUSTOM ACTION CONTEXT:", ctx.params, "\n\n\n\n");
        try {
          ctx.body = "ok";
        } catch (err) {
          ctx.body = err;
        }
      },
    };
  }
);

module.exports = controller;
