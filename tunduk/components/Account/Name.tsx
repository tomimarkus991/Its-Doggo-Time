import { Text, TextProps } from '@chakra-ui/react';
import { StringOrUndefined } from '../../types';

interface Props {
  title: StringOrUndefined;
  textProps?: TextProps;
}

export const Name: React.FC<Props> = ({ title, textProps }) => {
  return (
    <Text fontSize={52} {...textProps}>
      {title}
    </Text>
  );
};
