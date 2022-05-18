import { Icon, IconProps } from "@chakra-ui/react";

import { useColors } from "../../hooks";
const ExcrementViewIcon = (props: IconProps): JSX.Element => {
  const { logViewIconColor, whiteToBeige, logViewIconAuraColor, logViewIconAura2Color } =
    useColors();
  return (
    <Icon viewBox="0 0 70 61" {...props}>
      <defs>
        <filter id="prefix__e" x={0} y={0} width={70} height={61} filterUnits="userSpaceOnUse">
          <feOffset dy={3} />
          <feGaussianBlur stdDeviation={3} result="blur" />
          <feFlood floodColor={logViewIconAuraColor} />
          <feComposite operator="in" in2="blur" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="prefix__f"
          x={19}
          y={11}
          width={31.175}
          height={32.172}
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy={3} />
          <feGaussianBlur stdDeviation={3} result="blur-2" />
          <feFlood floodColor={logViewIconAura2Color} result="color" />
          <feComposite operator="out" in="SourceGraphic" in2="blur-2" />
          <feComposite operator="in" in="color" />
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>
      </defs>
      <g data-name="Group 483">
        <g filter="url(#prefix__e)">
          <rect
            data-name="Rectangle 75"
            width={52}
            height={43}
            rx={10}
            transform="translate(9 6)"
            fill={whiteToBeige}
          />
        </g>
        <g data-type="innerShadowGroup">
          <path
            data-name="Icon awesome-poop"
            d="M46.483 34.2a4.549 4.549 0 001.744-3.59 4.456 4.456 0 00-4.384-4.524h-.857a4.049 4.049 0 001.344-3.016 3.96 3.96 0 00-3.9-4.021h-.358a6.152 6.152 0 00.358-2.011A5.941 5.941 0 0034.587 11a5.7 5.7 0 00-.92.1 5.1 5.1 0 01.92 2.921 4.951 4.951 0 01-4.871 5.027h-.974a3.96 3.96 0 00-3.9 4.021 4.049 4.049 0 001.344 3.016h-.854a4.456 4.456 0 00-4.384 4.515 4.549 4.549 0 001.744 3.6 4.528 4.528 0 00.692 8.977h22.407a4.528 4.528 0 00.692-8.977z"
            fill={logViewIconColor}
          />
          <g filter="url(#prefix__f)">
            <path
              data-name="Icon awesome-poop"
              d="M46.483 34.2a4.549 4.549 0 001.744-3.59 4.456 4.456 0 00-4.384-4.524h-.857a4.049 4.049 0 001.344-3.016 3.96 3.96 0 00-3.9-4.021h-.358a6.152 6.152 0 00.358-2.011A5.941 5.941 0 0034.587 11a5.7 5.7 0 00-.92.1 5.1 5.1 0 01.92 2.921 4.951 4.951 0 01-4.871 5.027h-.974a3.96 3.96 0 00-3.9 4.021 4.049 4.049 0 001.344 3.016h-.854a4.456 4.456 0 00-4.384 4.515 4.549 4.549 0 001.744 3.6 4.528 4.528 0 00.692 8.977h22.407a4.528 4.528 0 00.692-8.977z"
              fill="#fff"
            />
          </g>
        </g>
      </g>
    </Icon>
  );
};
export default ExcrementViewIcon;
