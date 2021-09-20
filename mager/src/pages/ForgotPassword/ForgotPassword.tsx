import { Center, Grid, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import ForgotPasswordAlert from '../../components/Alerts/ForgotPasswordAlert';
import { GradientButton } from '../../components/Buttons';
import { BackIcon } from '../../components/Icons/LightMode';
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
    <Grid h="90%" templateRows="0.4fr 1fr">
      <Center id="heading & back" w={{ base: 'xs', sm: 'md' }} m="auto">
        <Grid
          flex={1}
          templateColumns="0.1fr 1fr"
          justifyContent="center"
          alignItems="center"
        >
          <BackIcon />
          <Heading fontSize="4xl" textAlign="center">
            Reset Password
          </Heading>
        </Grid>
      </Center>
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
              <GradientButtonText fontSize={25}>Send</GradientButtonText>
            </GradientButton>
          </VStack>
        </Center>
      )}
    </Grid>
  );
};
export default ForgotPassword;
