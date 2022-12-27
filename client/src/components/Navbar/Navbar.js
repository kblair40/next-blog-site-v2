import React from "react";
import { Box, Flex, Center, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Image from "next/image";

import Search from "./Search";
import {
  FacebookIcon,
  TwitterIcon,
  PinterestIcon,
  InstagramIcon,
  SearchIcon,
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
        // border: "1px solid red",
        position: "fixed",
        top: 0,
        zIndex: 100000,
        height: "80px",
        // border: "1px solid #ccc",
        width: "100vw",
        // paddingLeft: "1rem",
        // paddingRight: "2rem",
        // display: "flex",
        // justifyContent: "center",
      }}
    >
      <Box
        // ref={observe}
        // maxW="1000px"
        mx="auto"
        h="100%"
        // position="sticky"
        sx={
          {
            // position: "sticky",
            // position: "-webkit-sticky",
            // top: "60px",
          }
        }
        // top="0"
        // position="relative" // new
        // bottom="24px" // new
        // w="100%"
        // display={{ base: "none", md: "block" }}
        display={{ base: "none", md: "flex" }} // new (was md: block)
        bg="brand.creme" // new
        // pt="1rem" // new
        pl="1rem"
        pr="1rem"
        pt=".5rem"
        // h="50px" // removal is new
        // border="1px solid black"
        justify="space-between"
        w="100vw"
        shadow={isIntersecting ? "md" : "none"}
        transition="box-shadow .5s"
      >
        <Box
          position="relative"
          h="70px"
          w="210px"
          mr={{ md: "1.5rem", xl: "3rem" }}
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
          w={{ md: "100%", xl: "100vw" }}
          align="center"
        >
          <Flex
            py=".5rem"
            justify="space-evenly"
            h="100%"
            w="100%"
            maxW="695px"
          >
            {navLinks.map((linkObj, i) => {
              return (
                <NavLink
                  isActive={linkObj.to === asPath}
                  linkObj={linkObj}
                  key={i}
                />
              );
            })}
          </Flex>

          <Search />
        </Flex>
      </Box>
    </motion.div>
  );
};

export default Navbar;

const NavLink = ({ linkObj, children, isActive }) => {
  return (
    <Box
      role="group"
      cursor="pointer"
      flex={1}
      h="100%"
      px="5px"
      // border="1px solid #424242" // new removal
      borderRight="none"
      _after={{
        content: `""`,
        display: "block",
        width: isActive ? "35px" : 0,
        // width: 0,
        height: "2px",
        background: "brand.darkgreen",
        transition: "0.2x",
        position: "relative",
        bottom: "12px",
        margin: "2px auto 0",
      }}
      _hover={{
        _after: {
          width: "35px",
          transition: "width 0.2s",
        },
      }}
    >
      <Link href={linkObj ? linkObj.to : "#"} legacyBehavior>
        <Center
          // border="2px solid red"
          h="100%"
          fontSize="16px"
          // fontWeight="500"
          textAlign="center"
          transitionDuration="0.3s"
          _groupHover={{
            color: "brand.lightgreen",
          }}
          // color={isActive ? "brand.lightgreen" : "text.body"}
          // color="white" // new
          color="brand.darkgreen"
          fontWeight="600"
          letterSpacing="2px"
          className="link-wrapper"
        >
          {children ? children : linkObj.label}
        </Center>
      </Link>
    </Box>
  );
};

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
