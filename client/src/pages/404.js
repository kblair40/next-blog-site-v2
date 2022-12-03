import React from "react";
import { Center, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();

  return (
    <Center flex={1} height="300px" flexDirection="column">
      <Text fontSize="2xl" fontWeight="600">
        404: Page Not found
      </Text>

      <Button
        fontWeight="600"
        transition="all 0.3s"
        bg="brand.lightgreen"
        color="white"
        _hover={{ bg: "brand.darkgreen" }}
        _active={{ bg: "brand.darkgreen" }}
        mt="2rem"
        onClick={() => router.push("/")}
      >
        Click to Keep Browsing
      </Button>
      <Text fontSize="sm" mt=".5rem">
        Or, use any of the links in the navbar
      </Text>
    </Center>
  );
};

export default NotFound;
