import React, { useEffect, useState } from "react";
import { SearchIcon } from "src/utils/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  // PopoverCloseButton,
  // PopoverAnchor,
  Portal,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const Search = () => {
  const [value, setValue] = useState("");
  const [showReults, setShowResults] = useState(false);

  const { asPath } = useRouter();
  useEffect(() => {
    // anytime path changes, clear input
    setValue("");
  }, [asPath]);

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
    if (value.length >= 2 && !showResults) {
      console.log("\nOPENING");
      setShowResults(true);
    } else if (value.length < 2 && showResults) {
      console.log("\nCLOSING");
      setShowResults(false);
    }
  };

  return (
    <Popover isOpen={showReults} onClose={() => setShowResults(false)}>
      <PopoverTrigger>
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
            onChange={handleChange}
            value={value}
          />
        </InputGroup>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>Header</PopoverHeader>

        <PopoverBody>{/*  */}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Search;
