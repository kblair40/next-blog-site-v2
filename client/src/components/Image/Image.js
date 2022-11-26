import NextImage from "next/image";
import { Box } from "@chakra-ui/react";

import { getStrapiMedia } from "src/utils/media";

const Image = ({ image }) => {
  const { alternativeText, width, height } = image.data.attributes;

  return <Box />;
};

export default Image;
