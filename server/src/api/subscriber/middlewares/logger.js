module.exports = (config, { strapi }) => {
  console.log("\n\nCONFIG:", { config, strapi });
  return (context, next) => {
    console.log("\n\nCONTEXT:", { context });

    next();
  };
};
