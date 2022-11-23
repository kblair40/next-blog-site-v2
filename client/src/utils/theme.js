import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      darkgreen: "#53614D",
      lightgreen: "#7D9174",
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
    body: "Nunito, system-ui, sans-serif",
    heading: "Playfair Display, serif",
  },
});

export default theme;
