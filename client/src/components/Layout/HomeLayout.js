import React from 'react';
import { Box } from '@chakra-ui/react';

const HomeLayout = ({ children }) => {
  return <Box border='2px solid blue'>{{ children }}</Box>;
};

export default HomeLayout;
