import React from "react";
import { Box } from "@chakra-ui/react";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";

import styles from "./Flipbook.module.css";

const PAGES = {
  one: "https://res.cloudinary.com/erinsblog/image/upload/v1672684344/pdfs/page_one_ddvu9b.pdf#toolbar=0",
  two: "https://res.cloudinary.com/erinsblog/image/upload/v1672684344/pdfs/page_two_kubdgc.pdf#toolbar=0",
  three:
    "https://res.cloudinary.com/erinsblog/image/upload/v1672684344/pdfs/page_three_gq33kx.pdf#toolbar=0",
  four: "https://res.cloudinary.com/erinsblog/image/upload/v1672684344/pdfs/page_four_ff81ns.pdf#toolbar=0",
};

const iframeOptions = {
  height: 600,
  width: 464,
};

const Flipbook = () => {
  return (
    <Box
      // pt="2rem"
      border="1px solid red"
      maxW="988px"
      margin="0 auto"
    >
      <HTMLFlipBook
        width={464}
        height={600}
        // size="stretch"
        // minWidth={620.8}
        // maxWidth={1000}
        // minHeight={480}
        // maxHeight={773}
        autoSize={false}
        maxShadowOpacity={0.1}
        showCover={true}
        mobileScrollSupport={true}
        className={styles.flip_book}
      >
        <div className={styles.page}>
          <iframe {...iframeOptions} src={PAGES.one}></iframe>
        </div>

        <div className={styles.page}>
          <iframe {...iframeOptions} src={PAGES.two}></iframe>
        </div>

        <div className={styles.page}>
          <iframe {...iframeOptions} src={PAGES.three}></iframe>
        </div>

        <div className={styles.page}>
          <iframe {...iframeOptions} src={PAGES.four}></iframe>
        </div>
      </HTMLFlipBook>
    </Box>
  );
};

export default Flipbook;
