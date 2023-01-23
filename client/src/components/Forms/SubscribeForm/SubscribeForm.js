import React, { useState } from "react";
import { Text, Flex, useToast, Input, Button } from "@chakra-ui/react";
import axios from "axios";

import CustomToast from "src/components/CustomToast";
import NeverMissAPost from "src/components/NeverMissAPost";
import { event } from "src/utils/analytics";

const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
const ENV_NAME = process.env.NODE_ENV;

const SubscribeForm = ({ ...props }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const toast = useToast();

  const handleSubscribe = async () => {
    if (!email || email.length <= 4) {
      setError("Email address is required");
      setTimeout(() => {
        // if no activity, still clear the error after 3 seconds
        setError("");
      }, 3000);
      return;
    }

    if (disabled) {
      // user tried submitting via enter key.  Disallow if submits should not be allowed
      return;
    }

    setLoading(true);

    try {
      const now = new Date().getTime();

      let url =
        ENV_NAME === "development"
          ? "http://localhost:1337/api/subscribers"
          : "https://money-and-other-things.herokuapp.com/api/subscribers";

      let authHeader =
        ENV_NAME === "development"
          ? {
              Authorization:
                "bearer " +
                " 7529b2cc2c144b1d036a66c7d729f10b12daae64ec3ddcd1f4309b9ab041d38bc85ed236bdb8c168f2be64658ce378c7a533fa9373f20cbb2d67ae34eba2769a108cfac192ee8c65b7d64d8a59b068b5449fd12e5d0dbae3e780385bbad982cbc0008b725d8a8c8f2d7e6a72ea9e534e43d72688364e9e203a71b2d53dc014b9",
            }
          : { Authorization: `bearer ${STRAPI_API_TOKEN}` };

      const response = await axios({
        method: "post",
        url,
        data: {
          // toLowerCase ALWAYS.  Otherwise unsubscribe may not find the email address
          data: { email: email.toLowerCase(), subscribed_timestamp: now },
        },
        headers: authHeader,
      });
      // console.log("\nSUBSCRIBE RESPONSE:", response);

      if (response.status === 200) {
        if (error) setError("");
        toast({
          duration: 3000,
          render: () => (
            <CustomToast msg="Thanks for subscribing!" status="success" />
          ),
        });

        event({
          action: "subscribe",
          params: {
            event_category: "subscription",
            event_label: email,
          },
        });

        setEmail("");
        setDisabled(true);
        setTimeout(() => {
          // disable submit button for 10 seconds after a successful submit to prevent rapid signups.
          // TODO: make this logic better/safer.  Probably need to get ip addresses involved
          setDisabled(false);
        }, 10000);
      }
    } catch (e) {
      event({
        action: "failed subscribe",
        params: {
          event_category: "subscription",
          event_label: email,
        },
      });
      const error = e.response?.data?.error;
      // console.log("FAILED ADDING NEW SUBSCRIBER:", error ? error.message : e);
      if (error && error.message) {
        let dupErrorMsg =
          "Someone with that email address is already subscribed";
        let invalidErrorMsg =
          "That does not appear to be a valid email address";
        if (error.message.includes("unique")) {
          setError(dupErrorMsg);
        } else if (error.message.includes("valid")) {
          setError(invalidErrorMsg);
        }
      }
    }
    setLoading(false);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    // Clear error every time email value changes
    if (error) setError();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && email.length >= 3) {
      handleSubscribe();
    }
  };

  return (
    <Flex
      id="subscribe"
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="#848484"
      w="100%"
      h="100%"
      align={{ base: "center", md: "center" }}
      justify={{ base: "center", md: "space-between" }}
      px={{ md: ".5rem", lg: "2rem", xl: "8rem" }}
      direction={{ base: "column", md: "row" }}
      position="relative"
      {...props}
    >
      <NeverMissAPost />

      <Flex align="end" justify="end" w={{ base: "100%" }}>
        <Input
          borderBottom="2px solid"
          borderColor="brand.lightgreen"
          variant="flushed"
          w={{ base: "70%", sm: "70%", md: "200px", lg: "260px", xl: "300px" }}
          placeholder="Email*"
          fontSize="15px"
          _placeholder={{
            fontSize: "15px",
            color: "text.body",
            opacity: "0.8",
          }}
          pl="4px"
          _focusVisible={{ borderColor: "brand.lightgreen" }}
          onFocus={() =>
            event({
              action: "click subscribe input",
              params: {
                event_category: "subscription",
              },
            })
          }
          value={email}
          onChange={handleChangeEmail}
          onKeyDown={handleKeyDown}
        />

        <Button
          isDisabled={disabled}
          isLoading={loading}
          w="100%"
          maxW="120px"
          borderRadius="2px"
          ml={{ base: "12px", sm: "20px" }}
          bg="brand.lightgreen"
          color="white"
          transition="background-color 0.3s"
          _hover={{ bg: "text.body" }}
          _active={{ bg: "text.body" }}
          size={{ base: "sm", sm: "md" }}
          onClick={handleSubscribe}
        >
          Subscribe
        </Button>
      </Flex>

      {error && (
        <Text
          position="absolute"
          bottom=".5rem"
          fontSize="13px"
          color="red.400"
          whiteSpace="nowrap"
        >
          {error}
        </Text>
      )}
    </Flex>
  );
};

export default SubscribeForm;
