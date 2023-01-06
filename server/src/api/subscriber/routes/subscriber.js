"use strict";

/**
 * subscriber router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::subscriber.subscriber", {
  config: {
    find: {
      auth: false,
    },
    create: {
      auth: false,
    },
    delete: {
      auth: false,
    },
  },
});
