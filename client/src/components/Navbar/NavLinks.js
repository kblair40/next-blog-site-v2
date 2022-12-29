import React from "react";
import { Box, Flex, Center, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { navLinks } from "./links";
import PostsMenu from "./PostsMenu";

const NavLinks = () => {
  const { asPath } = useRouter();

  const isMd = useBreakpointValue({ base: false, md: true, lg: false });
  const links = isMd ? [navLinks[0], navLinks[navLinks.length - 1]] : navLinks;

  // const childBorder = { "> *": { border: "1px solid red" } };
  return (
    <Flex
      py=".5rem"
      justify="space-evenly"
      h="100%"
      w="100%"
      maxW={{ md: "480px", lg: "700px" }}
      mx={{ md: "2rem", lg: "3rem", xl: "5rem" }}
      // sx={childBorder}
    >
      {/* {navLinks.map((linkObj, i) => { */}
      {links.map((linkObj, i) => {
        // console.log("LINK:", linkObj);
        return (
          <NavLink
            order={i === 0 || !isMd ? i : i === 1 && isMd ? i + 1 : i}
            isActive={linkObj.to === asPath}
            linkObj={linkObj}
            key={i}
          />
        );
      })}

      <Center h="100%" display={{ md: "flex", lg: "none" }}>
        <PostsMenu />
      </Center>
    </Flex>
  );
};

export default NavLinks;

export const NavLink = ({
  linkObj,
  children,
  isActive,
  order,
  isDisabled,
  onClick,
}) => {
  return (
    <Box
      px=".75rem"
      w="100%"
      order={order}
      role="group"
      cursor="pointer"
      h="100%"
      _after={
        isDisabled
          ? null
          : {
              content: `""`,
              display: "block",
              width: isActive ? "35px" : 0,
              height: "2px",
              background: "brand.darkgreen",
              transition: "0.2s",
              position: "relative",
              bottom: "14px",
              margin: "2px auto 0",
            }
      }
      _hover={{
        _after: {
          width: "35px",
          transition: "width 0.2s",
        },
      }}
      onClick={onClick ? onClick : null}
    >
      {!isDisabled ? (
        <Link isDisabled={true} href={linkObj ? linkObj.to : {}} legacyBehavior>
          <Center
            h="100%"
            fontSize={{ md: "17px", lg: "16px" }}
            textAlign="center"
            transitionDuration="0.3s"
            _groupHover={{
              color: "brand.lightgreen",
            }}
            color="brand.darkgreen"
            fontWeight="600"
            letterSpacing="1.5px"
            whiteSpace="nowrap"
          >
            {children ? children : linkObj.label}
          </Center>
        </Link>
      ) : (
        <Center
          h="100%"
          fontSize={{ md: "17px", lg: "16px" }}
          textAlign="center"
          transitionDuration="0.3s"
          _groupHover={{
            color: "brand.lightgreen",
          }}
          color="brand.darkgreen"
          fontWeight="600"
          letterSpacing="1.5px"
          whiteSpace="nowrap"
        >
          {children ? children : linkObj.label}
        </Center>
      )}
    </Box>
  );
};
