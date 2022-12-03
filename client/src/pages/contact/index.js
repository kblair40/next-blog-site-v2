import React from "react";
import { Box } from "@chakra-ui/react";
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
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactPage;
