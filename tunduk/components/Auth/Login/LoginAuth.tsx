import {
  Box,
  Flex,
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
import { Link, useHistory } from 'react-router-dom';
import { OAuthButton } from '..';
import { useAuth } from '../../../context/authContext/AuthContext';
import { StringOrUndefined } from '../../../types';
import { GradientButton } from '../../Buttons';
import ColorMode from '../../ColorMode';
import { GradientButtonText } from '../../Text';

const LoginAuth: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthError, setIsAuthError] = useState<boolean>(false);
  const [email, setEmail] = useState<StringOrUndefined>();
  const [password, setPassword] = useState<StringOrUndefined>();
  const [show, setShow] = useState(false);
  const router = useHistory();
  const { signIn } = useAuth();

  const signUserIn = async () => {
    let isError = false;
    try {
      setIsLoading(true);
      let { error } = await signIn({
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
        router.push('/');
      }
    }
  };

  return (
    <Box w={300}>
      <VStack spacing="4">
        <Input
          variant={'removeDefault'}
          autoCapitalize="off"
          type="email"
          placeholder="Email"
          value={email || ''}
          onChange={e => setEmail(e.target.value)}
          fontSize="2xl"
          size="lg"
          borderRadius="25"
          isInvalid={isAuthError}
        />
        <Box w="100%">
          <InputGroup justifyContent="center" alignItems="center">
            <Input
              variant={'removeDefault'}
              type={show ? 'text' : 'password'}
              value={password || ''}
              onChange={e => setPassword(e.target.value)}
              autoComplete="off"
              autoCapitalize="off"
              placeholder="Password"
              size="lg"
              fontSize="2xl"
              borderRadius="25"
              isInvalid={isAuthError}
            />
            <InputRightElement width="3rem" h="100%">
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
          <Flex justifyContent="flex-end" mt="2">
            <Link to="/forgot-password">
              <Text fontSize="lg" color="#c9ac95" textAlign="right">
                Forgot Password?
              </Text>
            </Link>
          </Flex>
        </Box>
        <GradientButton
          onClick={(e: any) => {
            e.preventDefault();
            signUserIn();
          }}
          isLoading={isLoading}
          loadingText="Logging in"
        >
          <GradientButtonText fontSize={25}>Sign in</GradientButtonText>
        </GradientButton>
        <Box>
          <Text fontSize="lg">Or</Text>
        </Box>
        <HStack spacing="4">
          <OAuthButton provider="google" icon={faGoogle} />
          <OAuthButton provider="facebook" icon={faFacebook} />
          <OAuthButton provider="github" icon={faGithub} />
        </HStack>
        <HStack spacing={1}>
          <Text fontSize="lg">New to Doggo time?</Text>
          <Link to="/register">
            <Text fontSize="lg" color="#c9ac95">
              Sign up
            </Text>
          </Link>
        </HStack>
        <ColorMode />
      </VStack>
    </Box>
  );
};

export default LoginAuth;
