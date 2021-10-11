import { Center, Grid, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ForgotPasswordAlert } from '../../components/Alerts';
import { GradientButton } from '../../components/Buttons';
import { BackIcon } from '../../components/Icons';
import { GradientButtonText } from '../../components/Text';
import { useResetPassword } from '../../hooks/mutations';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const { isLoading, mutate, isSuccess, isError } = useResetPassword();

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
      {isSuccess ? (
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
              isInvalid={isError}
            />

            <GradientButton
              onClick={() => mutate(email)}
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
