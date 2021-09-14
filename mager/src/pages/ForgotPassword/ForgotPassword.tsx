import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ForgotPasswordAlert from '../../components/Alerts/ForgotPasswordAlert';
import { GradientButton } from '../../components/Buttons';
import { BackIcon } from '../../components/Icons/LightMode';
import { MainLayout2 } from '../../components/Layouts';
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
    <MainLayout2
      leftSide={
        <Flex
          display={{ base: 'none', lg: 'block' }}
          justifyContent="flex-end"
          mt="2.8rem"
        >
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
          <HStack justifyContent="center" mb="12">
            <Box display={{ base: 'block', lg: 'none' }}>
              <BackIcon
                w="9"
                h="9"
                pr={{ base: '0', sm: '4' }}
                cursor="pointer"
                onClick={() => router.goBack()}
              />
            </Box>
            <Heading
              textAlign="center"
              fontSize={{
                base: '1.5rem',
                base2: '1.7rem',
                sm: '4xl',
                md: '2.5rem',
                lg: '5xl',
              }}
              pr={{ base: '8', sm: '0' }}
            >
              Reset Your Password
            </Heading>
          </HStack>
          {isEmailSent ? (
            <ForgotPasswordAlert />
          ) : (
            <Center
              layerStyle="shadow-and-bg"
              bg="white"
              h="xs"
              w={{ base: 'xs', sm: 'md' }}
              borderRadius={20}
              m="auto"
            >
              <VStack spacing={5} w="xs">
                <Input
                  variant={'removeDefault'}
                  autoCapitalize="off"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  size="lg"
                  fontSize="2xl"
                  maxW={{ base: '16rem', sm: '20rem' }}
                  borderRadius="25"
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
