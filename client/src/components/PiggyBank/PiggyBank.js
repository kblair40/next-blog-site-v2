import React from "react";
import { Heading, Box, Text, Center } from "@chakra-ui/react";

const PiggyBank = () => {
  return (
    <Center
      flexDirection="column"
      h="calc(100vh - 200px)"
      // border="1px solid black"
    >
      <Text
        // as={Heading}
        fontWeight="600"
        textAlign="center"
        color="brand.darkgreen"
        fontSize={{ base: "40px", sm: "44px" }}
      >
        Coming Soon
      </Text>

      <Box
        transform={{ base: "scale(0.5)", sm: "scale(0.6)" }}
        mt={{ base: "-2.5rem" }}
      >
        <div className="piggy-wrapper">
          <div className="piggy-wrap">
            <div className="piggy">
              <div className="nose"></div>
              <div className="mouth"></div>
              <div className="ear"></div>
              <div className="tail">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="eye"></div>
              <div className="hole"></div>
            </div>
          </div>
          <div className="coin-wrap">
            <div className="coin">$</div>
          </div>
          <div className="legs"></div>
          <div className="legs back"></div>
        </div>
      </Box>
    </Center>
  );
};

export default PiggyBank;
