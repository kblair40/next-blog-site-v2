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
      maxW={{ md: "140px" }}
      minW={{ md: "140px" }}
      ml={{ md: "1rem", lg: "1.5rem" }}
      mr={{ md: "1rem" }}
    >
      <InputLeftElement>
        {/* <Flex direction="column" justify="center" h="100%"> */}
        <SearchIcon fill="#ccc" boxSize="16px" />
        {/* </Flex> */}
      </InputLeftElement>
      <Input
        borderColor="brand.lightgreen"
        focusBorderColor="brand.lightgreen"
        placeholder="Search..."
      />
    </InputGroup>
  );
};

export default Search;
