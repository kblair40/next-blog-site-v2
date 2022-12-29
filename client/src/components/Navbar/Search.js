import React, { useEffect, useState, useRef } from "react";
import { SearchIcon } from "src/utils/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Center,
  Spinner,
  Text,
  Box,
  useOutsideClick,
  Flex,
  Stack,
  // HStack,
  // PopoverCloseButton,
  // PopoverAnchor,
  // Portal,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { fetchAPI } from "src/utils/api";

const Search = () => {
  const [value, setValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);

  const popoverContentRef = useRef();

  const router = useRouter();
  useEffect(() => {
    // anytime path changes, clear input
    setValue("");
  }, [router.asPath]);

  const fetchResults = async (searchString) => {
    try {
      // const response = await fetchAPI(
      //   `/fuzzy-search/search?query=${searchString}&locale=en`
      // );
      const response = await fetchAPI(`/fuzzy-search/search`, {
        query: searchString,
        locale: "en",
      });
      console.log("\nRESULTS RESPONSE:", response.data);
    } catch (e) {
      console.error("FAILED TO FIND RESULTS:", e);
      setResults([]);
    }
  };

  const handleChange = async (e) => {
    const { value } = e.target;
    setValue(value);
    // if (value.length >= 2 && !showResults) {
    if (value.length >= 2) {
      console.log("\nOPENING");
      setShowResults(true);

      setSearching(true);

      console.log("SEARCHING", value);
      await fetchResults(value);

      // delete this and replace with real fetch

      // setTimeout(() => {
      //   setResults(["fdsa"]);
      //   // setResults([]);
      //   setSearching(false);
      // }, 1000);
    } else if (value.length < 2 && showResults) {
      console.log("\nCLOSING");
      setShowResults(false);

      if (results && results.length) {
        setResults([]);
      }
    }
    setSearching(false);
  };

  const handleClickResult = (slug) => {
    router.push(`/articles/${slug}`);
  };

  const handleOutsideClick = (e) => {
    const { id } = e.target;
    console.log("\nCLICKED ID:", id, "\n");
    if (id !== "search-input") {
      setShowResults(false);
    } else {
      setShowResults(true);
    }
  };

  useOutsideClick({
    ref: popoverContentRef,
    handler: handleOutsideClick,
  });

  return (
    <Popover autoFocus={false} isOpen={showResults} closeOnBlur={false}>
      <PopoverTrigger>
        <InputGroup
          // border="1px solid green"
          position="relative"
          bottom={{ sm: "4px", md: "-2px" }}
          w="100%"
          ml={{ base: "2rem", md: "-12px" }}
          mr={{ base: "2rem", md: "unset" }}
          maxW={{ base: "100%", sm: "228px", md: "200px", lg: "226px" }}
          // maxW={{ base: "100%", sm: "200px", md: "120px", lg: "186px" }}
          minW={{ base: "100px", md: "120px" }}
          variant={{ base: "unstyled" }}
          borderBottom="1px solid"
          transition="border-color 0.2s"
          borderColor="brand.lightgreen"
          _hover={{ borderColor: "brand.darkgreen" }}
          alignSelf={{ base: "flex-end", md: "center" }}
        >
          <InputLeftElement w="24px" pointerEvents="none">
            <SearchIcon fill="brand.lightgreen" boxSize="16px" />
          </InputLeftElement>
          <Input
            id="search-input"
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

      <PopoverContent ref={popoverContentRef}>
        <PopoverArrow />
        {/* <PopoverHeader p=".5rem 1rem">Header</PopoverHeader> */}

        <PopoverBody p={0}>
          {searching ? (
            <Center h="60px">
              <Spinner />
            </Center>
          ) : !searching && showResults && results.length === 0 ? (
            <Text my=".5rem" textAlign="center" fontWeight="500">
              No Results
            </Text>
          ) : (
            <Box w="100%">
              <Result onClick={handleClickResult} result={{}} />
            </Box>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Search;

const Result = ({ result, onClick }) => {
  return (
    <Box
      onClick={onClick}
      w="100%"
      px="1rem"
      py=".25rem"
      cursor="pointer"
      transition="background-color 0.3s"
      //
      _hover={{
        bg: "brand.creme",
      }}
    >
      <Text fontWeight="500">Combining Finances for the First Time</Text>
      {/* <Text>{result.title}</Text> */}
    </Box>
  );
};
