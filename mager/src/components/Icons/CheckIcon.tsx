import { Icon, IconProps } from '@chakra-ui/react';

const CheckIcon = (props: IconProps): JSX.Element => (
  <Icon viewBox="0 0 53 53" {...props}>
    <path
      d="M26.5 53C41.1355 53 53 41.1355 53 26.5C53 11.8645 41.1355 0 26.5 0C11.8645 0 0 11.8645 0 26.5C0 41.1355 11.8645 53 26.5 53Z"
      fill="#48BB78"
    />
    <path
      d="M18 26.167L24.084 32.251"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M34.073 21L24.084 32.251"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </Icon>
);

export default CheckIcon;
