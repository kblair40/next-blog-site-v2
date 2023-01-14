import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

import AdminContext from "src/store/AdminContext";
import withContext from "src/components/Admin/withContext";
import Links from "src/components/Admin/Links";

const AdminPage = () => {
  const ctx = useContext(AdminContext);
  console.log("CTX:", ctx);
  const router = useRouter();
  // console.log("ROUTER:", router);

  if (!ctx) {
    if (router) {
      router.push("/");
    }
  }

  return (
    <Box h="calc(100vh - 80px)" w="100%" pt="2rem">
      <Links />
    </Box>
  );
};

export default withContext(AdminPage);
