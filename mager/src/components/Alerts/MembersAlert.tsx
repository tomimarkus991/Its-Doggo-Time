import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";

import React from "react";

const MembersAlert: React.FC = () => {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      borderRadius="20"
      mb={4}
      py="12"
    >
      <AlertIcon w="10" h="10" mb="4" />
      <AlertTitle mt={4} mb={6} fontSize={{ base: "2xl", sm: "2xl" }}>
        FRIEND REQUEST FAILED
      </AlertTitle>
      <AlertDescription maxWidth="sm" fontSize={{ base: "xl", sm: "xl" }}>
        Hm, that didn&#39;t work. Double check that the capitalization, spelling, any spaces, and
        numbers are correct.
      </AlertDescription>
    </Alert>
  );
};
export default MembersAlert;
