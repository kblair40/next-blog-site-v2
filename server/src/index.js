"use strict";

const boostrap = require("./bootstrap");

module.exports = {
  async bootstrap() {
    await boostrap();
    // console.log("ASYNC BOOTSTRAP STRAPI:", Object.keys(strapi));
  },
};
