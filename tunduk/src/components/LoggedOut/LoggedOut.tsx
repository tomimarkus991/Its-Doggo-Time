import { Box, Center, Flex, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { GradientButton } from '../Buttons';
import { DoggoIcon } from '../Icons/Doggo';
import { GradientButtonText } from '../Text';

const LoggedOut: React.FC = () => {
  return (
    <Center
      h="100%"
      id="center"
      flexDirection={{ base: 'column', lg: 'row' }}
    >
      <VStack textAlign="center">
        <Text
          fontSize={{ base: '3xl' }}
          maxW="md"
          display={{ base: 'none', md: 'block' }}
        >
          Is your family member constantly asking about your dogs
          peeing/pooping times?
        </Text>
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <Box mr={{ base: 0, md: '4' }}>
            <Link to="/login">
              <GradientButton>
                <GradientButtonText fontSize={25}>
                  Log in
                </GradientButtonText>
              </GradientButton>
            </Link>
          </Box>
          <Box mt={{ base: '6', md: '0' }}>
            <Link to="/register">
              <GradientButton>
                <GradientButtonText fontSize={25}>
                  Sign Up
                </GradientButtonText>
              </GradientButton>
            </Link>
          </Box>
        </Flex>
      </VStack>
      <Box
        id="mingi box"
        display={{ base: 'none', md: 'block' }}
        w={{ sm: '2rem', md: '2rem', lg: '4rem', xl: '7rem' }}
      ></Box>
      <Box>
        <DoggoIcon
          fontSize={{
            base: '20rem',
            sm: '24rem',
            md: '20rem',
            lg: '24rem',
            xl: '32rem',
          }}
        />
      </Box>
    </Center>
  );
};
export default LoggedOut;
