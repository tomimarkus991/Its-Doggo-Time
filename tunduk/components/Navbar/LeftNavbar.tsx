import { Box, Flex, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export const LeftNavbar: React.FC = () => {
  return (
    <Flex>
      <Box cursor="pointer">
        <NextLink href="/">
          <Text>It's Doggo Time</Text>
        </NextLink>
      </Box>
    </Flex>
  );
};
