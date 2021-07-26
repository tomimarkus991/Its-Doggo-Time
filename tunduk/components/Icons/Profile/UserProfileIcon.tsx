import { Icon, IconProps } from '@chakra-ui/react';
export const UserProfileIcon = (
  props: IconProps,
): React.ReactElement<any, string | React.JSXElementConstructor<any>> => (
  <Icon viewBox="0 0 239 239" {...props}>
    <path
      d="M119.24 238.4C184.835 238.4 238.01 185.225 238.01 119.63C238.01 54.0351 184.835 0.859985 119.24 0.859985C53.6451 0.859985 0.470001 54.0351 0.470001 119.63C0.470001 185.225 53.6451 238.4 119.24 238.4Z"
      fill="#DDCDBF"
    />
    <path
      d="M118.88 236.76C183.431 236.76 235.76 184.431 235.76 119.88C235.76 55.329 183.431 3 118.88 3C54.329 3 2 55.329 2 119.88C2 184.431 54.329 236.76 118.88 236.76Z"
      fill="url(#paint0_linear)"
    />
    <path
      d="M118.37 119.38C137.83 119.38 153.61 103.61 153.61 84.15C153.61 64.69 137.84 48.91 118.38 48.91C98.92 48.91 83.14 64.68 83.14 84.14C83.2 103.58 98.94 119.32 118.37 119.38ZM118.37 136.99C95.03 136.99 47.9 148.88 47.9 172.22V189.84H188.84V172.22C188.84 148.89 141.72 137 118.37 136.99Z"
      fill="#2A2828"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="1.99096"
        y1="119.885"
        x2="235.767"
        y2="119.885"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#DDCDBF" />
      </linearGradient>
    </defs>
  </Icon>
);
