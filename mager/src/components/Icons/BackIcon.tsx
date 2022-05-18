import { Icon, IconProps } from "@chakra-ui/react";

import { useHistory } from "react-router";

import useColors from "hooks/useColors";

const BackIcon = (props: IconProps): JSX.Element => {
  const { backIconColor } = useColors();
  const router = useHistory();
  return (
    <Icon
      viewBox="0 0 32 50"
      {...props}
      fontSize={{ base: "2rem", sm: "2.3rem", md: "2.75rem" }}
      cursor="pointer"
      onClick={() => router.goBack()}
    >
      <g clipPath="url(#clip13)">
        <path
          d="M26.7598 3L4.99997 24.7598"
          stroke={backIconColor}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M26.7598 46.52L4.99997 24.7602"
          stroke={backIconColor}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="32" height="50" fill="white" />
        </clipPath>
      </defs>
    </Icon>
  );
};

export default BackIcon;
