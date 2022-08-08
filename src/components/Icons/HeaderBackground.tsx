import { Icon, IconProps } from "@chakra-ui/react";

import { useColors } from "hooks";

export const HeaderBackground = (props: IconProps): JSX.Element => {
  const { headerBackground3Color, headerBackground2Color, headerBackground1Color } = useColors();
  return (
    <Icon width="1920" height="351" viewBox="0 0 20000 351" position="fixed" top="-14%" {...props}>
      <g clipPath="url(#clip6)">
        <path
          d="M954.123 -195.835C1712.62 -195.835 2327.51 -73.274 2327.51 77.913C2327.51 229.1 1712.62 351.665 954.123 351.665C195.622 351.665 -419.265 229.1 -419.265 77.913C-419.265 -73.274 195.622 -195.835 954.123 -195.835Z"
          fill={headerBackground3Color}
        />
        <path
          d="M1365.55 -290.594C2124.05 -290.594 2738.94 -168.033 2738.94 -16.846C2738.94 134.341 2124.05 256.906 1365.55 256.906C607.051 256.906 -7.83618 134.341 -7.83618 -16.846C-7.83618 -168.033 607.051 -290.594 1365.55 -290.594Z"
          fill={headerBackground2Color}
        />
        <path
          d="M1777 196C2535.29 196 3150 73.5499 3150 -77.5C3150 -228.55 2535.29 -351 1777 -351C1018.71 -351 404 -228.55 404 -77.5C404 73.5499 1018.71 196 1777 196Z"
          fill={headerBackground1Color}
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="1920" height="351" fill="white" />
        </clipPath>
      </defs>
    </Icon>
  );
};
