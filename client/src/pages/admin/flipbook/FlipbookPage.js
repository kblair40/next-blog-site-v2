import React from "react";
import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const Flipbook = dynamic(() => import("src/components/Flipbook"), {
  ssr: false,
});
const ValidateAdmin = dynamic(
  () => import("src/components/Admin/ValidateAdmin"),
  {
    ssr: false,
  }
);

const FlipbookPage = () => {
  return (
    <Box h="calc(100vh - 80px)" w="100%" pt="2rem">
      <ValidateAdmin>
        <Flipbook />
      </ValidateAdmin>
    </Box>
  );
};

export default FlipbookPage;
