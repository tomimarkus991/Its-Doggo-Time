import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  faFacebook,
  faGithub,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { OAuthButton } from '..';
import { useAuth } from '../../../context/authContext/AuthContext';
import { StringOrUndefined } from '../../../types';
import { GradientButton } from '../../Buttons';
import { GradientButtonText } from '../../Text';

const RegisterAuth: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthError, setIsAuthError] = useState<boolean>(false);
  const [isSignupSuccessful, setIsSignupSuccessful] =
    useState<boolean>(false);

  const [email, setEmail] = useState<StringOrUndefined>();
  const [password, setPassword] = useState<StringOrUndefined>();

  const [show, setShow] = useState(false);

  const { signUp } = useAuth();

  const signUserUp = async () => {
    let isError = false;
    try {
      setIsLoading(true);
      let { error } = await signUp({
        email,
        password,
      });

      if (error) {
        isError = true;
        setIsAuthError(true);
      }
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setIsLoading(false);

      // when there isn't error
      if (!isError) {
        setIsAuthError(false);
        setIsSignupSuccessful(true);
      }
    }
  };

  return (
    <>
      {isSignupSuccessful ? (
        <Alert
          status="success"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          mb={4}
          py="10"
          borderRadius="20"
          w="md"
        >
          <AlertIcon w="10" h="10" mb="4" />
          <AlertTitle mt={4} mb={6} fontSize="3xl">
            <Text mb="2">Account Created Successfully</Text>
          </AlertTitle>
          <AlertDescription maxWidth="sm" fontSize="2xl">
            <Text mb="4">Please confirm your email</Text>
            <Text>You can close this tab now</Text>
          </AlertDescription>
        </Alert>
      ) : (
        <Box w={300}>
          <VStack spacing="4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              size="lg"
              fontSize="xl"
              borderRadius="25"
              borderColor="beez.900"
              _placeholder={{ color: 'gray.800' }}
              isInvalid={isAuthError}
            />
            <InputGroup justifyContent="center" alignItems="center">
              <Input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="off"
                placeholder="Password"
                size="lg"
                fontSize="xl"
                borderRadius="25"
                borderColor="beez.900"
                _placeholder={{ color: 'gray.800' }}
                isInvalid={isAuthError}
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
            <GradientButton
              onClick={e => {
                e.preventDefault();
                signUserUp();
              }}
              isLoading={isLoading}
              loadingText="Loading"
            >
              <GradientButtonText fontSize={30}>
                Sign up
              </GradientButtonText>
            </GradientButton>
            <Box>
              <Text>Or</Text>
            </Box>
            <HStack spacing="4">
              <OAuthButton provider="google" icon={faGoogle} />
              <OAuthButton provider="facebook" icon={faFacebook} />
              <OAuthButton provider="github" icon={faGithub} />
            </HStack>
            <HStack>
              <Text fontSize="2xl">Already have an account?</Text>
              <Link to="/login">
                <Text fontSize="2xl" color="pink.500">
                  Sign in
                </Text>
              </Link>
            </HStack>
          </VStack>
        </Box>
      )}
    </>
  );
};

export default RegisterAuth;
