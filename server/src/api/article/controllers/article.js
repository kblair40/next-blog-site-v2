"use strict";

/**
 *  article controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController("api::article.article");

const controller = createCoreController("api::article.article");

module.exports = controller;
