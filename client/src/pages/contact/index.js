import React from "react";
import { Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const ContactPage = () => {
  return (
    <AnimatePresence>
      <motion.div
        key="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Text mt="2rem" textAlign="center">
          Todo: Contact Page
        </Text>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactPage;
