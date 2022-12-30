import React, { useEffect, useState, useRef, useCallback } from "react";
import { SearchIcon } from "src/utils/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Center,
  Spinner,
  Text,
  Box,
  useOutsideClick,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Image from "next/image";
import debounce from "lodash.debounce";

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

  const searchCallback = async (searchString) => {
    setSearching(true);
    setShowResults(true);
    const results = await fetchResults(searchString);

    if (results) setResults(results);
    else setResults([]);

    setSearching(false);
  };

  const debouncedFetch = useCallback(debounce(searchCallback, 300), []);

  const fetchResults = async (searchString) => {
    console.log("\n\nSEARCHING\n\n");
    try {
      const response = await fetchAPI(`/article/search/${searchString}`);
      console.log("\nRESULTS RESPONSE:", response.results);
      console.log("\nRESULTS RESPONSE OBJ:", Object.keys(response));
      if (response && response.results) {
        return response.results;
        setResults(response.results);
      }
    } catch (e) {
      console.error("FAILED TO FIND RESULTS:", e);
      return [];
      // setResults([]);
    }
    // if (searching) {
    //   setSearching(false);
    // }
  };

  const handleChange = async (e) => {
    const { value } = e.target;
    setValue(value);
    // if (value.length >= 2 && !showResults) {
    if (value.length >= 2) {
      console.log("\nOPENING");

      // setSearching(true);
      // setShowResults(true);

      console.log("SEARCHING", value);
      await debouncedFetch(value);
      // await fetchResults(value);

      // delete this and replace with real fetch
    } else if (value.length < 2 && showResults) {
      console.log("\nCLOSING");
      setShowResults(false);

      if (results && results.length) {
        setResults([]);
      }
    }

    if (searching) {
      setSearching(false);
    }
  };

  const handleClickResult = (slug) => {
    setShowResults(false);
    router.push(`/article/${slug}`);
  };

  const handleOutsideClick = (e) => {
    const { id } = e.target;
    console.log("\nCLICKED ID:", id, "\n");
    if (id !== "search-input") {
      setShowResults(false);
    }
    // else {
    //   setShowResults(true);
    // }
  };

  useOutsideClick({
    ref: popoverContentRef,
    handler: handleOutsideClick,
  });

  // const
  return (
    <Popover
      autoFocus={false}
      isOpen={showResults}
      placement="bottom-start"
      // placement={{ md: "bottom", lg: "bottom-start" }}
      // matchWidth={true}
      // closeOnBlur={false}
    >
      <PopoverTrigger>
        <InputGroup
          // border="1px solid green"
          position="relative"
          bottom={{ sm: "4px", md: "-2px" }}
          w="100%"
          ml={{ base: "2rem", md: "-12px" }}
          mr={{ base: "2rem", md: "unset" }}
          maxW={{ base: "100%", sm: "228px", md: "200px", lg: "226px" }}
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
            autoComplete="off"
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

      <PopoverContent
        // border="none"
        borderColor="gray.100"
        ref={popoverContentRef}
        rounded="sm"
        maxW="275px"
      >
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
            <Stack
              spacing={0}
              divider={
                <StackDivider borderColor="brand.lightgreen" opacity={0.3} />
              }
              w="100%"
            >
              {results && results.length
                ? results.map((article, i) => {
                    return (
                      <Result
                        key={i}
                        onClick={handleClickResult}
                        result={article.item}
                      />
                    );
                  })
                : null}
            </Stack>
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
      onClick={() => onClick(result.slug)}
      w="100%"
      px="1rem"
      py=".5rem"
      cursor="pointer"
      transition="background-color 0.3s"
      //
      _hover={{
        bg: "brand.creme",
      }}
    >
      <Stack direction="row" align="center">
        <Box position="relative" h="40px" w="48px" minW="48px">
          <Image
            src={result.image_url}
            alt="result-image"
            style={{ objectFit: "cover", borderRadius: "1px" }}
            fill
          />
        </Box>

        <Text lineHeight={1.2} fontSize="15px" noOfLines={2} fontWeight="500">
          {result.title}
        </Text>
      </Stack>
    </Box>
  );
};
