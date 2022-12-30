module.exports = {
  routes: [
    {
      // Path defined with a regular expression
      method: "GET",
      path: "/article/search/:searchText", // Only match when the URL parameter is composed of lowercase letters
      handler: "search.search",
      config: {
        auth: false,
      },
    },
  ],
};
