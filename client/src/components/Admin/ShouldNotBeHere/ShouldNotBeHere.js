import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Center,
  Spinner,
} from "@chakra-ui/react";

import useIsAdmin from "src/hooks/useIsAdmin";

const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

const ShouldNotBeHere = ({ children }) => {
  const [passwordValue, setPasswordValue] = useState("");

  console.log("PASSWORD:", password);

  const { isAdmin, loading } = useIsAdmin();

  const handleSubmit = () => {
    console.log(
      "passwordvalue:",
      passwordValue,
      typeof passwordValue,
      typeof password
    );
    if (passwordValue === password) {
      localStorage.setItem("isAdmin", true);
    }
  };

  return (
    <React.Fragment>
      {!isAdmin ? (
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

            <Button ml="1rem" size="sm" onClick={handleSubmit}>
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

export default ShouldNotBeHere;
