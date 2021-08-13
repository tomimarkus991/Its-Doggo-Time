import { HStack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  to: '/register' | '/login';
}

export const RerouteLoginRegister: React.FC<Props> = ({ title, to }) => {
  return (
    <HStack spacing={1}>
      <Text fontSize="lg">{title}</Text>
      <Link to={to}>
        <Text fontSize="lg" color="#c9ac95">
          Sign up
        </Text>
      </Link>
    </HStack>
  );
};
