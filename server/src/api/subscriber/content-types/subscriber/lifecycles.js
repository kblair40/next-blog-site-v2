module.exports = {
  // async init({ strapi }) {
  //   strapi.db.lifecycles.subscribe({
  //     // models: [], // optional;

  //     async afterCreate(event) {
  //       const { result } = event;
  //       console.log("\nAFTER CREATE EVENT RESULT lifecycle:", result);

  //       try {
  //         await strapi.plugins["email"].services.email.send({
  //           to: result.email,
  //           from: "moneyandotherthings@gmail.com",
  //           subject: "Thanks for subscribing!",
  //           // text: "Thanks for subscribing!",
  //           html: "Thanks for subscribing!",
  //         });
  //         console.log("EMAIL SUCCESSFULY SENT!");
  //       } catch (e) {
  //         console.log("ERROR SENDING EMAIL:", e);
  //       }
  //     },
  //   });
  // },
  async afterCreate(event) {
    const { result } = event;
    console.log("\nAFTER CREATE EVENT RESULT lifecycle ONLY:", result);

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
};
