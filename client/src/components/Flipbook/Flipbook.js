import React, { useRef, useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import HTMLFlipBook from "react-pageflip";

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
  // frameBorder: 0,
  // border: "none",
};

const Flipbook = () => {
  const [curPage, setCurPage] = useState(0);
  const bookRef = useRef();

  const handleFlipPage = (e) => {
    setCurPage(e.data);
  };

  const handleClickNext = () => {
    bookRef.current.pageFlip().flipNext();
  };
  const handleClickPrev = () => {
    bookRef.current.pageFlip().flipPrev();
  };

  return (
    <Box
      mt="2rem"
      // border="1px solid red"
      // maxW="988px"
      w="928px"
      h="600px"
      margin="0 auto"
    >
      <HTMLFlipBook
        width={464}
        height={600}
        size="stretch"
        minWidth={464}
        maxWidth={464}
        minHeight={600}
        maxHeight={600}
        showCover={true}
        maxShadowOpacity={0.1}
        mobileScrollSupport={true}
        className={styles.flip_book}
        ref={(el) => (bookRef.current = el)}
        onFlip={handleFlipPage}
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

      <Flex justify="center" pt="1rem">
        <Button size="sm" onClick={handleClickPrev}>
          Prev
        </Button>
        <Button size="sm" ml=".5rem" onClick={handleClickNext}>
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default Flipbook;
