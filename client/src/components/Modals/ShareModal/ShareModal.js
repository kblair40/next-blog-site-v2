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

const ShareModal = ({ isOpen, onClose }) => {
  const handleShareWindowClose = () => {
    console.log("SHARE WINDOW CLOSED");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Share</ModalHeader>

        <ModalBody>
          <Stack direction="row" justify="space-evenly">
            <EmailShareButton>
              <IconButton
                rounded="full"
                size="sm"
                icon={<EmailIcon size={42} round={true} />}
              />
            </EmailShareButton>
            <FacebookShareButton onShareWindowClose={handleShareWindowClose}>
              <IconButton
                rounded="full"
                size="sm"
                icon={<FacebookIcon size={42} round={true} />}
              />
            </FacebookShareButton>
            <TwitterShareButton onShareWindowClose={handleShareWindowClose}>
              <IconButton
                rounded="full"
                size="sm"
                icon={<TwitterIcon size={42} round={true} />}
              />
            </TwitterShareButton>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ShareModal;
