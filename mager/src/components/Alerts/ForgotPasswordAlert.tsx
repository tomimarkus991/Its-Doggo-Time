import { Alert, Center, AlertIcon, AlertTitle, AlertDescription, Text } from "@chakra-ui/react";

import React from "react";

const ForgotPasswordAlert: React.FC = () => {
  return (
    <Center>
      <Alert
        status="success"
        colorScheme="whatsapp"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        mb={4}
        borderRadius="20"
        py={{ base: "10", sm: "10", md: "14" }}
        w={{ base: "xs", base2: "sm", sm: "md" }}
      >
        <AlertIcon w="10" h="10" mb="4" color="green.400" />
        <AlertTitle mt={4} mb={6} fontSize={{ base: "2xl", sm: "3xl" }}>
          Email Sent
        </AlertTitle>
        <AlertDescription maxWidth="sm" fontSize={{ base: "xl", sm: "2xl" }}>
          <Text mb="4">Check your email for reset password link.</Text>
          <Text>You can close this tab now.</Text>
        </AlertDescription>
      </Alert>
    </Center>
  );
};
export default ForgotPasswordAlert;
