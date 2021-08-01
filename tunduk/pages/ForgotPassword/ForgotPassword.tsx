import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Flex,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GradientButton } from '../../components/Buttons';
import { Heading } from '../../components/Headers';
import { GradientButtonText } from '../../components/Text';
import { supabase } from '../../utils/supabaseClient';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isAuthError, setIsAuthError] = useState<boolean>(false);

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
    <>
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
            py="10"
            borderRadius="20"
          >
            <AlertIcon w="10" h="10" mb="4" />
            <AlertTitle mt={4} mb={6} fontSize="3xl">
              Email Sent
            </AlertTitle>
            <AlertDescription maxWidth="sm" fontSize="2xl">
              <Text mb="4">Check your email for reset password link.</Text>
              <Text>You can close this tab now</Text>
            </AlertDescription>
          </Alert>
        </Center>
      ) : (
        <VStack spacing="10">
          <Heading title="Reset Your Password" />
          <Box mt="8">
            <Flex
              h="md"
              w="100%"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <VStack h="xs" w="xl" borderRadius={20} boxShadow="xl">
                <VStack w="2xs">
                  <Input
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
                  <HStack spacing="4">
                    <Link to="/login">
                      <GradientButton>
                        <GradientButtonText fontSize={25}>
                          Back
                        </GradientButtonText>
                      </GradientButton>
                    </Link>
                    <GradientButton
                      onClick={sendResetPassword}
                      isLoading={isLoading}
                      loadingText="Sending"
                    >
                      <GradientButtonText fontSize={25}>
                        Send
                      </GradientButtonText>
                    </GradientButton>
                  </HStack>
                </VStack>
              </VStack>
            </Flex>
          </Box>
        </VStack>
      )}
    </>
  );
};
export default ForgotPassword;
