import { Heading, VStack } from "@chakra-ui/react";

import React from "react";

import { LoginAuth } from "components/Auth";

const Login: React.FC = () => {
  return (
    <VStack zIndex={2} spacing={{ base: "10" }}>
      <Heading
        zIndex={2}
        display={{ base: "none", sm: "block" }}
        fontSize={{ base: "2xl", sm: "4xl" }}
      >
        Sign in to your account
      </Heading>
      <LoginAuth />
    </VStack>
  );
};
export default Login;
