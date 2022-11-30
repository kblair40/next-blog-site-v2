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
console.log("WEBSITE_URL:", WEBSITE_URL);

const ShareModal = ({ isOpen, onClose }) => {
  const handleShareWindowClose = () => {
    console.log("SHARE WINDOW CLOSED");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "xs", sm: "xs" }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent rounded="lg">
        <ModalCloseButton />
        <ModalHeader fontWeight="600">Share</ModalHeader>

        <ModalBody pb="2rem">
          <Stack direction="row" justify="space-between">
            <EmailShareButton>
              <IconButton
                rounded="full"
                size="sm"
                icon={<EmailIcon size={54} round={true} />}
              />
            </EmailShareButton>
            <FacebookShareButton
              url="https://www.moneyandotherthings.com/"
              onShareWindowClose={handleShareWindowClose}
            >
              <IconButton
                rounded="full"
                size="sm"
                icon={<FacebookIcon size={54} round={true} />}
              />
            </FacebookShareButton>

            <TwitterShareButton
              url="https://www.moneyandotherthings.com/"
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
