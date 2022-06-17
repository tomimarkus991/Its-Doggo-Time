import { Box, Input, InputGroup, InputRightElement, Text, VStack } from "@chakra-ui/react";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "hooks";
import { useCreateUser } from "hooks/mutations";
import React, { useState } from "react";

import SignUpAlert from "../Alerts/SignUpAlert";
import { GradientButton } from "../Buttons";
import { ColorMode } from "../ColorMode";
import { GradientButtonText } from "../Text";

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
                    icon={faEye}
                    onClick={() => setShow(!show)}
                    cursor="pointer"
                    color="#2A2828"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
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
