import React, { useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import {
  Text,
  Flex,
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import ShareModal from "src/components/Modals/ShareModal";
import { MoreVerticalIcon } from "src/utils/icons";
import { getStrapiMedia } from "src/utils/media";
import Image from "next/image";

// w = height * 0.371382634
// 622 x 231

const Card = ({ article }) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);

  return (
    <Flex
      maxW={{ base: "90vw" }}
      // w={{ base: "90vw", sm: "90vw", md: "622px" }}
      w={{ base: "90vw", sm: "90vw", md: "100%" }}
      h={{ base: "200px", sm: "240px", md: "231px" }}
      border="1px solid #303030"
      position="relative"
    >
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />

      <Menu>
        <MenuButton
          position="absolute"
          top="1rem"
          right="1rem"
          as={IconButton}
          variant="ghost"
          rounded="full"
          _hover={{ bg: "gray.50" }}
          _active={{ bg: "gray.50" }}
          size="sm"
          icon={<MoreVerticalIcon boxSize="18px" />}
        />
        <MenuList py={0}>
          <MenuItem onClick={() => setShareModalOpen(true)}>
            Share Post
          </MenuItem>
        </MenuList>
      </Menu>

      <Box h="100%" w={{ base: "40%", sm: "50%" }} position="relative">
        {article && article.attributes && article.attributes.image ? (
          <Image
            alt="post image"
            src={getStrapiMedia(article.attributes.image)}
            objectFit="cover"
            fill
          />
        ) : null}
      </Box>

      <Flex
        h="100%"
        w={{ base: "60%", sm: "50%" }}
        direction="column"
        p={{ base: "20px 12px 17px", sm: "28px 24px 25px" }}
      >
        <Box display="inline" fontSize="xs" mb="1rem">
          <Text display="inline" textTransform="uppercase">
            {dayjs(article.attributes.createdAt).format("MMM DD, YYYY")}
          </Text>
          <Text display="inline" mx="6px">
            &bull;
          </Text>
          <Text display="inline">5 Min</Text>
        </Box>

        <Link href={`/article/${article.attributes.slug}`}>
          <Flex direction="column" role="group" cursor="pointer">
            <Text
              fontWeight="700"
              mb="12px"
              fontSize={{ base: "24px", sm: "30px" }}
              _groupHover={{ color: "brand.lightgreen" }}
              transition="color 0.3s"
              noOfLines={1}
            >
              {article.attributes.title}
            </Text>

            <Text
              _groupHover={{ color: "brand.lightgreen" }}
              transition="color 0.3s"
              noOfLines={2}
            >
              {article.attributes.preview_text || ""}
            </Text>
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Card;

// FALLBACK
// const Card = ({ article }) => {
//   return (
//     <Flex w="622px" h="231px">
//       <Box h="100%" w="50%" position="relative">
//         <Image
//           alt="post image"
//           src={getStrapiMedia(article.attributes.image)}
//           objectFit="cover"
//           fill
//         />
//       </Box>

//       <Flex
//         h="100%"
//         w="50%"
//         direction="column"
//         p="28px 24px 25px"
//         // border="1px solid black"
//         // borderTop="none"
//         // boxSizing="border-box"
//       >
//         <Box display="inline" fontSize="xs" mb="1rem">
//           <Text display="inline" textTransform="uppercase">
//             {dayjs(article.attributes.createdAt).format("MMM DD, YYYY")}
//           </Text>
//           <Text display="inline" mx="6px">
//             &bull;
//           </Text>
//           <Text display="inline">5 Min</Text>
//         </Box>

//         <Link href={`/article/${article.attributes.slug}`}>
//           <Flex direction="column" role="group" cursor="pointer">
//             <Text
//               fontWeight="700"
//               mb="12px"
//               fontSize="30px"
//               _groupHover={{ color: "brand.lightgreen" }}
//               transition="color 0.3s"
//             >
//               {article.attributes.title}
//             </Text>

//             <Text
//               _groupHover={{ color: "brand.lightgreen" }}
//               transition="color 0.3s"
//               noOfLines={2}
//             >
//               {article.attributes.preview_text || ""}
//             </Text>
//           </Flex>
//         </Link>
//       </Flex>
//     </Flex>
//   );
// };

// export default Card;
