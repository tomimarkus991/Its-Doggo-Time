import { Box, Input, InputGroup, InputRightElement, Text, VStack } from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import { useForm, useCreateUser } from "hooks";

import { GradientButton, GradientButtonText, SignUpAlert, ColorMode } from "components";

import { OAuthSection, RerouteLoginRegister } from ".";

export const RegisterAuth = () => {
  const { username, email, password, handleChange } = useForm({
    username: "",
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false);

  const { isSuccess, isError, isLoading, mutate } = useCreateUser({
    username,
    email,
    password,
  });

  return (
    <>
      {isSuccess ? (
        <SignUpAlert />
      ) : (
        <Box w={300}>
          <VStack spacing="4">
            <Input
              variant={"removeDefault"}
              name="username"
              autoCapitalize="off"
              type="text"
              placeholder="Nickname"
              value={username}
              onChange={handleChange}
              size="lg"
              fontSize="2xl"
              borderRadius="25"
              isInvalid={isError}
            />
            <Input
              variant={"removeDefault"}
              name="email"
              type="email"
              placeholder="Email"
              autoCapitalize="off"
              value={email}
              onChange={handleChange}
              size="lg"
              fontSize="2xl"
              borderRadius="25"
              isInvalid={isError}
            />
            <InputGroup justifyContent="center" alignItems="center">
              <Input
                variant={"removeDefault"}
                name="password"
                type={show ? "text" : "password"}
                value={password}
                onChange={handleChange}
                autoComplete="off"
                autoCapitalize="off"
                placeholder="Password"
                size="lg"
                fontSize="2xl"
                borderRadius="25"
                isInvalid={isError}
              />
              <InputRightElement id="input roigs" width="3rem" h="100%">
                {show ? (
                  <FontAwesomeIcon
                    icon="eye"
                    onClick={() => setShow(!show)}
                    cursor="pointer"
                    color="#2A2828"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon="eye-slash"
                    onClick={() => setShow(!show)}
                    cursor="pointer"
                    color="#2A2828"
                  />
                )}
              </InputRightElement>
            </InputGroup>
            <GradientButton onClick={() => mutate()} isLoading={isLoading} loadingText="Loading">
              <GradientButtonText fontSize={25}>Sign up</GradientButtonText>
            </GradientButton>
            <Box>
              <Text fontSize="lg">Or</Text>
            </Box>
            <OAuthSection />
            <RerouteLoginRegister title="Already have an account?" to="/login" action="Sign In" />
            <ColorMode />
          </VStack>
        </Box>
      )}
    </>
  );
};
