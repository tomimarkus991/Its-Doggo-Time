import { Icon, IconProps } from '@chakra-ui/react';

const CrossIcon = (props: IconProps): JSX.Element => (
  <Icon viewBox="0 0 20 20" {...props}>
    <path
      d="M4.15576 4.07758L15.2504 15.1722"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M15.25 4L4.00001 15.25"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </Icon>
);

export default CrossIcon;
