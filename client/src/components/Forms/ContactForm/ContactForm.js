import React, { useState } from "react";
import {
  Input,
  Textarea,
  Button,
  Heading,
  Stack,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
import emailjs from "@emailjs/browser";

// Todo: Setup emailjs or similar provider

const EMAIL_JS_PRIVATE_KEY = process.env.NEXT_PUBLIC_EMAIL_JS_PRIVATE_KEY;
const EMAIL_JS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY;
const EMAIL_JS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID;
console.log("KEYS:", {
  EMAIL_JS_PRIVATE_KEY,
  EMAIL_JS_PUBLIC_KEY,
  EMAIL_JS_SERVICE_ID,
});

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");

  const getDateString = (timestamp) => {
    let date = new Date(timestamp);
    let month = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();

    return `${month + 1}/${day}/${year}`;
  };

  const setThenClearError = (msg, delay = 10000) => {
    // sets an error, then clears it after 10 (or delay arg) seconds
    setError(msg);
    setTimeout(() => setError(""), delay);
  };

  const handleSubmit = async () => {
    const { name, email, message } = formData;
    console.log("FORM DATA:", formData);

    if (!name || !email || !message) {
      setThenClearError("All fields are required");
      return;
    }

    const lastSentTime = localStorage.getItem("last_sent_timestamp");
    let now = new Date().getTime();
    if (lastSentTime) {
      let lastSentDateString = getDateString(parseInt(lastSentTime));
      let nowDateString = getDateString(now);

      if (nowDateString === lastSentDateString) {
        // message already sent by this user today.
        let errMsg =
          "Only one message per day is allowed.  Please try again tomorrow";
        setThenClearError(errMsg);
        return;
      }
    }

    const templateParams = {
      from_name: name,
      from_email: email,
      message,
    };

    try {
      const sendResponse = await emailjs.send(
        EMAIL_JS_SERVICE_ID,
        "template_7hfy285",
        templateParams,
        EMAIL_JS_PUBLIC_KEY
      );
      console.log("SEND RESPONSE:", sendResponse);
      localStorage.setItem("last_sent_timestamp", now);
    } catch (e) {
      console.log("Failed to send contact form email:", e);
    }
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

          <Flex w="100%" direction="column" align={{ base: "center" }}>
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

            {error && (
              <Text
                mt="8px"
                // height={0}
                opacity={error ? 1 : 0}
                fontSize="sm"
                color="red.400"
                textAlign="center"
                lineHeight={1}
              >
                {error ? error : "noshow"}
              </Text>
            )}
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
};

export default ContactForm;
