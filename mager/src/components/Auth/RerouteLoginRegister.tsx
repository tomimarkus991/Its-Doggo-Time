import { HStack, Text } from "@chakra-ui/react";

import { Link } from "react-router-dom";

interface Props {
  title: string;
  to: "/register" | "/login";
  action: "Sign Up" | "Sign In";
}

export const RerouteLoginRegister = ({ title, to, action }: Props) => {
  return (
    <HStack spacing={1}>
      <Text fontSize="lg">{title}</Text>
      <Link to={to}>
        <Text fontSize="lg" color="#c9ac95">
          {action}
        </Text>
      </Link>
    </HStack>
  );
};
