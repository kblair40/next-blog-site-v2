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
    <InputGroup w="100%" maxW={{ lg: "180px" }}>
      <InputLeftElement>
        {/* <Flex direction="column" justify="center" h="100%"> */}
        <SearchIcon fill="#ccc" boxSize="16px" />
        {/* </Flex> */}
      </InputLeftElement>
      <Input placeholder="Search..." />
    </InputGroup>
  );
};

export default Search;
