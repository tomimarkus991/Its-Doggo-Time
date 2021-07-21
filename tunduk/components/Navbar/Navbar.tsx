import { Flex, Spacer } from '@chakra-ui/react';
import { LeftNavbar } from './LeftNavbar';
import { RightNavbar } from './RightNavbar';

const Navbar: React.FC = () => {
  return (
    <Flex zIndex={1} position="sticky" justify="center" py={4}>
      <Flex flex={1} maxW={1200}>
        <LeftNavbar />
        <Spacer />
        <RightNavbar />
      </Flex>
    </Flex>
  );
};
export default Navbar;
