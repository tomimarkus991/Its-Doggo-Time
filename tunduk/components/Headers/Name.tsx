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
      fontSize={{ base: 30, lg: 52 }}
      {...textProps}
    >
      {title}
    </Text>
  );
};
