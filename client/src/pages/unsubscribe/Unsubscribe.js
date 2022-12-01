import React, { useState } from "react";
import {
  Input,
  Button,
  Center,
  Stack,
  FormControl,
  FormLabel,
  useToast,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";

import { fetchAPI } from "src/utils/api";
import CustomToast from "src/components/CustomToast";

const Unsubscribe = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [validEmail, setValidEmail] = useState("");

  const toast = useToast();

  const handleSubmit = async () => {
    setLoading(true);

    let foundSubscriber = null;

    try {
      const subscribersRes = await fetchAPI("/subscribers", {
        filters: {
          email: value.toLowerCase(),
        },
      });
      if (subscribersRes?.data && subscribersRes.data.length) {
        foundSubscriber = subscribersRes.data[0];
        if (foundSubscriber.attributes.active === false) {
          showErrorToast("already unsubscribed");
          return;
        }
        console.log("\n\nFOUND SUBSCRIBER:", foundSubscriber);
      } else if (subscribersRes?.data && !subscribersRes.data.length) {
        showErrorToast("not found");

        return;
      }
    } catch (e) {
      console.log("ERROR: FAILED FETCHING SUBSCRIBERS:", e);
      setLoading(false);
      return;
    }

    if (foundSubscriber) {
      // console.log("YES FOUND SUBSCRIBER:", foundSubscriber);
      const { id } = foundSubscriber;
      // console.log("ID:", id);

      const now = new Date().getTime();
      try {
        const unsubscribeRes = await fetchAPI(
          `/subscribers/${id}`,
          {},
          {
            method: "PUT",
            body: JSON.stringify({
              data: { active: false, unsubscribed_timestamp: now },
            }),
          }
        );

        if (
          unsubscribeRes?.data?.attributes &&
          unsubscribeRes.data.attributes.active === false
        ) {
          // unsubscribe was successful
          toast({
            duration: 3000,
            render: () => (
              <CustomToast
                description="Sorry to see you go!"
                msg={`Unsubscribed ${value}`}
                status="success"
              />
            ),
          });
        }
      } catch (e) {
        console.log("\n\nFAILED TO UNSUBSCRIBE:", e, "\n\n");
        setValidEmail(value);
        // The entered email address is valid and was found, but for some unknown reason the PUT request failed.
        // In this case, show the default general error message.
        // The mailto link can use the value of validEmail to pre-populate subject line
        showErrorToast();
      }
    } else {
      showErrorToast("not found");
    }

    setLoading(false);
    setValue("");
  };

  const showErrorToast = (msg = null) => {
    let description = null;
    if (msg && msg === "already unsubscribed") {
      msg = "You are already unsubscribed.";
      description =
        "If you're still receiving emails, please use the 'Send Email' link above to send us an email with your email address in the subject line";
    } else if (msg && msg === "not found") {
      msg = "Could not find a subscriber with that email address";
      description =
        "Please use the 'Send email' link above to send us an email with the email address you would like unsubscribed in the subject line";
    }

    toast({
      duration: 10000, // 10 seconds
      render: () => (
        <CustomToast
          msg={
            msg
              ? msg
              : `Sorry, something went wrong.  Please use the "Send Email" link above`
          }
          status="failure"
          description={description}
        />
      ),
    });

    setLoading(false);
  };

  const emailSubject = validEmail
    ? `Unsubscribe ${validEmail}`
    : "<your-email-here>";

  return (
    <Center h="400px">
      <Stack w="80vw" maxW="500px">
        <FormControl>
          <FormLabel>Enter your email address</FormLabel>
          <Input
            focusBorderColor="brand.darkgreen"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !!value.length) {
                handleSubmit();
              }
            }}
          />
        </FormControl>

        <Button
          isLoading={loading}
          isDisabled={!value}
          onClick={handleSubmit}
          bg={"brand.lightgreen"}
          color="white"
          _hover={{ bg: "brand.darkgreen" }}
          _active={{ bg: "brand.darkgreen" }}
        >
          Unsubscribe
        </Button>

        <Box w="100%" pt="2.5rem">
          <Text textAlign="center">
            If you're having any issues unsubscribing, please send us an email
            at moneyandotherthings@gmail.com with the email address you would
            like removed in the subject line of the email.
          </Text>

          <Flex justify="center" mt="1rem">
            <Link
              href={`mailto:moneyandotherthings.com?subject=${emailSubject}&body=Unsubscribe!`}
            >
              <Button variant="ghost">Send Email</Button>
            </Link>
          </Flex>
        </Box>
      </Stack>
    </Center>
  );
};

export default Unsubscribe;
