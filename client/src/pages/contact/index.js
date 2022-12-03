import React from "react";
import { Box } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const ContactForm = dynamic(() => import("src/components/Forms/ContactForm"), {
  suspense: true,
});

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
          <React.Suspense fallback={<div />}>
            <ContactForm />
          </React.Suspense>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactPage;
