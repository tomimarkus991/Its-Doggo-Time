import { Icon, IconProps } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import useColors from '../../../hooks/useColors';
export const BackIcon = (props: IconProps): JSX.Element => {
  const { backIconColor } = useColors();
  const router = useHistory();
  return (
    <Icon
      viewBox="0 0 32 53"
      {...props}
      fontSize={{ base: '2rem', sm: '2.3rem', md: '2.75rem' }}
      cursor="pointer"
      onClick={() => router.goBack()}
    >
      <path
        d="M26.7598 5L4.99997 26.7598"
        stroke={backIconColor}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M26.7598 48.52L4.99997 26.7602"
        stroke={backIconColor}
        strokeWidth="6"
        strokeLinecap="round"
      />
    </Icon>
  );
};
