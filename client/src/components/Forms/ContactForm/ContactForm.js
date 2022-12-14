import React, { useState } from "react";
import {
  Input,
  Textarea,
  Button,
  // Heading,
  Stack,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
import emailjs from "@emailjs/browser";
import { validateEmail } from "src/utils/helpers";

// Todo: Setup emailjs or similar provider

const EMAIL_JS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY;
const EMAIL_JS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID;

const DEFAULT_FORM_DATA = {
  name: "",
  email: "",
  message: "",
};

const ContactForm = () => {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [error, setError] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);

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

    const isValid = validateEmail(email);
    // console.log("\n\nVALID EMAIL?", isValid);
    if (!isValid) {
      // console.log("invalid");
      setInvalidEmail(true);
      return;
    }

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
      // console.log("SEND RESPONSE:", sendResponse);

      localStorage.setItem("last_sent_timestamp", now);

      setFormData(DEFAULT_FORM_DATA);
    } catch (e) {
      console.log("Failed to send contact form email:", e);
    }
  };

  const inputStyles = {
    borderColor: "#868686",
    focusBorderColor: "brand.lightgreen",
    _placeholder: { color: "brand.darkgreen", opacity: 0.8 },
  };

  return (
    <Box w="100%" id="contact">
      <Text
        fontSize="32px"
        fontWeight="700"
        textAlign={{ base: "center" }}
        mb={{ base: "1.5rem" }}
      >
        Drop me a line
      </Text>

      <Flex justify="center">
        <Stack
          w="100%"
          align={{ base: "center" }}
          spacing="2rem"
          direction={{ base: "column" }}
          maxW={{ base: "500px", md: "700px" }}
        >
          <Stack
            // direction={{ base: "column", md: "row" }}
            direction={{ base: "column", lg: "row" }}
            w="100%"
            spacing={{ base: "1.5rem", lg: "2rem" }}
          >
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              variant="flushed"
              placeholder="Name"
              pl=".5rem"
              // focusBorderColor="gray.300"
              {...inputStyles}
            />

            <Input
              type="email"
              ml={{ md: "2rem" }}
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (invalidEmail) {
                  setInvalidEmail(false);
                }
              }}
              variant="flushed"
              placeholder="Email"
              pl=".5rem"
              // focusBorderColor="gray.300"
              {...inputStyles}
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
            // focusBorderColor="gray.300"
            {...inputStyles}
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

            {error || invalidEmail ? (
              <Text
                mt="8px"
                // height={0}
                opacity={error || invalidEmail ? 1 : 0}
                fontSize="sm"
                color="red.400"
                textAlign="center"
                lineHeight={1}
              >
                {error
                  ? error
                  : "That does not appear to be a valid email address"}
              </Text>
            ) : null}
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
};

export default ContactForm;
