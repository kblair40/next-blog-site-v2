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
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

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
      console.log("SUBSCRIBERS RES:", subscribersRes.data);
      if (subscribersRes && subscribersRes.data && subscribersRes.data.length) {
        foundSubscriber = subscribersRes.data[0];
        console.log("\n\nFOUND SUBSCRIBER:", foundSubscriber);
      } else if (subscribersRes?.data && !subscribersRes.data.length) {
        showErrorToast();
        setNotFound(true);
        setLoading(false);
        return;
      }
    } catch (e) {
      console.log("ERROR: FAILED FETCHING SUBSCRIBERS:", e);
      setNotFound(true);
      setLoading(false);
      return;
    }

    if (foundSubscriber) {
      console.log("YES FOUND SUBSCRIBER:", foundSubscriber);
      const { id } = foundSubscriber;
      console.log("ID:", id);

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

        // console.log("\n\nUNSUBSCRIBE RES:", unsubscribeRes, "\n\n");

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
        setError("Failed to patch found subscriber");
      }
    }

    setLoading(false);
    setValue("");
  };

  const showErrorToast = () => {
    toast({
      duration: 3000,
      render: () => (
        <CustomToast
          // description="Sorry to see you go!"
          msg={`Sorry, something went wrong.  Please use the "send unsubscribe email" link above`}
          status="failure"
        />
      ),
    });
  };

  return (
    <Center h="400px">
      <Stack w="80vw" maxW="500px">
        <FormControl>
          <FormLabel>Enter your email address</FormLabel>
          <Input
            focusBorderColor="brand.darkgreen"
            value={value}
            onChange={(e) => setValue(e.target.value)}
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
            <Link href="mailto:moneyandotherthings.com?subject=<your-email-here>&body=Unsubscribe!">
              <Button variant="ghost">Send Email</Button>
            </Link>
          </Flex>
        </Box>
      </Stack>
    </Center>
  );
};

export default Unsubscribe;
