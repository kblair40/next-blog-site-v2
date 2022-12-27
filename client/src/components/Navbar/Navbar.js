import React from "react";
import { Box, Flex, Center, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Image from "next/image";

import NavLinks from "./NavLinks";
import Search from "./Search";
import {
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
  InstagramIcon,
} from "src/utils/icons";
import { navLinks } from "./links";

const Navbar = ({ isIntersecting }) => {
  const { asPath } = useRouter();

  // const { observe, inView } = useInView({
  //   threshold: 0, // Default is 0
  // });

  // useEffect(() => {
  //   console.log("IN VIEW:", inView);
  // }, [inView]);

  return (
    <motion.div
      key={"nav"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        background: "#fff9f3",
        position: "fixed",
        top: 0,
        zIndex: 100000,
        height: "80px",
        width: "100vw",
      }}
    >
      <Box
        mx="auto"
        h="100%"
        display={{ base: "none", md: "flex" }} // new (was md: block)
        bg="brand.creme" // new
        pl="1rem"
        pr="1rem"
        pt=".5rem"
        justify="space-between"
        w="100vw"
        // border="1px solid green"
        shadow={isIntersecting ? "md" : "none"}
        transition="box-shadow .5s"
        justifyContent="space-between"
      >
        <Box
          position="relative"
          h="70px"
          w="210px"
          mr={{ md: "1.5rem", lg: "2rem", xl: "3rem" }}
        >
          <Image
            src="https://res.cloudinary.com/erinsblog/image/upload/v1672077301/Money_and_Other_Things_Logo_dzvjxy.jpg"
            style={{
              objectFit: "cover",
            }}
            alt="img"
            fill
          />
        </Box>

        <Flex
          position={{ xl: "fixed" }}
          top={"1.5rem"}
          left={0}
          right={0}
          justify="center"
          // w={{ md: "100%", xl: "100vw" }}
          w={{ md: "100%" }}
          align="center"
          // border="1px solid red"
          // justify={{ md: "space-between", xl: "unset" }}
        >
          <NavLinks />

          <Search />
        </Flex>
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
