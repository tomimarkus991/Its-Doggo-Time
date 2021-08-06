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
  useToast,
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
import { supabase } from '../../../utils/supabaseClient';
import { GradientButton } from '../../Buttons';
import ColorMode from '../../ColorMode';
import { GradientButtonText } from '../../Text';

const RegisterAuth: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthError, setIsAuthError] = useState<boolean>(false);
  const [isSignupSuccessful, setIsSignupSuccessful] =
    useState<boolean>(false);

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [show, setShow] = useState(false);

  const { signUp } = useAuth();
  const toast = useToast();

  const updateProfile = async (userid: any) => {
    try {
      setIsLoading(true);
      const updates = {
        id: userid,
        username,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal',
      });

      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top',
        });
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signUserUp = async () => {
    let isError = false;
    try {
      setIsLoading(true);
      let { data, error }: { data: any; error: Error | null } =
        await signUp({
          email,
          password,
        });

      if (error) {
        isError = true;
        setIsAuthError(true);
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top',
        });
      } else {
        updateProfile(data?.id);
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
            <Text mb="2">Account Created</Text>
            <Text mb="2">Successfully</Text>
          </AlertTitle>
          <AlertDescription maxWidth="sm" fontSize="2xl">
            <Text mb="8">Please confirm your email</Text>
            <Text>You can close this tab now</Text>
          </AlertDescription>
        </Alert>
      ) : (
        <Box w={300}>
          <VStack spacing="4">
            <Input
              variant={'removeDefault'}
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              size="lg"
              fontSize="2xl"
              borderRadius="25"
              // isInvalid={isAuthError}
            />
            <Input
              variant={'removeDefault'}
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              size="lg"
              fontSize="2xl"
              borderRadius="25"
              isInvalid={isAuthError}
            />
            <InputGroup justifyContent="center" alignItems="center">
              <Input
                variant={'removeDefault'}
                type={show ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="off"
                placeholder="Password"
                size="lg"
                fontSize="2xl"
                borderRadius="25"
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
              <GradientButtonText fontSize={25}>
                Sign up
              </GradientButtonText>
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
              <Text fontSize="lg">Already have an account?</Text>
              <Link to="/login">
                <Text fontSize="lg" color="#c9ac95">
                  Sign in
                </Text>
              </Link>
            </HStack>
            <ColorMode />
          </VStack>
        </Box>
      )}
    </>
  );
};

export default RegisterAuth;
