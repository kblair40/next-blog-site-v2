import React, { useState } from "react";
import {
  Input,
  Textarea,
  Button,
  Heading,
  Text,
  Stack,
  Box,
  Flex,
} from "@chakra-ui/react";

// Todo: Setup emailjs or similar provider

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async () => {
    const { name, email, message } = formData;
    console.log("FORM DATA:", formData);
    //
  };

  return (
    <Box w="100%">
      <Heading textAlign={{ base: "center" }} mb="1rem">
        Drop Me a Line
      </Heading>

      <Stack
        w="100%"
        align={{ base: "center" }}
        spacing="1rem"
        direction={{ base: "column" }}
      >
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          variant="flushed"
          placeholder="Name"
          pl=".5rem"
          focusBorderColor="gray.300"
          maxW="500px"
        />

        <Input
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          variant="flushed"
          placeholder="Email"
          pl=".5rem"
          focusBorderColor="gray.300"
          maxW="500px"
        />

        <Textarea
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder="Type your message here"
          pl=".5rem"
          rows={4}
          focusBorderColor="gray.300"
          maxW="500px"
        />

        <Flex w="100%" justify="center">
          <Button
            w="100%"
            shadow="md"
            bg="white"
            size="lg"
            color="black"
            _hover={{ bg: "brand.darkgreen", color: "white" }}
            _active={{ bg: "brand.darkgreen", color: "white" }}
            maxW="500px"
            borderRadius="2px"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default ContactForm;
