import React, { useState } from "react";
import {
  Input,
  Textarea,
  Button,
  Heading,
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
    // email stuff here
  };

  return (
    <Box w="100%">
      <Heading
        textAlign={{ base: "center" }}
        mb={{ base: "1.5rem", md: "2rem" }}
      >
        Drop Me a Line
      </Heading>

      <Flex justify="center">
        <Stack
          w="100%"
          align={{ base: "center" }}
          spacing="2rem"
          direction={{ base: "column" }}
          maxW={{ base: "500px", md: "700px" }}
        >
          <Stack
            direction={{ base: "column", md: "row" }}
            w="100%"
            spacing={{ base: "2rem", md: "2rem" }}
          >
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              variant="flushed"
              placeholder="Name"
              pl=".5rem"
              focusBorderColor="gray.300"
            />

            <Input
              ml={{ md: "2rem" }}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              variant="flushed"
              placeholder="Email"
              pl=".5rem"
              focusBorderColor="gray.300"
            />
          </Stack>

          <Textarea
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder="Type your message here"
            pl=".5rem"
            rows={4}
            focusBorderColor="gray.300"
          />

          <Flex w="100%" justify={{ base: "center" }}>
            <Button
              w="100%"
              maxW="300px"
              shadow="md"
              bg="brand.lightgreen"
              size="lg"
              color="white"
              _hover={{ bg: "brand.darkgreen" }}
              _active={{ bg: "brand.darkgreen" }}
              fontWeight="700"
              borderRadius="2px"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
};

export default ContactForm;
