import { Center, Heading } from "@chakra-ui/react";

import React from "react";

const PageHeader: React.FC = ({ children }) => {
  return (
    <Center id="Page Header">
      <Heading fontSize="4xl">{children}</Heading>
    </Center>
  );
};
export default PageHeader;
