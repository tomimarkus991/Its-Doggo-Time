import { Icon, IconProps } from '@chakra-ui/react';
export const SmallHeaderBgLight = (props: IconProps): JSX.Element => (
  <Icon
    width="490"
    height="334"
    viewBox="0 0 490 334"
    position="fixed"
    top="-14%"
    zIndex={'-20'}
    {...props}
  >
    <g clipPath="url(#clip2)">
      <path
        d="M243.5 -186C437.076 -186 594 -69.594 594 74C594 217.594 437.076 334 243.5 334C49.924 334 -107 217.594 -107 74C-107 -69.594 49.924 -186 243.5 -186Z"
        fill="#DDCDBF"
      />
      <path
        d="M348.5 -276C542.076 -276 699 -159.594 699 -16C699 127.594 542.076 244 348.5 244C154.924 244 -2 127.594 -2 -16C-2 -159.594 154.924 -276 348.5 -276Z"
        fill="#E5E0D5"
      />
      <path
        d="M453.5 186C647.076 186 804 69.5941 804 -74C804 -217.594 647.076 -334 453.5 -334C259.924 -334 103 -217.594 103 -74C103 69.5941 259.924 186 453.5 186Z"
        fill="#FBF0E5"
      />
    </g>
    <defs>
      <clipPath id="clip2">
        <rect width="490" height="334" fill="white" />
      </clipPath>
    </defs>
  </Icon>
);
