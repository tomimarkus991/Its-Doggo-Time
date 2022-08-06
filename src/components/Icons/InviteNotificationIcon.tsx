import { Icon, IconProps } from "@chakra-ui/react";

export const InviteNotificationIcon = (props: IconProps): JSX.Element => (
  <Icon
    position="absolute"
    bottom={-2}
    right={-2}
    viewBox="0 0 200 200"
    fontSize="1.5rem"
    color="green.500"
    {...props}
  >
    <path fill="currentColor" d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
  </Icon>
);
