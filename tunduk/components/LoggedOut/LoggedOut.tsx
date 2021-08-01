import { Box, Center, HStack, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { GradientButton } from '../Buttons';
import { DoggoIcon } from '../Icons/Doggo';
import { GradientButtonText } from '../Text';

const LoggedOut: React.FC = () => {
  return (
    <Center>
      <VStack textAlign="center">
        <Text fontSize="3xl" maxW="md">
          Is your family member constantly asking about your dogs
          peeing/pooping times?
        </Text>
        <HStack>
          <Link to="/login">
            <GradientButton>
              <GradientButtonText fontSize={25}>Log in</GradientButtonText>
            </GradientButton>
          </Link>
          <Link to="/register">
            <GradientButton>
              <GradientButtonText fontSize={25}>
                Sign Up
              </GradientButtonText>
            </GradientButton>
          </Link>
        </HStack>
      </VStack>
      <Box w="2xs"></Box>
      <Box>
        <DoggoIcon width="lg" height="lg" />
      </Box>
    </Center>
  );
};
export default LoggedOut;
