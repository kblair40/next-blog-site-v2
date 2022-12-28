import React from "react";
import {
  Box,
  HStack,
  useTheme,
  useBreakpointValue,
  // Flex,
  // Heading,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import NavLinks from "./NavLinks";
import Search from "./Search";
import {
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
  InstagramIcon,
} from "src/utils/icons";

const Navbar = () => {
  const theme = useTheme();

  const padding = useBreakpointValue({
    md: "0.5rem 1rem 0",
    lg: "0.5rem 1.5rem 0",
    xl: "0.5rem 2.5rem 0",
  });

  return (
    <motion.div
      key={"nav"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        background: "#fff9f3",
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
        height: "80px",
        width: "100vw",
        transition: "box-shadow 0.5s",
        // boxShadow: isIntersecting ? theme.shadows.md : "none",
        boxShadow: theme.shadows.md,
        padding: padding,
        // border: "1px solid green",
      }}
    >
      <Box
        h="100%"
        display={{ base: "none", md: "flex" }} // new (was md: block)
        bg="brand.creme" // new
        justifyContent="space-between"
        w="100%"
        alignItems="center"
      >
        <Link href="/">
          {/* <MoneyLogo /> */}
          <Box
            position="relative"
            h={{ base: "70px", md: "40px", lg: "50px", xl: "55.3px" }}
            w={{ base: "180px", md: "120px", lg: "150px", xl: "166px" }}
            minW={{ base: "180px", md: "120px", lg: "150px" }}
          >
            <Image
              src="https://res.cloudinary.com/erinsblog/image/upload/v1672144985/Money_and_Other_Things_Logo2_zfrp33.jpg"
              style={{
                objectFit: "cover",
              }}
              alt="img"
              fill
            />
          </Box>
        </Link>

        <NavLinks />

        <Search />
      </Box>
    </motion.div>
  );
};

export default Navbar;

export const SocialLinks = ({ spacing = "8px", iconBoxSize = "20px" }) => {
  const boxSize = iconBoxSize;
  return (
    <HStack spacing={spacing} h="40px">
      <FacebookIcon boxSize={boxSize} />
      <InstagramIcon boxSize={boxSize} />
      <TwitterIcon boxSize={boxSize} />
      <PinterestIcon boxSize={boxSize} />
    </HStack>
  );
};

// const MoneyLogo = () => {
//   return (
//     <Flex direction="column" align="center" color="brand.darkgreen">
//       <Heading
//         fontSize="26px"
//         fontWeight="400"
//         letterSpacing=".6px"
//         sx={{
//           fontWeight: "500 !important",
//         }}
//       >
//         money
//       </Heading>
//       <Heading
//         whiteSpace="nowrap"
//         fontWeight="500"
//         fontSize="7px"
//         letterSpacing="3px"
//       >
//         AND OTHER THINGS
//       </Heading>
//     </Flex>
//   );
// };
