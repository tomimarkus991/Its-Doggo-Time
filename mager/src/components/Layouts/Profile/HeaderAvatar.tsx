import { Flex, Spacer } from '@chakra-ui/react';
import { DoggoIcon } from '../../Icons/Doggo';

export const HeaderAvatar: React.FC = ({ children }) => {
  return (
    <Flex
      id="flex1"
      flexDirection={{ sm: 'row', lg: 'column' }}
      mx={{ sm: '6', lg: 'none' }}
      mt={{ sm: '6', lg: 'none' }}
      justifyContent={{ sm: 'flex-start', lg: 'center' }}
      alignItems="center"
      minW="16rem"
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
