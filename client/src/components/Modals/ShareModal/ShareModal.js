import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  FacebookIcon,
  EmailIcon,
} from "react-share";

const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL;
// console.log("WEBSITE_URL:", WEBSITE_URL);

const ShareModal = ({ isOpen, onClose, articleData }) => {
  const handleShareWindowClose = () => {
    // console.log("SHARE WINDOW CLOSED");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "xs", sm: "xs" }}
      returnFocusOnClose={false}
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        rounded="lg"
        // bg="brand.creme"
      >
        <ModalCloseButton rounded="full" _hover={{ bg: "brand.creme" }} />
        <ModalHeader fontWeight="600">Share</ModalHeader>

        <ModalBody pb="2rem">
          <Stack direction="row" justify="space-between">
            <EmailShareButton
              disabled={!articleData || !articleData.slug || !articleData.title}
              subject={articleData?.title}
              url={`${WEBSITE_URL}article/${articleData?.slug}`}
              body={articleData?.title}
              separator={"\n"}
            >
              <IconButton
                rounded="full"
                size="sm"
                icon={<EmailIcon size={54} round={true} />}
              />
            </EmailShareButton>
            <FacebookShareButton
              disabled={!articleData || !articleData.slug}
              url={`${WEBSITE_URL}article/${articleData?.slug}`}
              onShareWindowClose={handleShareWindowClose}
            >
              <IconButton
                rounded="full"
                size="sm"
                icon={<FacebookIcon size={54} round={true} />}
              />
            </FacebookShareButton>

            <TwitterShareButton
              disabled={!articleData || !articleData.slug || !articleData.title}
              title={articleData ? articleData.title : ""}
              url={WEBSITE_URL + `article/${articleData?.slug}`}
              onShareWindowClose={handleShareWindowClose}
            >
              <IconButton
                rounded="full"
                size="sm"
                icon={<TwitterIcon size={54} round={true} />}
              />
            </TwitterShareButton>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ShareModal;
