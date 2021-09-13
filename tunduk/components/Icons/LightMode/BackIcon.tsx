import { Icon, IconProps } from '@chakra-ui/react';
import useColors from '../../../hooks/useColors';
export const BackIcon = (props: IconProps): JSX.Element => {
  const { backIconColor } = useColors();
  return (
    <Icon viewBox="0 0 27 48" {...props}>
      <path
        d="M23.8809 2.12097L2.12106 23.8808"
        stroke={backIconColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M23.8809 45.641L2.12106 23.8812"
        stroke={backIconColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </Icon>
  );
};
