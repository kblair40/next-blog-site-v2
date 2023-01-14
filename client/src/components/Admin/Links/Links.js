import React from "react";
import Link from "next/link";
import { Box, Flex, Stack, Button, Text } from "@chakra-ui/react";

const Links = () => {
  return (
    <Flex justify="center">
      <Stack w={{ base: "300px", sm: "400px" }}>
        <ButtonLink to="/admin/drafts" label="Drafts" />
        <ButtonLink to="/admin/flipbook" label="Flipbook Sandbox" />
      </Stack>
    </Flex>
  );
};

export default Links;

const ButtonLink = ({ to, label }) => {
  return (
    <Link href={to}>
      <Button
        variant="unstyled"
        w="100%"
        display={"flex"}
        justifyContent="center"
        alignItems="center"
      >
        <Text>{label}</Text>
      </Button>
    </Link>
  );
};
