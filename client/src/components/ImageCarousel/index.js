// import { useState } from "react";
// import { Flex, Button } from "@chakra-ui/react";
// // import { wrap } from "popmotion";

// import ImageCarousel from "./ImageCarousel";

// const CarouselWrapper = ({ imageUrls }) => {
//   const [slideIdx, setSlideIdx] = useState(0);
//   let maxIdx = 0;
//   if (imageUrls) {
//     maxIdx = imageUrls.split(",").length - 1;
//   }
//   return (
//     <Flex justify="center" position="relative" border="1px solid red">
//       <ImageCarousel imageUrls={imageUrls} slideIdx={slideIdx} />
//       <Button
//         border="1px solid blue"
//         position="absolute"
//         size="sm"
//         top="50%"
//         transform="translateY(-50%)"
//         left={0}
//         onClick={() => {
//           if (slideIdx > 0) setSlideIdx((idx) => idx - 1);
//         }}
//       >
//         back
//       </Button>
//       <Button
//         border="1px solid blue"
//         position="absolute"
//         size="sm"
//         top="50%"
//         transform="translateY(-50%)"
//         right={0}
//         onClick={() => {
//           if (slideIdx < maxIdx) setSlideIdx((idx) => idx + 1);
//         }}
//       >
//         Next
//       </Button>
//     </Flex>
//   );
// };

// export default CarouselWrapper;
export { default } from "./ImageCarousel";
