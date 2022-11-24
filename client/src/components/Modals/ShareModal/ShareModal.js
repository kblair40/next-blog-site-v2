import React, { Fragment, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Stack,
  Button,
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

// const ShareModal = ({ isOpen, onClose }) => {
const ShareModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleShareWindowClose = () => {
    console.log("SHARE WINDOW CLOSED");
  };

  return (
    <Fragment>
      <Button
        onClick={() => setIsOpen(true)}
        position="fixed"
        bottom="1rem"
        right="1rem"
        size="sm"
      >
        modal
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
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
    </Fragment>
  );
};

export default ShareModal;
