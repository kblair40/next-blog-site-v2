"use strict";

/**
 * subscriber controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::subscriber.subscriber",
  ({ strapi }) => ({
    async sendEmail(event) {
      const { result } = event;
      console.log("\nAFTER CREATE EVENT RESULT lifecycle CONTROLLER:", result);

      try {
        await strapi.plugins["email"].services.email.send({
          to: result.email,
          from: "moneyandotherthings@gmail.com",
          subject: "Thanks for subscribing!",
          // text: "Thanks for subscribing!",
          html: "Thanks for subscribing!",
        });
        console.log("EMAIL SUCCESSFULY SENT!");
      } catch (e) {
        console.log("ERROR SENDING EMAIL:", e);
      }
    },
    // create(...args) {
    //   console.log("CREATE ARGS:", args);
    // },
  })
);
