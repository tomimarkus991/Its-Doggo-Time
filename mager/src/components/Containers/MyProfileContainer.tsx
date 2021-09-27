import { Box, Center, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context';
import GradientButton from '../Buttons/GradientButton';
import { ColorMode } from '../ColorMode';
import { GradientButtonText } from '../Text';

interface Props {
  isLoading: boolean;
}

const MyProfileContainer: React.FC<Props> = ({ isLoading }) => {
  const { signOut } = useAuth();
  const router = useHistory();

  return (
    <Center>
      <VStack
        layerStyle="shadow-and-bg"
        h="xs"
        w={{ base: 'xs', sm: 'sm', md: 'md' }}
        borderRadius={20}
        justifyContent="center"
      >
        <VStack w="xs">
          {/* Toggle Color Mode */}
          <Box pt="10">
            <ColorMode />
          </Box>
          {/*  Sign out */}
          <HStack spacing="8" pt="8">
            <GradientButton
              onClick={async () => {
                router.push('/');
                await signOut();
              }}
              isLoading={isLoading}
              loadingText="Signing out"
            >
              <GradientButtonText fontSize={20}>
                Sign Out
              </GradientButtonText>
            </GradientButton>
          </HStack>
        </VStack>
      </VStack>
    </Center>
  );
};
export default MyProfileContainer;
