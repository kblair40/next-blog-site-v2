import React, { useState } from "react";
import { Text, Flex, useToast, Heading, Input, Button } from "@chakra-ui/react";
import axios from "axios";

import CustomToast from "src/components/CustomToast";
import useAnalyticsEventTracker from "src/hooks/useAnalyticsEventTracker";

const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
// console.log("STRAPI_API_TOKEN:", STRAPI_API_TOKEN);

const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const toast = useToast();

  const eventLogger = useAnalyticsEventTracker();

  const handleSubscribe = async () => {
    if (!email || email.length <= 4) {
      setError("Email address is required");
      setTimeout(() => {
        // if no activity, still clear the error after 10 seconds
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

      const response = await axios({
        method: "post",
        // url: "http://localhost:1337/api/subscribers",
        url: "https://money-and-other-things.herokuapp.com/api/subscribers",
        data: {
          // toLowerCase ALWAYS.  Otherwise unsubscribe may not find the email address
          data: { email: email.toLowerCase(), subscribed_timestamp: now },
        },
        headers: {
          Authorization: `bearer ${STRAPI_API_TOKEN}`,
        },
      });
      // console.log("\nSUBSCRIBE RESPONSE:", response);

      if (response.status === 200) {
        toast({
          duration: 3000,
          // isClosable: true,
          // 300 x 48 for chakra version
          render: () => (
            <CustomToast msg="Thanks for subscribing!" status="success" />
          ),
          // render: () => (
          //   <Flex
          //     align="center"
          //     bg="brand.lightgreen"
          //     h="48px"
          //     px="1rem"
          //     rounded="md"
          //   >
          //     <HStack spacing="1rem">
          //       <CheckCircleIcon fill="white" boxSize="18px" />
          //       <Text color="white" fontWeight="700" fontSize="lg">
          //         Thanks for subscribing!
          //       </Text>
          //     </HStack>
          //   </Flex>
          // ),
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
      mt="72px"
      borderTop="1px solid black"
      borderBottom="1px solid black"
      width={{
        base: "calc(100vw - 32px)",
        sm: "calc(100vw - 64px)",
        md: "700px",
        lg: "900px",
      }}
      h={{ base: "183px" }}
      align={{ base: "center", md: "center" }}
      justify={{ base: "center", md: "space-between" }}
      px={{ base: "1rem" }}
      direction={{ base: "column", md: "row" }}
      position="relative"
    >
      <Heading
        textAlign={{ base: "left" }}
        color="text.body"
        fontSize={{ base: "28px", sm: "36px" }}
        flex={{ md: 1 }}
        fontWeight="800"
        mb={{ base: "1.5rem", md: 0 }}
        mr={{ md: "1rem" }}
      >
        Never Miss a New Post.
      </Heading>

      <Flex align="end">
        <Input
          borderBottom="2px solid"
          borderColor="brand.lightgreen"
          variant="flushed"
          w={{ base: "max-content", sm: "220px", lg: "260px" }}
          placeholder="Email*"
          fontSize="15px"
          _placeholder={{
            fontSize: "15px",
            color: "text.body",
            opacity: "0.8",
          }}
          pl="4px"
          _focusVisible={{ borderColor: "brand.lightgreen" }}
          onFocus={() => eventLogger("click subscribe input")}
          value={email}
          onChange={handleChangeEmail}
          onKeyDown={handleKeyDown}
        />

        <Button
          isDisabled={disabled}
          isLoading={loading}
          w="140px"
          borderRadius="2px"
          ml="12px"
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
