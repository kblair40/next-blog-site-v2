import React, { useState } from "react";
import {
  Input,
  Button,
  Flex,
  Center,
  Stack,
  Box,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const Unsubscribe = () => {
  const [value, setValue] = useState("");

  const handleSubmit = async () => {};

  return (
    <Center h="300px" border="1px solid red">
      <Stack w="100%" maxW="300px">
        <FormControl>
          <FormLabel>Enter your email address</FormLabel>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        </FormControl>

        <Button variant="" isDisabled={!value}>
          Unsubscribe
        </Button>
      </Stack>
    </Center>
  );
};

export default Unsubscribe;
