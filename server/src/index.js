"use strict";

const boostrap = require("./bootstrap");

module.exports = {
  async bootstrap() {
    await boostrap();
    // console.log("ASYNC BOOTSTRAP STRAPI:", Object.keys(strapi));

    strapi.db.lifecycles.subscribe({
      models: ["api::subscriber.subscribe"],
      async afterCreate(event) {
        const { result } = event;
        console.log("\nAFTER CREATE EVENT RESULT lifecycle:", result);

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
    });
  },
};
