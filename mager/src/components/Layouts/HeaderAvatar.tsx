import { Flex, Spacer } from '@chakra-ui/react';
import { DoggoIcon } from '../Icons';

const HeaderAvatar: React.FC = ({ children }) => {
  return (
    <Flex
      id="flex1"
      mx={{ sm: '6', lg: 'none' }}
      mt={{ sm: '6', lg: 'none' }}
      minW="16rem"
      justifyContent={{ sm: 'flex-start', lg: 'center' }}
      alignItems="center"
      flexDirection={{ sm: 'row', lg: 'column' }}
    >
      {children}
      <Spacer display={{ sm: 'initial', lg: 'none' }} />
      <DoggoIcon
        display={{ sm: 'none', sm2: 'initial', lg: 'none' }}
        fontSize={{ sm: 'none', sm2: '10rem', md: '12rem' }}
      />
    </Flex>
  );
};

export default HeaderAvatar;
