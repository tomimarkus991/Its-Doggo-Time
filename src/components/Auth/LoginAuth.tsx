import { Box, Flex, Input, InputGroup, InputRightElement, Text, VStack } from "@chakra-ui/react";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useLogin, useForm } from "hooks";

import { GradientButton, GradientButtonText, ColorMode } from "components";

import { OAuthSection, RerouteLoginRegister } from ".";

export const LoginAuth = () => {
  const [show, setShow] = useState(false);
  const { email, password, handleChange } = useForm({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { isSuccess, isLoading, isError, mutate } = useLogin({
    email,
    password,
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <Box w={300}>
      <VStack spacing="4">
        <Input
          variant={"removeDefault"}
          name="email"
          autoCapitalize="off"
          type="email"
          placeholder="Email"
          value={email || ""}
          onChange={handleChange}
          fontSize="2xl"
          size="lg"
          borderRadius="25"
          isInvalid={isError}
        />
        <Box w="100%">
          <InputGroup justifyContent="center" alignItems="center">
            <Input
              variant={"removeDefault"}
              name="password"
              type={show ? "text" : "password"}
              value={password || ""}
              onChange={handleChange}
              autoComplete="off"
              autoCapitalize="off"
              placeholder="Password"
              size="lg"
              fontSize="2xl"
              borderRadius="25"
              isInvalid={isError}
            />
            <InputRightElement width="3rem" h="100%">
              {show ? (
                <FontAwesomeIcon
                  // @ts-ignore
                  icon={faEye}
                  onClick={() => setShow(!show)}
                  cursor="pointer"
                  color="#2A2828"
                />
              ) : (
                <FontAwesomeIcon
                  // @ts-ignore
                  icon={faEyeSlash}
                  onClick={() => setShow(!show)}
                  cursor="pointer"
                  color="#2A2828"
                />
              )}
            </InputRightElement>
          </InputGroup>
          <Flex justifyContent="flex-end" mt="2">
            <Link to="/forgot-password">
              <Text fontSize="lg" color="#c9ac95" textAlign="right">
                Forgot Password?
              </Text>
            </Link>
          </Flex>
        </Box>
        <GradientButton onClick={() => mutate()} isLoading={isLoading} loadingText="Logging in">
          <GradientButtonText fontSize={25}>Sign in</GradientButtonText>
        </GradientButton>
        <Box>
          <Text fontSize="lg">Or</Text>
        </Box>
        <OAuthSection />
        <RerouteLoginRegister title="New to Doggo time?" to="/register" action="Sign Up" />
        <ColorMode />
      </VStack>
    </Box>
  );
};
