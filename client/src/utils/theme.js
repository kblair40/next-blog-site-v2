import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      darkgreen: "#53614D",
      lightgreen: "#7D9174",
      // creme: "#fff9f3",
      creme: "#fff9f3", // rgb(255, 249, 243)
    },
    text: {
      body: "#303030",
    },
  },
  components: {
    Text: {
      baseStyle: ({ variant }) => {
        const secondary = "#636363";
        const primary = "#303030";
        const colors = { secondary, primary };
        return {
          color: colors[variant],
        };
      }, // 183, 167, 167
      // default values for 'size', 'variant' and 'colorScheme'
      defaultProps: {
        variant: "primary",
      },
      // variants: {},
      // defaultProps: {
      //   size: "",
      //   variant: "",
      //   colorScheme: "",
      // },
    },
  },
  fonts: {
    body: "Nunito, Avenir, Arial, system-ui, sans-serif",
    // heading: "Playfair Display, serif",
    heading: "Bodoni, serif, system-ui",
  },
});

export default theme;
