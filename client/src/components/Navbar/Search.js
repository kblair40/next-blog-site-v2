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
    <InputGroup
      w="100%"
      // maxW={{ md: "140px", lg: "180px", xl: "180px" }}
      // ml="-1rem" // maxW 166, should be 150 to match image width.  -1rem ml offsets difference
      // maxW={{ md: "120px", lg: "166px" }}
      // ml="-12px"
      maxW={{ md: "120px", lg: "186px" }}
      minW={{ base: "180px", md: "120px" }}
      // minW={{ md: "120px" }}
      // ml={{ md: "1rem", lg: "1.5rem" }}
      // ml={{ md: "1.5rem", lg: "2rem" }}
      // mr={{ md: "0rem", lg: "1rem" }}
      // size="sm"
    >
      <InputLeftElement>
        {/* <Flex
          direction="column"
          justify="center"
          h="100%"
          border="1px solid black"
        > */}
        <SearchIcon fill="#fff" boxSize="16px" />
        {/* </Flex> */}
      </InputLeftElement>
      <Input
        rounded="md"
        borderColor="brand.lightgreen"
        focusBorderColor="brand.lightgreen"
        placeholder="Search..."
        _placeholder={{
          color: "brand.darkgreen",
          opacity: "0.8",
          fontSize: "14px",
        }}
        _hover={{ borderColor: "brand.darkgreen" }}
        transition="border-color 0.2s"
      />
    </InputGroup>
  );
};

export default Search;
