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

// const iframeOptions = {
//   frame,
// };

const Flipbook = () => {
  return (
    <Box
      // pt="2rem"
      border="1px solid red"
    >
      <HTMLFlipBook
        width={567}
        height={733}
        size="stretch"
        minWidth={620.8}
        maxWidth={1000}
        minHeight={480}
        maxHeight={773}
        autoSize={false}
        maxShadowOpacity={0.1}
        showCover={true}
        mobileScrollSupport={true}
        className={styles.flip_book}
      >
        <div className={styles.page}>
          <iframe src={PAGES.one}></iframe>
        </div>

        <div className={styles.page}>
          <iframe src={PAGES.two}></iframe>
        </div>

        <div className={styles.page}>
          <iframe src={PAGES.three}></iframe>
        </div>

        <div className={styles.page}>
          <iframe src={PAGES.four}></iframe>
        </div>
      </HTMLFlipBook>
    </Box>
  );
};

export default Flipbook;
