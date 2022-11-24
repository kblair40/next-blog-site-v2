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
} from "@chakra-ui/react";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";

// const ShareModal = ({ isOpen, onClose }) => {
const ShareModal = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <Stack direction="row">
              <EmailShareButton>
                <Button>Email</Button>
              </EmailShareButton>
              <FacebookShareButton>
                <Button>FB</Button>
              </FacebookShareButton>
              <TwitterShareButton>
                <Button>Twitter</Button>
              </TwitterShareButton>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default ShareModal;
