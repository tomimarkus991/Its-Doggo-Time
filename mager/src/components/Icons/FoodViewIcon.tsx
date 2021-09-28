import { Icon, IconProps } from '@chakra-ui/react';
const FoodViewIcon = (props: IconProps): JSX.Element => (
  <Icon viewBox="0 0 70 61" {...props}>
    <defs>
      <filter
        id="prefix__d"
        x={0}
        y={0}
        width={70}
        height={61}
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy={3} />
        <feGaussianBlur stdDeviation={3} result="blur" />
        <feFlood floodColor="#cebeb1" />
        <feComposite operator="in" in2="blur" />
        <feComposite in="SourceGraphic" />
      </filter>
      <filter id="prefix__b">
        <feOffset dy={3} />
        <feGaussianBlur stdDeviation={3} result="blur-2" />
        <feFlood floodColor="#cebeb1" result="color" />
        <feComposite operator="out" in="SourceGraphic" in2="blur-2" />
        <feComposite operator="in" in="color" />
        <feComposite operator="in" in2="SourceGraphic" />
      </filter>
    </defs>
    <g data-name="Group 484">
      <g filter="url(#prefix__d)">
        <rect
          data-name="Rectangle 76"
          width={52}
          height={43}
          rx={10}
          transform="translate(9 6)"
          fill="#fff"
        />
      </g>
      <g data-type="innerShadowGroup">
        <path
          data-name="Path 267"
          d="M50.893 17.29a4.234 4.234 0 00-.846-.638c-.019-.016-.029-.03-.053-.047a3.889 3.889 0 00-3.831-.335l-.252-.253c1.275-2.266-.752-4.424-.752-4.424v.024a3.984 3.984 0 00-.305-.368 4.271 4.271 0 00-6.038 6.041l.315.313-.125.123-.13.13-.423.423-12.174 12.172-.191.191-.2.2-.288.29-.314-.314a4.27 4.27 0 10-6.039 6.038 4.229 4.229 0 00.845.636c.018.016.028.03.052.049a3.889 3.889 0 003.831.335l.252.252c-1.274 2.262.757 4.423.757 4.423v-.026a4.333 4.333 0 00.3.369 4.271 4.271 0 106.039-6.04l-.314-.313.124-.125.552-.552 12.178-12.17.19-.191.231-.232.253-.253.314.313a4.271 4.271 0 006.041-6.04z"
          fill="#ddcdbf"
        />
        <g transform="translate(.004 -.005)" filter="url(#prefix__b)">
          <path
            data-name="Path 267"
            d="M50.889 17.295a4.234 4.234 0 00-.846-.638c-.019-.016-.029-.03-.053-.047a3.889 3.889 0 00-3.831-.335l-.252-.253c1.275-2.266-.752-4.424-.752-4.424v.024a3.984 3.984 0 00-.305-.368 4.271 4.271 0 00-6.038 6.041l.315.313-.125.123-.13.13-.423.423-12.174 12.172-.191.191-.2.2-.288.29-.314-.314a4.27 4.27 0 10-6.039 6.038 4.229 4.229 0 00.845.636c.018.016.028.03.052.049a3.889 3.889 0 003.831.335l.252.252c-1.274 2.262.757 4.423.757 4.423v-.026a4.333 4.333 0 00.3.369 4.271 4.271 0 106.039-6.04l-.314-.313.124-.125.552-.552 12.178-12.17.19-.191.231-.232.253-.253.314.313a4.271 4.271 0 006.041-6.04z"
            fill="#fff"
          />
        </g>
      </g>
    </g>
  </Icon>
);
export default FoodViewIcon;
