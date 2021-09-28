import { Icon, IconProps } from '@chakra-ui/react';

const CheckIcon = (props: IconProps): JSX.Element => (
  <Icon viewBox="0 0 20 20" {...props}>
    <path
      d="M2 9.16699L8.084 15.251"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M18.073 4L8.08398 15.251"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </Icon>
);

export default CheckIcon;
