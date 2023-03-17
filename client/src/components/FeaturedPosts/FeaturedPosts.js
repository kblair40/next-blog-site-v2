import { useEffect, useRef, useState } from "react";
import { Box, Text, Flex } from '@chakra-ui/react';

const FeaturedPosts = ({ posts }) => {
  const [slideIdx, setSlideIdx] = useState(0);

  const interval = useRef();

  useEffect(() => {
    interval.current = setTimeout(() => {
      setSlideIdx((slideIdx + 1) % 3);
    }, 3000);
  }, []);

  useEffect(() => {
    console.log('SLIDE IDX NOW =', slideIdx);
  }, [slideIdx])

  return (
    <Box h="872px" w="394px" border='2px solid green'>
        
    </Box>
  )
};
