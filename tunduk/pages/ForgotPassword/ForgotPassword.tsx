import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Flex,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GradientButton } from '../../components/Buttons';
import { Heading } from '../../components/Headers';
import { BackIcon } from '../../components/Icons/LightMode';
import MainLayout from '../../components/Layouts';
import { GradientButtonText } from '../../components/Text';
import { supabase } from '../../utils/supabaseClient';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isAuthError, setIsAuthError] = useState<boolean>(false);
  const router = useHistory();

  const sendResetPassword = async () => {
    let isError = false;
    try {
      setIsLoading(true);
      let { error } = await supabase.auth.api.resetPasswordForEmail(
        email,
        { redirectTo: '/profile' },
      );
      if (error) {
        isError = true;
        setIsAuthError(true);
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
      // when there isn't error
      if (!isError) {
        setIsEmailSent(true);
      }
    }
  };
  return (
    <MainLayout
      leftSide={
        <Flex justifyContent="flex-end" mt="12">
          <BackIcon
            w="10"
            h="10"
            cursor="pointer"
            onClick={() => router.goBack()}
          />
        </Flex>
      }
      middle={
        <Box mt="8">
          <Flex justifyContent="center" alignItems="center" mb="4">
            <Heading title="Reset Your Password" fontSize={50} />
          </Flex>
          {isEmailSent ? (
            <Center maxW="lg" m="auto">
              <Alert
                status="success"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                mb={4}
                py="20"
                borderRadius="20"
              >
                <AlertIcon w="10" h="10" mb="4" />
                <AlertTitle mt={4} mb={6} fontSize="3xl">
                  Email Sent
                </AlertTitle>
                <AlertDescription maxWidth="sm" fontSize="2xl">
                  <Text mb="4">
                    Check your email for reset password link.
                  </Text>
                  <Text>You can close this tab now.</Text>
                </AlertDescription>
              </Alert>
            </Center>
          ) : (
            <Center
              style={{ boxShadow: '1px 1px 8px 2px #DDCDBF' }}
              h="xs"
              w="md"
              borderRadius={20}
              m="auto"
            >
              <VStack spacing={5} w="xs">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  size="lg"
                  fontSize="2xl"
                  borderRadius="25"
                  borderColor="beez.700"
                  _placeholder={{ color: 'gray.800' }}
                  isInvalid={isAuthError}
                />

                <GradientButton
                  onClick={sendResetPassword}
                  isLoading={isLoading}
                  loadingText="Sending"
                >
                  <GradientButtonText fontSize={25}>
                    Send
                  </GradientButtonText>
                </GradientButton>
              </VStack>
            </Center>
          )}
        </Box>
      }
      rightSide={null}
    />
  );
};
export default ForgotPassword;
