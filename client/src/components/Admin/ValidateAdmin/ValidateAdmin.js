import React, { useState } from "react";
import { Flex, Text, Input, Button, Center, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";

import useIsAdmin from "src/hooks/useIsAdmin";

const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

const ValidateAdmin = ({ children }) => {
  const [passwordValue, setPasswordValue] = useState("");

  const router = useRouter();

  const { isAdmin, loading } = useIsAdmin();

  const handleSubmit = () => {
    if (passwordValue === password) {
      localStorage.setItem("isAdmin", true);
      router.reload(window.location.pathname);
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <Center h="200px">
          <Spinner />
        </Center>
      ) : !isAdmin ? (
        <Flex px="2rem" direction="column" align="center">
          <Text textAlign="center" mb="1rem">
            It looks like you shouldn't be here. Enter the password below for
            access.
          </Text>

          <Flex align="center">
            <Input
              size="sm"
              placeholder="password"
              onChange={(e) => setPasswordValue(e.target.value)}
              value={passwordValue}
            />

            <Button
              minW="max-content"
              ml="1rem"
              size="sm"
              onClick={handleSubmit}
              isDisabled={typeof window === "undefined"}
            >
              Submit
            </Button>
          </Flex>
        </Flex>
      ) : (
        children
      )}
    </React.Fragment>
  );
};

export default ValidateAdmin;
