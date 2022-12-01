import React from "react";
import { Flex, HStack, Text } from "@chakra-ui/react";

import { CheckCircleIcon } from "src/utils/icons";

// status === "success" | "failure"
const CustomToast = ({ msg, status = "success" }) => {
  const isSuccess = status === "success";
  const bg = isSuccess ? "brand.lightgreen" : "red.100";
  const color = isSuccess ? "white" : "red.600";

  return (
    <Flex align="center" bg="brand.lightgreen" h="48px" px="1rem" rounded="md">
      <HStack spacing="1rem">
        <CheckCircleIcon fill="white" boxSize="18px" />
        <Text color="white" fontWeight="700" fontSize="lg">
          Thanks for subscribing!
        </Text>
      </HStack>
    </Flex>
  );
};

export default CustomToast;
