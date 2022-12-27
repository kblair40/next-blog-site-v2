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
      // ml="-1rem" // maxW 186, should be 166 to match image width.  -1rem ml offsets difference
      // maxW={{ md: "120px", lg: "166px" }}
      ml={{ base: "2rem", md: "-12px" }}
      mr={{ base: "2rem", md: "unset" }}
      maxW={{ base: "100%", sm: "200px", md: "120px", lg: "186px" }}
      minW={{ base: "100px", md: "120px" }}
      variant={{ base: "unstyled" }}
      borderBottom="1px solid"
      transition="border-color 0.2s"
      borderColor="brand.lightgreen"
      _hover={{ borderColor: "brand.darkgreen" }}
      alignSelf={{ base: "flex-end", md: "center" }}
    >
      <InputLeftElement w="24px">
        <SearchIcon fill="#fff" boxSize="16px" />
      </InputLeftElement>
      <Input
        pl="32px"
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
