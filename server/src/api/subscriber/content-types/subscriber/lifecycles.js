// const emailTemplate = require("../../../../../config/email-templates");
// console.log("");
const emailTemplate = {
  subject: `Thanks for subscribing!`,
  html: `<p>TEST TEST TESTWe heard that you lost your password. Sorry about that!</p>
  <p>But don’t worry! You can use the following link to reset your password:</p>
  <p>Thanks.</p>`,
  text: `We heard that you lost your password. Sorry about that!
  But don’t worry! You can use the following link to reset your password:
  Thanks.`,
};

module.exports = {
  async afterCreate(event) {
    console.log("EMAIL TEMPLATE:", emailTemplate);
    const { result } = event;
    console.log("\nAFTER CREATE EVENT RESULT lifecycle:", result);
    // const email = result.email;
    try {
      await strapi.plugins["email"].services.email.send(
        // d-dd3f4379543545cebbd28771344a978a
        {
          to: result.email,
          from: "moneyandotherthings@gmail.com",
          template_id: "d-dd3f4379543545cebbd28771344a978a",
          // subject: "Thanks for subscribing!",
          // text: "Thanks for subscribing!",
          // html: "Thanks for subscribing!",
        }

        // emailTemplate
      );
      console.log("EMAIL SUCCESSFULY SENT!");
    } catch (e) {
      console.log("ERROR SENDING EMAIL:", e);
    }
    // try {
    //   await strapi.plugins["email"].services.email.sendTemplatedEmail(
    //     {
    //       to: result.email,
    //       from: "moneyandotherthings@gmail.com",
    //       // subject: "Thanks for subscribing!",
    //       // text: "Thanks for subscribing!",
    //       // html: "Thanks for subscribing!",
    //     },

    //     emailTemplate
    //   );
    //   console.log("EMAIL SUCCESSFULY SENT!");
    // } catch (e) {
    //   console.log("ERROR SENDING EMAIL:", e);
    // }
    // try {
    //   await strapi.plugins["email"].services.email.send({
    //     to: result.email,
    //     from: "moneyandotherthings@gmail.com",
    //     subject: "Thanks for subscribing!",
    //     // text: "Thanks for subscribing!",
    //     html: "Thanks for subscribing!",
    //   });
    //   console.log("EMAIL SUCCESSFULY SENT!");
    // } catch (e) {
    //   console.log("ERROR SENDING EMAIL:", e);
    // }
  },
};
