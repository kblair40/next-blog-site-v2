import React, { useEffect, useState } from "react";
import { SearchIcon } from "src/utils/icons";
import { HStack, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Search = () => {
  const [value, setValue] = useState("");

  const { asPath } = useRouter();
  useEffect(() => {
    // anytime path changes, clear input
    setValue("");
  }, [asPath]);

  return (
    <InputGroup
      w="100%"
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
        <SearchIcon fill="brand.lightgreen" boxSize="16px" />
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
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </InputGroup>
  );
};

export default Search;
