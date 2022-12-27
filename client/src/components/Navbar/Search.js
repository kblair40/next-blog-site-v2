import React from "react";
import { SearchIcon } from "src/utils/icons";
import {
  Box,
  Flex,
  Center,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

const Search = () => {
  return (
    <Box
    // position={{ xl: "fixed" }}
    // top={{ xl: "1.75rem" }}
    // right={{ xl: "3rem" }}
    >
      <InputGroup
        w="100%"
        maxW={{ md: "140px", lg: "180px", xl: "220px" }}
        minW={{ md: "140px" }}
        ml={{ md: "1rem", lg: "1.5rem" }}
        mr={{ md: "1rem", xl: 0 }}
        size="sm"
      >
        <InputLeftElement>
          {/* <Flex
          direction="column"
          justify="center"
          h="100%"
          border="1px solid black"
        > */}
          <SearchIcon fill="#ccc" boxSize="16px" />
          {/* </Flex> */}
        </InputLeftElement>
        <Input
          rounded="md"
          borderColor="brand.lightgreen"
          focusBorderColor="brand.lightgreen"
          placeholder="Search..."
          _placeholder={{ color: "brand.darkgreen", opacity: "0.8" }}
          _hover={{ borderColor: "brand.darkgreen" }}
          transition="border-color 0.2s"
        />
      </InputGroup>
    </Box>
  );
};

export default Search;
