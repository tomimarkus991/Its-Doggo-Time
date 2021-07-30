import {
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
import { Link, useHistory } from 'react-router-dom';
import { OAuthButton } from '..';
import { useAuth } from '../../../context/authContext/AuthContext';
import { StringOrUndefined } from '../../../types';
import { GradientButton } from '../../Buttons';

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
          autoComplete="off"
          type="email"
          placeholder="Email"
          value={email || ''}
          onChange={e => setEmail(e.target.value)}
          size="lg"
          fontSize="xl"
          borderRadius="25"
          borderColor="beez.900"
          _placeholder={{ color: 'gray.800' }}
          isInvalid={isAuthError}
        />
        <Box w="100%">
          <InputGroup justifyContent="center" alignItems="center">
            <Input
              type={show ? 'text' : 'password'}
              value={password || ''}
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
          <Link to="/forgot-password">
            <Text color="pink.500">Forgot Password?</Text>
          </Link>
        </Box>
        <GradientButton
          onClick={(e: any) => {
            e.preventDefault();
            signUserIn();
          }}
          isLoading={isLoading}
          loadingText="Logging in"
        >
          <Text fontSize={30} color="gray.800">
            Sign in
          </Text>
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
          <Text fontSize="2xl">New to Doggo time?</Text>
          <Link to="/register">
            <Text fontSize="2xl" color="pink.500">
              Sign up
            </Text>
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export default LoginAuth;
