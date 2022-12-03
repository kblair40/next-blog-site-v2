import React from "react";
import { Text, Box } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

import ContactForm from "src/components/Forms/ContactForm";

const ContactPage = () => {
  return (
    <AnimatePresence>
      <motion.div
        key="contact"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Box width="100%" mt="3rem">
          <ContactForm />
        </Box>
        {/* <Text mt="2rem" textAlign="center">
          Todo: Contact Page
        </Text> */}
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactPage;
