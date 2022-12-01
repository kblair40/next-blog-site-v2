import React from "react";
import { Flex, HStack, Text } from "@chakra-ui/react";

import { CheckCircleIcon } from "src/utils/icons";

// status === "success" | "failure"
const CustomToast = ({ msg, status = "success", description = null }) => {
  const isSuccess = status === "success";
  const bg = isSuccess ? "brand.lightgreen" : "red.50";
  const color = isSuccess ? "white" : "red.600";

  return (
    <Flex
      align="center"
      bg={bg}
      // h={description ? "64px" : "48px"}
      p="1rem"
      rounded="md"
    >
      <HStack spacing="1rem">
        {isSuccess ? <CheckCircleIcon fill="white" boxSize="18px" /> : null}
        <Flex direction="column">
          <Text
            textAlign={!isSuccess ? "center" : "left"}
            color={color}
            fontWeight="700"
            fontSize="lg"
          >
            {msg}
          </Text>

          {description ? <Text color={color}>{description}</Text> : null}
        </Flex>
      </HStack>
    </Flex>
  );
};

export default CustomToast;
