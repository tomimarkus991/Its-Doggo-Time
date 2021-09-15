import { Text, TextProps } from '@chakra-ui/react';
import { StringOrUndefined } from '../../types';

interface Props {
  title: StringOrUndefined;
  textProps?: TextProps;
}

export const Name: React.FC<Props> = ({ title, textProps }) => {
  return (
    <Text
      textAlign="center"
      fontSize={{ base: 50, sm: 40, sm2: 35, lg: 52 }}
      maxW={{ base: '16rem', sm: '20rem', md: '16rem' }}
      {...textProps}
    >
      {title}
    </Text>
  );
};
