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
import { motion, AnimatePresence } from "framer-motion";

// import useAnalyticsEventTracker from "src/hooks/useAnalyticsEventTracker";
import { fetchAPI } from "src/utils/api";
import CustomToast from "src/components/CustomToast";

const Unsubscribe = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  // const eventLogger = useAnalyticsEventTracker();

  const toast = useToast();

  const handleSubmit = async () => {
    setLoading(true);

    let foundSubscriberId = null;

    try {
      const response = await fetchAPI("/subscribers", {
        filters: { email: value.trim().toLowerCase() },
      });
      // console.log("\nSUBSCRIBER RESPONSE:", response.data);
      if (response && response.data && response.data[0]) {
        foundSubscriberId = response.data[0].id;
      }
    } catch (e) {
      console.log("\nFAILED TO FIND SUBSCRIBER:", e, "\n");
    }

    if (!foundSubscriberId) {
      // eventLogger("failed unsubscribe", value);
      // No subscriber found - show error toast and return
      showErrorToast("not found");
      return;
    }

    // console.log("foundSubscriberId:", foundSubscriberId);
    try {
      // const unsubscribeRes = await fetchAPI(
      await fetchAPI(`/subscribers/${foundSubscriberId}`, null, {
        method: "DELETE",
      });
      // console.log("\n\n\nUNSUBSCRIBE RES:", unsubscribeRes);
      // eventLogger("successful unsubscribe", value);

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
    } catch (e) {
      console.log("ERROR: FAILED DELETING SUBSCRIBER:", e);
      setLoading(false);
      return;
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
        "Please use the 'Send email' button above to send us an email with the email address you would like unsubscribed in the subject line";
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

  const emailSubject = "<your-email-here>";
  return (
    <AnimatePresence>
      <motion.div
        key="unsubscribe"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
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
                If you're having any issues unsubscribing, please send us an
                email at moneyandotherthings@gmail.com with the email address
                you would like removed in the subject line of the email.
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
      </motion.div>
    </AnimatePresence>
  );
};

export default Unsubscribe;
