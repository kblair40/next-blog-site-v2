import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const ShareModal = () => {
  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share</ModalHeader>

        <ModalBody>ShareModalShareModalShareModalShareModal</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ShareModal;
