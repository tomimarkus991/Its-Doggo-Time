import { Icon, IconProps, useColorModeValue } from '@chakra-ui/react';
export const BackIcon = (props: IconProps): JSX.Element => {
  const backIconColor = useColorModeValue('#2A2828', '#E5E0D5');
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
